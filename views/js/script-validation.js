// ---------- Sign up&in validation ----------

$( document ).ready(function() {
    console.log( "ready!" );


const name = document.getElementById('name')
const password = document.getElementById('password')
const form = document.getElementById('signUpForm')
// const errorElement = document.getElementById('nameError')


form.addEventListener('submit', (e) => {
  let messages = ''
  if (name.value === '' || name.value == null) {
    messages = 'Name is required'
    document.getElementById('nameError').innerHTML = messages
  }
  if(email.value === '' || name.value == null)
  if (password.value.length == 0 || password.value.length == null) {
    messages = 'You must enter password for security'
    document.getElementById('passwordError').innerHTML = messages
  }

  else if (password.value.length <= 6) {
    messages = 'Password must be longer than 6 characters'
    document.getElementById('passwordError').innerHTML = messages
  }

  else if (password.value.length >= 20) {
    messages = 'Password must be less than 20 characters'
    document.getElementById('passwordError').innerHTML = messages
  }

  else if (password.value === 'password') {
    messages = 'Password cannot be password'
    document.getElementById('passwordError').innerHTML = messages
  }

  if (messages.length > 0) {
    e.preventDefault()
  }
})

});