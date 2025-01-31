const express = require('express');
const app = express();

app.use(express.static('js'));
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");


loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    getQuery(username,password)

})

async function authentication(username, password){
 
  const combination = username + ":" + password 
  try {
  const response = await fetch('https://01.kood.tech/api/auth/signin',{
    method: 'POST',
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic '+btoa(combination)
    },
});
if (!response.ok){
  throw new Error()
}

const JWTToken = await response.json();
return JWTToken
} catch (error) {
  alert('Invalid credentials');
  }
}

async function getQuery(username,password){
  const JWTToken = await authentication(username,password)
  try {
  const response = await fetch('https://01.kood.tech/api/graphql-engine/v1/graphql',{
    method: 'POST',
    headers: {
            'Content-type': 'applcation/json',
            'Authorization': `Bearer ${JWTToken}`
    },
    body: JSON.stringify({query}),
    });
    if (!response.ok){
      throw new Error()
    }
    const queryData = await response.json()
    loadScript('homepage.js');
  } 
    catch (error) {
      alert('Failed to fetch data');
    }
  }


  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    document.body.appendChild(script);
    console.log(`${src} has been loaded successfully.`);
  }
let data 
const query = "query {transaction{id}}"


async function test() {
  data = await getData()
  console.log(data)

 // console.log(data.data.user[0])
  //const user = data.data.user[0]
  //console.log(user.id)
  for (var i = 0; i < data.length; i++) {
    console.log(data[i])
    } 
}
