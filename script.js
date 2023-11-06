


function renderLogIn(){
    let log_container = document.getElementById('log_container');
    log_container.innerHTML = '';
    log_container.classList.remove('height-sing-up');
    log_container.innerHTML += renderHtmlLogIn();
}

function renderSingUp(){
    let log_container = document.getElementById('log_container');
    log_container.innerHTML = '';
    log_container.classList.add('height-sing-up');
    log_container.innerHTML += 
    renderSingUpHTML();
} 