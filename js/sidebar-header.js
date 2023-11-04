let isSubMenu = false;

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
