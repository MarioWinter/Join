/**
 * Loads the edit view for a specific task.
 * *This function performs the following steps:
 *  1. Filter tasks based on the provided TaskID.
 *  2. Clear the content of the task overlay background.
 *  3. Iterate through the filtered tasks.
 *  4. Extract task variables using the getTaskVariables function.
 *  5. Initialize the task editing view using the initEditTask function.
 *
 * @param {string} TaskID - The ID of the task to edit.
 * @returns {void}
 * @throws {Error} Throws an error if the provided TaskID is not valid.
 *
 */
function loadTaskEdit(TaskID) {
	let tasks = addedTasks.filter((t) => t["id"] === TaskID);
	document.getElementById("task_overlay_bg").innerHTML = "";

	for (let index = 0; index < tasks.length; index++) {
		let [
			id,
			bucket,
			title,
			description,
			prio,
			category,
			subtasks,
			assigneds,
			duedate,
			rawDuedate,
		] = getTaskVariables(tasks, index);
		initEditTask(id, title, description, prio, assigneds, rawDuedate);
	}
}

/**
 * Initializes the edit view for a task.
 * This function performs the following steps:
 *  1. Set the content of the task overlay background using generateEditTaskHTML.
 *  2. Load all users for contact on the assigned-to section of the edit task.
 *  3. Load assigned users on the edit task.
 *  4. Set today's date for the calendar in the edit task.
 *  5. Load priority information on the edit task.
 *  6. Load subtasks for the edit task.
 *
 * @param {string} id - The ID of the task.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} prio - The priority of the task.
 * @param {Array} assigneds - An array of assigned users for the task.
 * @param {string} duedate - The due date of the task.
 * @returns {void}
 *
 */
function initEditTask(id, title, description, prio, assigneds, duedate) {
	document.getElementById("task_overlay_bg").innerHTML = generateEditTaskHTML(
		id,
		title,
		description,
		duedate
	);
	loadAllUsersForContactOnAssignedTo(assigneds, "et_contact_overlay", id);
	loadAssignedOnEditTask(assigneds, "et_selected_contacts");
	setTodayDateForCalendar("calendar_edit_task");
	loadPrioOnEditTask(prio);
	loadSubtasksEditTask("subtask_lists", id);
}

/**
 * Updates the open task with the specified ID.
 * This function performs the following steps:
 *  1. Update the title of the open task.
 *  2. Update the description of the open task.
 *  3. Update the due date of the open task.
 *  4. Update the priority of the open task.
 *  5. Render the updated open task.
 *
 * @param {string} taskID - The ID of the open task to be updated.
 * @returns {void}
 */
function updateOpenTask(taskID) {
	updateOpenTaskTitle(taskID);
	updateOpenTaskDesc(taskID);
	updateOpenTaskDueDate(taskID);
	updateTaskPriority(taskID);
	renderOpenTask(taskID);
}

/**
 * Updates the title of the open task with the specified ID.
 * 1. Get the title value from the input field.
 * 2. Update the title of the open task with the obtained value.
 *
 * @param {string} taskID - The ID of the open task to be updated.
 * @returns {void}
 */
function updateOpenTaskTitle(taskID) {
	let titleValue = document.getElementById("title_input_ed_task").value;
	addedTasks[taskID]["title"] = titleValue;
}

/**
 * Updates the description of the open task with the specified ID.
 * This function performs the following steps:
 * 1. Get the description value from the input field.
 * 2. Update the description of the open task with the obtained value.
 *
 * @param {string} taskID - The ID of the open task to be updated.
 * @returns {void} - No return value.
 *
 */
function updateOpenTaskDesc(taskID) {
	let descValue = document.getElementById("description_ed_task").value;
	addedTasks[taskID]["description"] = descValue;
}

