// ---------- Sign up&in validation ----------

$(document).ready(function () {
  console.log("ready!");


  const name = document.getElementById('name')
  const password = document.getElementById('password')
  const formUp = document.getElementById('signUpForm')
  const formIn = document.getElementById('signInForm')
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // const errorElement = document.getElementById('nameError')

  formIn.addEventListener('submit', (t) => {
    let messages = ''
    if (name.value === '' || name.value == null) {
      messages = 'Username!'
      document.getElementById('nameError').innerHTML = messages
      name.focus()
      return false
    }
    if (password.value.length == 0 || password.value.length == null) {
      messages = 'Password!'
      document.getElementById('passwordError').innerHTML = messages
      password.focus()
      return false
    }

    else if (password.value.length <= 6) {
      messages = 'Password must be longer than 6 characters'
      document.getElementById('passwordError').innerHTML = messages
      password.focus()
      return false
    }

    else if (password.value.length >= 20) {
      messages = 'Password must be less than 20 characters'
      document.getElementById('passwordError').innerHTML = messages
      password.focus()
      return false
    }

  });



  formUp.addEventListener('submit', (e) => {
    let messages = ''
    if (name.value === '' || name.value == null) {
      messages = 'Name is required'
      document.getElementById('nameError').innerHTML = messages
      name.focus()
      return false
    }
    if (email.value === '' || name.value == null) {
      messages = 'Email is required'
      document.getElementById('emailError').innerHTML = messages
      email.focus()
      return false
    }
    if (!(email.value.match(mailformat))) {
      messages = 'invalid email address!'
      document.getElementById('emailError').innerHTML = messages
      email.focus()
      return false
    }
    if (password.value.length == 0 || password.value.length == null) {
      messages = 'You must enter password for security'
      document.getElementById('passwordError').innerHTML = messages
      password.focus()
      return false
    }

    else if (password.value.length <= 6) {
      messages = 'Password must be longer than 6 characters'
      document.getElementById('passwordError').innerHTML = messages
      password.focus()
      return false
    }

    else if (password.value.length >= 20) {
      messages = 'Password must be less than 20 characters'
      document.getElementById('passwordError').innerHTML = messages
      password.focus()
      return false
    }

    else if (password.value === 'password') {
      messages = 'Password cannot be password'
      document.getElementById('passwordError').innerHTML = messages
      password.focus()
      return false
    }

    if (messages.length > 0) {
      e.preventDefault()
    }
  });



});