let tasks = [];
let subtaskOptions = 0;
let text = ['Contact Form', 'Write Legal Imprint'];
let selectedSubtasks = [];
let firstSubtaskContainerId = 'subtask_display_first';
let secondSubtaskContainerId = 'subtask_display_second';
let isFirstContainerFilled = false;


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
  closeSubtaskIcons();
  document.getElementById('subtask_display_container').innerHTML = '';
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

// function for switsching the two words 
function handleSubtaskActions() {
  let input = document.getElementById('add_new_subtask_field');
  input.value = text[subtaskOptions % text.length];
  subtaskOptions++;
  if (subtaskOptions === text.length) {
    subtaskOptions;
  }
  if (subtaskOptions) {
    changingSubtaskIcons();    
  } else {
    insertSubtaskContainer('subtask_display_first');
    insertSubtaskContainer('subtask_display_second');
    closeSubtaskIcons();
    input.value = '';
  }    
}

// function to change the subtask icons for adding 
function changingSubtaskIcons() {
  document.getElementById('normal_subtask_icon').classList.add('d-none');
  document.getElementById('three_subtask_icons').classList.remove('d-none');
}

// function to close the adding icons and back to normal 
function closeSubtaskIcons() {
  document.getElementById('normal_subtask_icon').classList.remove('d-none');
  document.getElementById('three_subtask_icons').classList.add('d-none');  
  let input = document.getElementById('add_new_subtask_field');
  input.value = '';
}

// function for add the selected word
function addSubtaskToList() {  
  let input = document.getElementById('add_new_subtask_field');
  let subtask = input.value.trim();
  if (subtask !== '') {
    selectedSubtasks.push(subtask);    
    input.value = '';
  }
  closeSubtaskIcons(); 
}

// function for creating containers for selected words
function insertSubtaskContainer() {
  let input = document.getElementById('add_new_subtask_field');
  let subtask = input.value.trim();
  if (subtask !== '') {
    let containerId = isFirstContainerFilled ? 'subtask_display_second' : 'subtask_display_first';
    let container = document.getElementById(containerId);
    if (container) {
      container.classList.remove('d-none');
      container.innerHTML += `<div>• ${subtask}</div>`; 
      isFirstContainerFilled = !isFirstContainerFilled; 
    } else {
      console.log("Container not found!");
    }
  }
  closeSubtaskIcons();
}

// function for creating containers for selected words
function addSubtaskToContainer(subtask, container) {
  container.classList.remove('d-none');
  container.innerHTML += `<div>${subtask}</div>`;
}

