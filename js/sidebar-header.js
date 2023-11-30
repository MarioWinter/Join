let isSubMenu = false;
let idMenuBtn;

function showSubmenu() {
  let subMenu = document.getElementById('sub_menu');
  if (isSubMenu) {
    subMenu.classList.add('hide-header-aside');
    isSubMenu = false;
  } else {
    subMenu.classList.remove('hide-header-aside');
    isSubMenu = true;
  }
}

function selectMenuButton(ID) {
  saveIdMenuBtn(ID);
  removeButtonSelection();
  loadIdMenuBtn();
  let button = document.getElementById(ID);
  button.classList.add('sidebar-button-selected');
}

function selectPrivacyButton(ID) {
  saveIdMenuBtn(ID);
  removeButtonSelection();
  loadIdMenuBtn();
  let button = document.getElementById(ID);
  button.classList.add('sidebar-privacy-button-selected');
}

function removeButtonSelection() {
  for (let i = 1; i <= 6; i++) {
    let button = document.getElementById(`sidebar_button${i}`);
    button.classList.remove('sidebar-button-selected');
    button.classList.remove('sidebar-privacy-button-selected');
  }
}

function saveIdMenuBtn(ID) {
  idMenuBtn = ID;
  localStorage.setItem('selected-btn', ID);
}

function loadIdMenuBtn() {
  idMenuBtn = localStorage.getItem('selected-btn');
  removeButtonSelection();
  let button = document.getElementById(idMenuBtn);
  button.classList.add('sidebar-button-selected');
}
