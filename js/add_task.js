let addedSubtasks = [];
let newAssigned = [];


async function initAddTask() {
  await loadUsers();
  await loadAddedTasks();
  getDateToday();
  changePrioColor("Medium");
  initUserSelectField("et_contact_overlay");
  checkIfSendingIsPossible();
}

async function loadAddedTasks() {
  try {
    addedTasks = JSON.parse(await getItem("addedTasks"));
  } catch (e) {
    console.error("Loading Added Tasks error:", e);
  }
}

// changes the color of priority area based on interaction
function changePrioColor(prio) {
  resetContainers();
  let container = document.getElementById(`${prio}_container`);
  let img = document.getElementById(`${prio}_img`);
  container.classList.add("selected");
  let color = determinePrioBackgroundColor(prio);
  container.style.backgroundColor = color;
  container.style.color = "white";
  img.src = `./img/${prio}-white.svg`;
}


// resets the background color of priority area
function settingPrioBackground(container, img, prio) {
    container.style.backgroundColor = "white";
    container.style.color = "#2a3647";
    img.src = "./img/" + prio + ".svg";
}

// determines the background color for a given priority
function determinePrioBackgroundColor(prio) {
  let color;
  if (prio === "Urgent") {
    color = "#ff3d00";
  } else if (prio === "Medium") {
    color = "#ffa800";
  } else if (prio === "Low") {
    color = "#7ae229";
  }
  return color;
}

// resets background color of all priority containers
function resetContainers() {
  let containers = document.getElementsByClassName(
    "status-definition-container"
  );
  for (let i = 0; i < containers.length; i++) {
    let container = containers[i];
    container.style.backgroundColor = "white";
    container.style.color = "#2a3647";
    let img = container.getElementsByClassName("prio-images")[0];
    img.src = "./img/" + container.id.replace("_container", "") + ".svg";
    container.classList.remove("selected");
  }
}

function initUserSelectField(containerID) {
    let contactsContainer = document.getElementById(containerID);
    for (let i = 0; i < users.length; i++) {
        let userName = users[i]["name"];
        let userBadge = generateUserBadge(userName);
        let badgeColor = users[i]["bgcolor"];
        if (newAssigned.includes(userName)) {
            contactsContainer.innerHTML += generateTaskAssigmentContactsHTML(userName, badgeColor, userBadge, i);
        } else {
            contactsContainer.innerHTML += generateTaskAssigmentContactsHTML(userName, badgeColor, userBadge, i);
        }
    }
}

function addElectedContact(id, i, newAssigned) {
    let checkAssigned = document.getElementById(id);
    let userName = users[i]["name"];
    let deleteName = newAssigned.indexOf(userName);
    if (checkAssigned.checked) {
        newAssigned.push(userName);
    } else if (!checkAssigned.checked) {
        newAssigned.splice(deleteName, 1);
    }
    showSelectedContacts(newAssigned, "et_selected_contacts");
}

function showSelectedContacts(newAssigned) {
    let selectedContacts = document.getElementById("et_selected_contacts");
    selectedContacts.innerHTML = "";

    for (let i = 0; i < newAssigned.length; i++) {
        let userName = newAssigned[i];
        let userIndex = users.findIndex((user) => user.name === userName);

        if (userIndex !== -1) {
            let badgeColor = users[userIndex]["bgcolor"];
            let userBadge = generateUserBadge(userName);

            let selectedContactHTML = generateSelectedContactHTML(userName, badgeColor, userBadge, i);
            selectedContacts.innerHTML += selectedContactHTML;
        }
    }
}

function generateSelectedContactHTML(userName, badgeColor, userBadge, i) {
    return `
    <label class="selected-contact-label">      
        <div class="contact-badge" style="background-color: ${badgeColor};">
          <span>${userBadge}</span>
        </div>      
    </label>
  `;
}

//
function generateTaskAssigmentContactsHTML(userName, badgeColor, userBadge, i) {
    return `
    <label class="slider-contact-label" for="_check-contact${i}">
      <div class="current-contact-slider">
        <div id="_contect_badge${i}" class="contact-badge" style="background-color: ${badgeColor};">
          <span>${userBadge}</span>
        </div>
        <span>${userName}</span>
        <div class="checkbox">
          <input onclick="addElectedContact('_confirm_contact${i}', ${i}, newAssigned)" id="_confirm_contact${i}" type="checkbox" />
          <label class="checkbox-edit-task" for="_confirm_contact${i}"></label>
        </div>
      </div>
    </label>
  `;
}

