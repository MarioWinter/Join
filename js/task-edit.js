
function loadTaskEdit(id) {
    let tasks = addedTasks.filter((t) => t["id"] === id);
    document.getElementById('task_overlay_bg').innerHTML = "";
    for (let index = 0; index < tasks.length; index++) {
        let task = tasks[index];
        // let id = task['id'];
        // let bucket = task['bucket'];
        let title = task['title'];
        let description = task['description'];
        let prio = task['prio'];
        let duedate = task['duedate'];
        let category = task['category'];
        let assigneds = task['assigned'];
        initEditTask(id, title, description, prio, category, assigneds, duedate);
    }
}

function initEditTask(id, title, description, prio, category, assigneds, duedate) {
    let categoryColor = loadCategoryColor(category);
    document.getElementById('task_overlay_bg').innerHTML = 
    generateEditTaskHTML(id, title, description, category, categoryColor, duedate);
    loadAllUsersForContactOnAssignedTo(assigneds, 'et_contact_overlay', id);
    loadAssignedOnEditTask(assigneds, 'et_selected_contacts');
    setTodayDateForCalendar('calendar_edit_task');
    loadPrioOnEditTask(prio);
    loadSubtasksEditTask('subtask_lists', id);

}

function loadPrioOnEditTask(prio) {
    if (prio === "Urgent") {
        changePrioBtnColor('urgent-btn-edit');
    } else if (prio === "Medium") {
        changePrioBtnColor('medium-btn-edit');
    } else if (prio === "Low") {
        changePrioBtnColor('low-btn-edit');
    }
}

let isCantactOpen = true
function openContactOverlay(containerID) {
    if(isCantactOpen) {
        show(containerID);
        hide('select-contacts_down');
        show('select-contacts_up');

        
        isCantactOpen = false;
    } else {
        hide(containerID);
        show('select-contacts_down');
        hide('select-contacts_up');
        isCantactOpen = true;
    }
}

function loadAllUsersForContactOnAssignedTo(assigneds, containerID, ID) {
    let contactsContainer = document.getElementById(containerID);
    for (let i = 0; i < users.length; i++) {
        let userName = users[i]['name'];
        let userBadge = generateUserBadge(userName);
        let badgeColor = users[i]['bgcolor'];
        if (assigneds.includes(userName)) {
            contactsContainer.innerHTML += generateEditTaskAssigmentContactsCheckedHTML(badgeColor, userBadge, userName, i, ID);
        } else {
            contactsContainer.innerHTML += generateEditTaskAssigmentContactsHTML(badgeColor, userBadge, userName, i, ID);
        }
    }
    
}

function addContactAsAssigned(id, i, j) {
    let checkAssigned = document.getElementById(id);
    let assigned = addedTasks[j]['assigned'];
    let userName = users[i]['name'];
    let deleteName = assigned.indexOf(userName);
    if(checkAssigned.checked) {
        assigned.push(userName);
    } else if (!checkAssigned.checked)
    {
        assigned.splice(deleteName,1);
    }
    loadAssignedOnEditTask(assigned, 'et_selected_contacts');
}

function loadAssignedOnEditTask(assigneds, containerID) {
    let selectetContactsContainer = document.getElementById(containerID);
    selectetContactsContainer.innerHTML = "";
    for (let i = 0; i < assigneds.length; i++) {
        let badgeColor = getUserColor(assigneds, i);
        let assignedName = assigneds[i];
        let userBadge = generateUserBadge(assignedName);
        selectetContactsContainer.innerHTML += generateAssigmentBadgeEditTaskHTML(userBadge, badgeColor, i);
    }
}

function filterUserOnAssignedTo(inputID, searchContainerID, id) {
    let searchTerm = document.getElementById(inputID).value;
    let assigneds = addedTasks[id]['assigned'];
    searchTerm = searchTerm.toLowerCase();
    let contactsContainer = document.getElementById(searchContainerID);
    contactsContainer.innerHTML = "";
    if (searchTerm == "") {
        loadAllUsersForContactOnAssignedTo(assigneds, searchContainerID, id);
    } else {
        getContect(assigneds, searchTerm ,id, contactsContainer);
    }
}

function getContect(assigneds, searchTerm ,id, contactsContainer) {
    for (let i = 0; i < users.length; i++) {
        let userName = users[i]['name'];
        if(userName.toLowerCase().includes(searchTerm)) {
            let userBadge = generateUserBadge(userName);
            let badgeColor = users[i]['bgcolor'];
            if (assigneds.includes(userName)) {
                contactsContainer.innerHTML += generateEditTaskAssigmentContactsCheckedHTML(badgeColor, userBadge, userName, i, id);
            } else {
                contactsContainer.innerHTML += generateEditTaskAssigmentContactsHTML(badgeColor, userBadge, userName, i, id);
            }
        }
    }
}

function showSubtaskInput(addSubtaskID, checkSubtaskID) {
    hide(addSubtaskID);
    show(checkSubtaskID);
}

function cancelAddSubtask(addSubtaskID, checkSubtaskID) {
    show(addSubtaskID);
    hide(checkSubtaskID);
    document.getElementById('subtask_input').value = "";
}

function loadSubtask(taskID) {
    let tasks = addedTasks.filter((t) => t["id"] === taskID);
    for (let index = 0; index < tasks.length; index++) {
        let task = tasks[index];
        let subtask = task['subtask'];
        return subtask
    }
}

function loadSubtasksEditTask(subtaskListItemID, ID) {
    let subtaskContainer = document.getElementById(subtaskListItemID);
    subtaskContainer.innerHTML = "";
    let subTask = loadSubtask(ID);
    for (let i = 0; i < subTask.length; i++) {
        let subtitle = subTask[i]['subtitle'];
        subtaskContainer.innerHTML += generateSubtaskListItemHTML(subtitle, i, ID);
        
    }
}

function addSubtask(taskID, subtaskListItemID) {
    let subTask = loadSubtask(taskID);
    subTask.push({
        subdone: false,
        subtitle: subtask_input.value,
    });
    cancelAddSubtask('add_subtask', 'check_subtask_icons');
    loadSubtasksEditTask(subtaskListItemID, taskID);
}

function deleteSubtask(taskID, subTaskID, subtaskListItemID) {
    let subTask = loadSubtask(taskID);
    subTask.splice(subTaskID,1);
    loadSubtasksEditTask(subtaskListItemID, taskID);
}
