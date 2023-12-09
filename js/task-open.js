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
        showOverlayBg('task_overlay_bg');
        loadTask(id, title, description, prio, category, subtasks, assigneds, duedate);
        frameSlideIn('ed_task_overlay_frame');
    }
}


function loadTask(id, title, description, prio, category, subtasks, assigneds, duedate) {
    let categoryColor = loadCategoryColor(category);
    document.getElementById('task_overlay_bg').innerHTML = 
    generateTaskOverlayHTML(id, title, description, category, categoryColor, subtasks, assigneds, duedate);
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
        let badgeColor = getRandomColor();
        let assignedUserName = assigneds[i];
        let userBadge = generateUserBadge(assignedUserName);
        assigned.innerHTML +=
        generateAssigmentHTML(userBadge, badgeColor, assignedUserName, id);
    };
}

function loadSubtasks(subtasks, id, ID) {
    let subtasksContainer = document.getElementById(id);
    subtasksContainer.innerHTML = "";
    if(subtasks.length > 0) {
        for (let i = 0; i < subtasks.length; i++) {
            let subtask = subtasks[i];
            let subdone = subtask['subdone'];
            let subtitle = subtask['subtitle'];
            subtasksContainer.innerHTML += generateSubtasksHTML(subtitle, i, ID);
            checkSubtask(subdone, `${ID}_confirm_subtask${i}`);
        }
    } else
    {
        clearElement('label_task_open_subtask');
    }
}



function checkSubtask(subdone, id) {
    if (subdone) {
        let confirmCheckbox = document.getElementById(id);
        confirmCheckbox.checked = true;
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
    let subtasks = addedTasks[j]['subtask'];
    loadSubtasks(subtasks, 'task_overlay_subtasks_container', i);
    // loadTaskOpen(j);
}