function generateTaskAssigmentContactsCheckedHTML(userName, badgeColor, userBadge, i) {
    return `
    <label class="slider-contact-label" for="_check-contact${i}">
      <div class="current-contact-slider">
        <div id="_contect_badge${i}" class="contact-badge" style="background-color: ${badgeColor};">
          <span>${userBadge}</span>
        </div>
        <span>${userName}</span>
        <div class="checkbox">
          <input onclick="addElectedContact('_confirm_contact${i}', ${i}, newAssigned)" id="_confirm_contact${i}" type="checkbox" checked/>
          <label class="checkbox-edit-task" for="_confirm_contact${i}"></label>
        </div>
      </div>
    </label>
  `;
}

// sets the minimum date for the date field to today
function getDateToday() {
  let today = new Date().toISOString().split("T")[0];
  let dateField = document.getElementById("date_field");
  dateField.setAttribute("min", today);

  dateField.addEventListener("input", function () {
    if (dateField.value) {
      dateField.style.color = "black";
    } else {
      dateField.style.color = "lightgrey";
    }
  });
}

// changes the visibility of subtask icons for adding subtasks
function changingSubtaskIcons() {
    let inputField = document.getElementById("add_new_subtask_field");
    document.getElementById("normal_subtask_icon").classList.add("d-none");
    document.getElementById("three_subtask_icons").classList.remove("d-none");
    inputField.focus();
    inputField.select();
}

// closes the subtask icons and returns to normal view
function closeSubtaskIcons() {
    document.getElementById("normal_subtask_icon").classList.remove("d-none");
    document.getElementById("three_subtask_icons").classList.add("d-none");
    let input = document.getElementById("add_new_subtask_field");
    input.value = "";
}

// handles actions related to adding subtasks
function handleSubtaskActions() {
  let subtaskInput = document.getElementById("add_new_subtask_field");
  let input = document.getElementById("add_new_subtask_field");
  let subtask = subtaskInput.value.trim();
  changingSubtaskIcons();
  displaySubtasks();
  input.value = "";
}

// show added subtasks
function displaySubtasks() {
  let subtask = document.getElementById("add_new_subtask_field").value.trim();
  if (subtask !== "") {
    addedSubtasks.push({ subdone: false, subtitle: subtask });
    renderAddedSubtasks();
    subtask.value = "";
  }
}

function renderAddedSubtasks() {
  let subtaskContainer = document.getElementById("subtask_display_container");
  subtaskContainer.innerHTML = "";
  for (let i = 0; i < addedSubtasks.length; i++) {
    let subtask = addedSubtasks[i].subtitle;    
    subtaskContainer.innerHTML += createSubtaskHTML(subtask, i);
    console.log(subtask); } 
  subtaskContainer.classList.remove("d-none");
  closeSubtaskIcons();  
}


// creates the html code for subtask
function createSubtaskHTML(subtask, index) {
  return `
  <div class="added-subtask">•
    <input id="input_${index}" class="subtask-input" type="text" value="${subtask}" contenteditable="true">
     <div class="added-subtask-icons">
      <img id="subtask_icons_3_${index}" onclick="deleteAddedSubtask('${subtask}')" class="invisible subtask-icon" src="./img/delete-icon.svg">
      <img id="subtask_icons_2_${index}" class="invisible vector-line" src="./img/vector-line.svg">
      <img id="subtask_icons_1_${index}" onclick="editAddedSubtask(${index})" class="invisible subtask-icon" src="./img/pencil-icon.svg">
      <img id="check_dark_save_${index}" onclick="saveEditedSubtask(${index})" class="invisible subtask-icon d-none" src="./img/check-dark.svg">  
     </div>
    </div>
  `;
}

// speichert den bearbeiteten subtask
function saveEditedSubtask(index) {
  let inputField = document.getElementById(`input_${index}`);
  let subtask = inputField.value.trim();
  if (subtask !== "") {
    addedSubtasks[index].subtitle = subtask;
    renderAddedSubtasks();
  }
}

