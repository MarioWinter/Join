/*-------------------------------------
Include HTML Templates (header/footer)
--------------------------------------*/
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

let users = [];
let currentUser;

async function summaryInit(){
  await includeHTML();
  loadCurrentUser();
}

async function init() {
  loadUsers();
  renderLogIn();
}

/**
 * 
 * This Function render login window
 *
 */
function renderLogIn() {
  let log_container = document.getElementById('log_container');
  log_container.innerHTML = '';
  log_container.classList.remove('height-sing-up');
  log_container.innerHTML += renderHtmlLogIn();
}
/**
 * Function for render the Sign Up window
 */
function renderSignUp() {
  let log_container = document.getElementById('log_container');
  log_container.innerHTML = '';
  log_container.classList.add('height-sing-up');
  log_container.innerHTML +=
    renderSignUpHTML();
}

// sign up //

/**
 * function for save user data in remoteStorage, first we push infos from register inputs in array "users",
 * then we send that to remoteStorage 
 */
async function registerUser() {

  let email = document.getElementById('sign_email').value;
  if (isEmailExists(email)) {
    emailExist();
  }
  else {
    userToRemoteStorage();
    successfulRegistration();
  }

}

async function userToRemoteStorage() {
  users.push({
    name: sign_name.value,
    email: sign_email.value,
    password: sign_password.value,
  });
  await setItem('users', JSON.stringify(users));
}

function successfulRegistration() {
  const sing_up_container = document.getElementById('sing_up_container');
  sing_up_container.innerHTML = '<span class="register-succesful">Registration successful</span>';


  setTimeout(() => {
    renderLogIn();
  }, 1000);
}

function isEmailExists(email) {
  return users.some(user => user.email === email);
}

function emailExist() {
  let messageElement = document.getElementById('message');
  messageElement.innerText = 'Die E-Mail ist bereits vorhanden.';
  messageElement.style.color = 'red';
}

/**
 * This function load the users from remoteStorage to local array
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}

/**
 * function to check out if password and confirm password are the same, if yes change button status to clickable.
 */
function checkPass() {
  if (document.getElementById('sign_password').value ==
    document.getElementById('sign_password_confirm').value) {
    document.getElementById('register_btn').disabled = false;
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'matching';
  } else {
    document.getElementById('register_btn').disabled = true;
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'not matching';
  }

}

/**
 * This function reset  inputs fields from form
 */
function resetForm() {
  document.getElementById('sign_name').value = '';
  document.getElementById('sign_email').value = '';
  document.getElementById('sign_password').value = '';
  document.getElementById('sign_password_confirm').value = '';
}


// Log in //

function logIn() {
  let email = document.getElementById('log_in_email').value;
  let password = document.getElementById('log_in_password').value;
  let user = logInValidation(email, password);
  console.log(user);
  if (user) {
    indexOfUser(email);
    console.log('User Gefunden');
    logInSuccedMsg();
  }
  else {
    document.getElementById('log_message').innerText = 'User not found';
  }
}

function indexOfUser(email){
  let userIndex = users.findIndex(user => user.email === email);
  localStorage.setItem('currentUserIndex', userIndex);
}

function logInValidation(email, password){
 let user = users.find(u => u.email == email && u.password == password);
  return user;
}

function logInSuccedMsg(){
  document.getElementById('log_message').innerText = "Log in successful";
  setTimeout(() => {
      window.location.href = 'summary.html';
    }, 2000);
}

function loadCurrentUser(){
  let currentUserIndex = localStorage.getItem('currentUserIndex');
if (currentUserIndex !== null) {
  currentUser = users[parseInt(currentUserIndex)];
}
}