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




function renderLogIn(){
    let log_container = document.getElementById('log_container');
    log_container.innerHTML = '';
    log_container.classList.remove('height-sing-up');
    log_container.innerHTML += renderHtmlLogIn();
}

function renderSignUp(){
    let log_container = document.getElementById('log_container');
    log_container.innerHTML = '';
    log_container.classList.add('height-sing-up');
    log_container.innerHTML += 
    renderSignUpHTML();S
} 