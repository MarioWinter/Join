let tasks = [];

// function for prio area
function changePrioColor(prio) {
  let container = document.getElementById(prio + '_container');
  let img = document.getElementById(prio + '_img');
  if (container.classList.contains('selected')) {
    settingPrioBackground(container, img, prio, false);
    container.classList.remove('selected');
  } else {
    resetContainers();
    container.classList.add('selected');    
    let color = determinePrioBackgroundColor(prio);
    container.style.backgroundColor = color;
    container.style.color = 'white';
    img.src = './img/' + prio + '-white.svg';
  }
}

// function for prio area
function settingPrioBackground(container, img, prio) {
  container.style.backgroundColor = 'white';
  container.style.color = '#2a3647';
  img.src = './img/' + prio + '.svg';
}

// function for prio area
function determinePrioBackgroundColor(prio) {
  let color;
  if (prio === 'urgent') {
    color = '#ff3d00';
  } else if (prio === 'medium') {
    color = '#ffa800';
  } else if (prio === 'low') {
    color = '#7ae229';
  }
  return color;
}

// function for prio area
function resetContainers() {
  let containers = document.getElementsByClassName('status-definition-container');
  for (let i = 0; i < containers.length; i++) {
    let container = containers[i];
    container.style.backgroundColor = 'white';
    container.style.color = '#2a3647';
    let img = container.getElementsByClassName('prio-images')[0];
    img.src = './img/' + container.id.replace('_container', '') + '.svg';
    container.classList.remove('selected');
  }
}

// function for celaring all fields after already named
function clearAllFields() {
  document.getElementById('enter_title_field').value = '';
  document.getElementById('enter-description_field').value = '';
  document.getElementById('select_contacts_field').selectedIndex = 0;
  document.getElementById('date_field').value = '';  
  resetContainers();  
  document.getElementById('select_category_field').selectedIndex = 0;
  document.getElementById('add_new_subtask_field').value = '';
  document.getElementById('select_contacts_field').value = '';
}

async function taskToRemoteStorage(){
  users.push({
    title: id.value,
    description: id.value,
    password: sign_password.value,
  });
  await setItem('tasks', JSON.stringify(users));
}

// function for display date today and future
function getDateToday(){
    let today = new Date().toISOString().split('T')[0];
    document.getElementById("date_field").setAttribute('min', today);
}

// function to change select contacts area arrow svg-img
function rotateArrow() {
  let arrowIcon = document.getElementById('arrow_icon');
  if (arrowIcon.classList.contains('rotate')) {
      arrowIcon.classList.remove('rotate');
  } else {
      arrowIcon.classList.add('rotate'); 
  }
}

// 
function rotateCategoryArrow() {
  let categoryArrowIcon = document.getElementById('category_arrow_icon');
  if (categoryArrowIcon.classList.contains('rotate')) {
    categoryArrowIcon.classList.remove('rotate');
  } else {
    categoryArrowIcon.classList.add('rotate');
  }
}

