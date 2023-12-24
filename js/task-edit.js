
function loadTaskEdit(id) {
    let tasks = addedTasks.filter((t) => t["id"] === id);
    document.getElementById('task_overlay_bg').innerHTML = "";
    for (let index = 0; index < tasks.length; index++) {
        let task = tasks[index];
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
    generateEditTaskHTML(id, title, description, category, categoryColor, duedate, prio);
    loadAllUsersForContactOnAssignedTo(assigneds, 'et_contact_overlay', id);
    loadAssignedOnEditTask(assigneds, 'et_selected_contacts');
    setTodayDateForCalendar('calendar_edit_task');
    loadPrioOnEditTask(prio);
    loadSubtasksEditTask('subtask_lists', id);

}

function updateOpenTask(taskID) {
    debugger
    updateOpenTaskTitle(taskID);
    updateOpenTaskDesc(taskID);
    updateOpenTaskDueDate(taskID);
    renderOpenTask(taskID);
}


function updateOpenTaskTitle(taskID) {
    let titleValue = document.getElementById('title_input_ed_task').value;
    addedTasks[taskID]['title'] = titleValue;
}

function updateOpenTaskDesc(taskID) {
    let descValue = document.getElementById('description_ed_task').value;
    addedTasks[taskID]['description'] = descValue;
}

function updateOpenTaskDueDate(taskID) {
    let dueDateValue = document.getElementById('calendar_edit_task').value;
    addedTasks[taskID]['duedate'] = dueDateValue;
}

function loadPrioOnEditTask(prio) {
    debugger
    if (prio === "Urgent") {
        isActive = true;
        changePrioBtnColor('urgent-btn-edit', false, prio);
    } else if (prio === "Medium") {
        isActive = true;
        changePrioBtnColor('medium-btn-edit', false, prio);
    } else if (prio === "Low") {
        isActive = true;
        changePrioBtnColor('low-btn-edit', false, prio);
    }
}

let isCantactOpen = true
function openContactOverlay(containerID, selectedContactsID) {
    if(isCantactOpen) {
        show(containerID);
        hide(selectedContactsID);
        hide('select-contacts_down');
        show('select-contacts_up');

        
        isCantactOpen = false;
    } else {
        hide(containerID);
        show(selectedContactsID);
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

function loadSubtasksEditTask(subtaskListID, ID) {
    let subtaskContainer = document.getElementById(subtaskListID);
    subtaskContainer.innerHTML = "";
    let subtask = loadSubtask(ID);
    for (let i = 0; i < subtask.length; i++) {
        let subtitle = subtask[i]['subtitle'];
        subtaskContainer.innerHTML += generateSubtaskListItemHTML(subtitle, i, ID, 'subtask_listitem_', 'subtask_edit_container', 'subtask_edit_input', 'subtask_lists');
        
    }
}

function addSubtask(taskID, subtaskListItemID) {
    let subtask = loadSubtask(taskID);
    subtask.push({
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

function showSubtaskEditInputFrame(subtaskListItemID, subtaskEditFrameID) {
    hide(subtaskListItemID);
    show(subtaskEditFrameID);
}

function closeSubtaskEditInputFrame(subtaskListItemID, subtaskEditFrameID) {
    hide(subtaskEditFrameID);
    show(subtaskListItemID);
}

function updateSubtask(taskID, subtaskListItemID, subtaskEditInputID, subtaskID, subtaskEditFrameID, subtaskList) {
    let subtask = loadSubtask(taskID);
    let subtaskEditInput = document.getElementById(subtaskEditInputID).value;
    subtask[subtaskID]['subtitle'] = subtaskEditInput;
    subtask[subtaskID]['subdone'] = false;
    closeSubtaskEditInputFrame(subtaskListItemID, subtaskEditFrameID);
    loadSubtasksEditTask(subtaskList, taskID);
}

