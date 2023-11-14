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

/**
 * function for save user data in remoteStorage
 */
async function registerUser() {
  
  users.push({
    name: sign_name.value,
    email: sign_email.value,
    password: sign_password.value,
  })
  resetForm();
}

function check_pass() {
  if (document.getElementById('sign_password').value ==
          document.getElementById('sign_password_confirm').value) {
      document.getElementById('register_btn').disabled = false;
  } else {
      document.getElementById('register_btn').disabled = true;
  }
}

function resetForm(){
  sign_name.value = '';
  sign_email.value = '';
  sign_password.value = '';
  sign_password_confirm.value = '';

}