// initiate edited added subtask
function editAddedSubtask(index) {
    moveIconsForEditing(index);
    document.getElementById(`subtask_icons_1_${index}`).classList.add("d-none");
    document.getElementById(`check_dark_save_${index}`).classList.remove("d-none");
    let inputField = document.getElementById(`input_${index}`);
    inputField.focus();
}

// moves icons for editing within the subtask container
function moveIconsForEditing(index) {
    let editIcon = document.getElementById(`subtask_icons_1_${index}`);
    let deleteIcon = document.getElementById(`subtask_icons_3_${index}`);
    let saveIcon = document.getElementById(`check_dark_save_${index}`);
    let vectorLine = document.getElementById(`subtask_icons_2_${index}`);
    let container = editIcon.parentElement;

    container.insertBefore(saveIcon, editIcon);
    container.insertBefore(vectorLine, editIcon);
    container.insertBefore(deleteIcon, editIcon);
}

// deletes added subtask from the list
function deleteAddedSubtask(subtask) {
    let index = addedSubtasks.indexOf(subtask);
    if (index == -1 || index !== -1) {
        addedSubtasks.splice(index, 1);
        renderAddedSubtasks();
    }
}

// clears input fields and resets various containers
function clearAllFields() {
  clearContainerLeft();
  resetContainers();
  clearContainerRight();
  closeSubtaskIcons();
  document.getElementById("subtask_display_container").innerHTML = "";
  addedSubtasks = [];
  changePrioColor("Medium");
}

// clears input fields left side
function clearContainerLeft() {
  document.getElementById("enter_title_field").value = "";
  document.getElementById("enter_description_field").value = "";
  document.getElementById("et_select_contacts_search").value = "";
  clearSelectedContacts();
}

// clears already selected and added contacts
function clearSelectedContacts() {
    newAssigned = [];
    showSelectedContacts(newAssigned);
}

// clears input fields right side
function clearContainerRight() {
  let dateField = document.getElementById("date_field");
  document.getElementById("date_field").value = "";
  dateField.style.color = "lightgrey";
  document.getElementById("select_category_field").selectedIndex = 0;
  document.getElementById("add_new_subtask_field").value = "";
}

function checkIfSendingIsPossible() {
    let createTaskButton = document.getElementById("create_task_button");
    let titleField = document.getElementById("enter_title_field");
    let dateField = document.getElementById("date_field");
    let categoryField = document.getElementById("select_category_field");

  function checkInputs() {
    if (
      titleField.value.trim().length > 0 && dateField.value.trim().length > 0 && categoryField.value.trim().length > 0
    ) {
      createTaskButton.disabled = false;
    } else {
      createTaskButton.disabled = true;
    }
  }
    titleField.addEventListener("input", checkInputs);
    dateField.addEventListener("input", checkInputs);
    categoryField.addEventListener("input", checkInputs);
}


function getSelectedPriority() {
  let priorityContainers = document.getElementsByClassName(
    "status-definition-container"
  );
  for (let i = 0; i < priorityContainers.length; i++) {
    if (priorityContainers[i].classList.contains("selected")) {
      return priorityContainers[i].id.replace("_container", "");
    }
  }  
}

async function createTask() {
  let setNewTask = createNewTaskID();
  let selectedPriority = getSelectedPriority();
  await pushToJSON(setNewTask, selectedPriority);  
  await setItem("addedTasks", JSON.stringify(addedTasks));
  createTaskMessage();
  setTimeout(() => {
    window.location.href = "board.html";
  }, 1000);
}

async function pushToJSON(setNewTask, selectedPriority) {
  addedTasks.push({
    id: setNewTask,
    bucket: "to-do",
    title: enter_title_field.value,
    description: enter_description_field.value,
    assigned: newAssigned,
    duedate: date_field.value,
    prio: selectedPriority,
    category: select_category_field.value,
    subtask: addedSubtasks,
  });
}

function createTaskMessage() {
  let taskMessage = document.getElementById("sending_confirmation");
  taskMessage.classList.add("animate-message");
}

function createNewTaskID() {
  let newTaskID;
  if (addedTasks.length !== 0) {
    newTaskID = addedTasks.length;
  } else {
    newTaskID = 0;
  }
  return newTaskID;
}
