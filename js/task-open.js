function loadTaskOpen(id) {
    let tasks = addedTasks.filter((t) => t["id"] === id);
    document.getElementById('task_overlay_bg').innerHTML = "";
    for (let index = 0; index < tasks.length; index++) {
        let task = tasks[index];
        // let id = task['id'];
        // let bucket = task['bucket'];
        let title = task['title'];
        let description = task['description'];
        let prio = task['prio'];
        let duedate = formatDueDate(task['duedate']);
        let category = task['category'];
        let subtasks = task['subtask'];
        let assigneds = task['assigned'];
        showFrame('task_overlay_bg');
        addOverlayBg('task_overlay_bg');
        loadTask(id, title, description, prio, category, subtasks, assigneds, duedate);
        frameSlideIn('task_open_overlay_frame');
    }
}


function loadTask(id, title, description, prio, category, subtasks, assigneds, duedate) {
    let categoryColor = loadCategoryColor(category);
    document.getElementById('task_overlay_bg').innerHTML = 
    generateOpenTaskHTML(id, title, description, category, categoryColor, duedate);
    loadTaskOpenPrio(prio, 'task_open_prio');
    loadAssignedsOpenTask(assigneds, id);
    loadSubtasks(subtasks, 'task_overlay_subtasks_container', id);
}

function loadTaskOpenPrio(prio, id) {
    let taskPrioIcon = document.getElementById(id);
    if (prio === "Urgent") {
        taskPrioIcon.innerHTML = `<div>${prio}</div> ${generateUrgentPrioIcon()}`;
    } else if (prio === "Medium") {
        taskPrioIcon.innerHTML = `<div>${prio}</div> ${generateMediumPrioIcon()}`;
    } else if (prio === "Low") {
        taskPrioIcon.innerHTML = `<div>${prio}</div> ${generateLowPrioIcon()}`;
    }
}

function loadAssignedsOpenTask(assigneds, id) {
    let assigned = document.getElementById('assigned_to_contacts_task_open');
    assigned.innerHTML = "";
    for (let i = 0; i < assigneds.length; i++) {
        let badgeColor = getUserColor(assigneds, i);
        let assignedUserName = assigneds[i];
        let userBadge = generateUserBadge(assignedUserName);
        assigned.innerHTML +=
        generateAssigmentHTML(userBadge, badgeColor, assignedUserName, id);
    };
}

function loadSubtasks(subtasks, elementID, index) {
    let subtasksContainer = document.getElementById(elementID);
    subtasksContainer.innerHTML = "";
    if(subtasks.length > 0) {
        for (let i = 0; i < subtasks.length; i++) {
            let subtask = subtasks[i];
            let subdone = subtask['subdone'];
            let subtitle = subtask['subtitle'];
            subtasksContainer.innerHTML += checkSubtask(subdone, subtitle, i, index);
        }
    } else
    {
        clearElement('label_task_open_subtask');
    }
}

function checkSubtask(subdone, subtitle, i, index) {
    if (subdone) {
        return generateSubtasksCheckedHTML(subtitle, i, index);
    } else
    {
        return generateSubtasksHTML(subtitle, i, index);
    }
}

function clearElement(id) {
    document.getElementById(id).innerHTML = "";
}

function changeSubtaskConfirmation(id, i, j) {
    let checkSubtask = document.getElementById(id);
    let subtask = addedTasks[j].subtask[i];
    if(checkSubtask.checked) {
        subtask['subdone'] = true;
    } else if (!checkSubtask.checked)
    {
        subtask['subdone'] = false;
    }
}

function getUserColor(assigneds, index) {
    let assignedName = assigneds[index];
    let user = users.filter((t) => t["name"] === assignedName);
    let badgeColor = user[0]['bgcolor'];
    return badgeColor;
}

// Load Edit Task Section

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
        let subtasks = task['subtask'];
        let assigneds = task['assigned'];
        initEditTask(id, title, description, prio, category, subtasks, assigneds, duedate);
    }
}

function initEditTask(id, title, description, prio, category, subtasks, assigneds, duedate) {
    let categoryColor = loadCategoryColor(category);
    document.getElementById('task_overlay_bg').innerHTML = 
    generateEditTaskHTML(id, title, description, category, categoryColor, duedate);
    loadAllUsersForContactOnAssignedTo(assigneds, 'et_contact_overlay', id);
    loadAssignedOnEditTask(assigneds, 'et_selected_contacts');
    setTodayDateForCalendar('calendar_edit_task');
    loadPrioOnEditTask(prio);

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