/**
 * Updates the due date of the open task with the specified ID.
 * This function performs the following steps:
 * 1. Get the due date value from the calendar input.
 * 2. Update the due date of the open task with the obtained value.
 *
 * @param {string} taskID - The ID of the open task to be updated.
 * @returns {void} - No return value.
 *
 */
function updateOpenTaskDueDate(taskID) {
	let dueDateValue = document.getElementById("calendar_edit_task").value;
	addedTasks[taskID]["duedate"] = dueDateValue;
}

/**
 * Updates the priority of the task with the specified ID.
 * This function performs the following steps:
 * 1. Check if a global priority button ID is set.
 * 2. If set, retrieve the priority value from the corresponding element.
 * 3. Update the priority of the task with the obtained value.
 *
 * @param {string} taskID - The ID of the task to update its priority.
 * @returns {void} - No return value.
 */
function updateTaskPriority(taskID) {
	let prio = "";
	if (globalPrioButtonID !== "") {
		prio = document.getElementById(globalPrioButtonID).value;
	}
	addedTasks[taskID]["prio"] = prio;
}

/**
 * Loads the priority settings on the edit task interface.
 * This function performs the following steps:
 * 1. Check the provided priority value.
 * 2. If the priority is "Urgent," set the corresponding button as active and update its color.
 * 3. If the priority is "Medium," set the corresponding button as active and update its color.
 * 4. If the priority is "Low," set the corresponding button as active and update its color.
 *
 * @param {string} prio - The priority value to be loaded.
 * @returns {void} - No return value.
 */
function loadPrioOnEditTask(prio) {
	if (prio === "Urgent") {
		isActive = true;
		changePrioBtnColor("urgent-btn", false);
	} else if (prio === "Medium") {
		isActive = true;
		changePrioBtnColor("medium-btn", false);
	} else if (prio === "Low") {
		isActive = true;
		changePrioBtnColor("low-btn", false);
	}
}

/**
 * Toggles the visibility of the contact overlay.
 *
 * This function toggles the visibility of the contact overlay based on the current state.
 * If the contact overlay is open, it hides the container and shows the selected contacts.
 * If the contact overlay is closed, it shows the container and hides the selected contacts.
 * Additionally, it adjusts the visibility of specific elements related to the contact overlay.
 *
 * @param {string} containerID - The ID of the contact container element.
 * @param {string} selectedContactsID - The ID of the selected contacts element.
 * @returns {void} - No return value.
 *
 */
let isCantactOpen = true;
function openContactOverlay(containerID, selectedContactsID) {
	if (isCantactOpen) {
		show(containerID);
		hide(selectedContactsID);
		hide("select-contacts_down");
		show("select-contacts_up");

		isCantactOpen = false;
	} else {
		hide(containerID);
		show(selectedContactsID);
		show("select-contacts_down");
		hide("select-contacts_up");
		isCantactOpen = true;
	}
}

function loadAllUsersForContactOnAssignedTo(assigneds, containerID, ID) {
	let contactsContainer = document.getElementById(containerID);
	for (let i = 0; i < users.length; i++) {
		let userName = users[i]["name"];
		let userBadge = generateUserBadge(userName);
		let badgeColor = users[i]["bgcolor"];
		if (assigneds.includes(userName)) {
			contactsContainer.innerHTML +=
				generateEditTaskAssigmentContactsCheckedHTML(
					badgeColor,
					userBadge,
					userName,
					i,
					ID
				);
		} else {
			contactsContainer.innerHTML +=
				generateEditTaskAssigmentContactsHTML(
					badgeColor,
					userBadge,
					userName,
					i,
					ID
				);
		}
	}
}

function addContactAsAssigned(id, i, j) {
	let checkAssigned = document.getElementById(id);
	let assigned = addedTasks[j]["assigned"];
	let userName = users[i]["name"];
	let deleteName = assigned.indexOf(userName);
	if (checkAssigned.checked) {
		assigned.push(userName);
	} else if (!checkAssigned.checked) {
		assigned.splice(deleteName, 1);
	}
	loadAssignedOnEditTask(assigned, "et_selected_contacts");
}

