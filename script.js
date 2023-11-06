


function renderLogIn(){
    let log_container = document.getElementById('log_container');
    log_container.innerHTML = '';
    log_container.innerHTML += renderHtmlLogIn();
}

function renderSingUp(){
    let log_container = document.getElementById('log_container');
    log_container.innerHTML = '';
    log_container.style="height: 63.4rem !important";
    log_container.innerHTML += 
    renderSingUpHTML();
}