function loadAssignedOnEditTask(assigneds, containerID) {
	let selectetContactsContainer = document.getElementById(containerID);
	selectetContactsContainer.innerHTML = "";
	for (let i = 0; i < assigneds.length; i++) {
		let badgeColor = getUserColor(assigneds, i);
		let assignedName = assigneds[i];
		let userBadge = generateUserBadge(assignedName);
		selectetContactsContainer.innerHTML +=
			generateAssigmentBadgeEditTaskHTML(userBadge, badgeColor, i);
	}
}

function filterUserOnAssignedTo(inputID, searchContainerID, id) {
	let searchTerm = document.getElementById(inputID).value;
	let assigneds = addedTasks[id]["assigned"];
	searchTerm = searchTerm.toLowerCase();
	let contactsContainer = document.getElementById(searchContainerID);
	contactsContainer.innerHTML = "";
	if (searchTerm == "") {
		loadAllUsersForContactOnAssignedTo(assigneds, searchContainerID, id);
	} else {
		getContect(assigneds, searchTerm, id, contactsContainer);
	}
}

function getContect(assigneds, searchTerm, id, contactsContainer) {
	for (let i = 0; i < users.length; i++) {
		let userName = users[i]["name"];
		if (userName.toLowerCase().includes(searchTerm)) {
			let userBadge = generateUserBadge(userName);
			let badgeColor = users[i]["bgcolor"];
			if (assigneds.includes(userName)) {
				contactsContainer.innerHTML +=
					generateEditTaskAssigmentContactsCheckedHTML(
						badgeColor,
						userBadge,
						userName,
						i,
						id
					);
			} else {
				contactsContainer.innerHTML +=
					generateEditTaskAssigmentContactsHTML(
						badgeColor,
						userBadge,
						userName,
						i,
						id
					);
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
	document.getElementById("subtask_input").value = "";
}

function loadSubtask(taskID) {
	let tasks = addedTasks.filter((t) => t["id"] === taskID);
	for (let index = 0; index < tasks.length; index++) {
		let task = tasks[index];
		let subtask = task["subtask"];
		return subtask;
	}
}

function loadSubtasksEditTask(subtaskListID, ID) {
	let subtaskContainer = document.getElementById(subtaskListID);
	subtaskContainer.innerHTML = "";
	let subtask = loadSubtask(ID);
	for (let i = 0; i < subtask.length; i++) {
		let subtitle = subtask[i]["subtitle"];
		subtaskContainer.innerHTML += generateSubtaskListItemHTML(
			subtitle,
			i,
			ID,
			"subtask_listitem_",
			"subtask_edit_container",
			"subtask_edit_input",
			"subtask_lists"
		);
	}
}

function addSubtask(taskID, subtaskListItemID) {
	let subtask = loadSubtask(taskID);
	if (subtask_input.value == "") {
	} else {
		subtask.push({
			subdone: false,
			subtitle: subtask_input.value,
		});
		cancelAddSubtask("add_subtask", "check_subtask_icons");
		loadSubtasksEditTask(subtaskListItemID, taskID);
	}
}

function deleteSubtask(taskID, subTaskID, subtaskListItemID) {
	let subTask = loadSubtask(taskID);
	subTask.splice(subTaskID, 1);
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

function updateSubtask(
	taskID,
	subtaskListItemID,
	subtaskEditInputID,
	subtaskID,
	subtaskEditFrameID,
	subtaskList
) {
	let subtask = loadSubtask(taskID);
	let subtaskEditInput = document.getElementById(subtaskEditInputID).value;
	subtask[subtaskID]["subtitle"] = subtaskEditInput;
	subtask[subtaskID]["subdone"] = false;
	closeSubtaskEditInputFrame(subtaskListItemID, subtaskEditFrameID);
	loadSubtasksEditTask(subtaskList, taskID);
}
