let currentDraggedElement;

document.addEventListener("DOMContentLoaded", function () {
	document
		.getElementById("find_task")
		.addEventListener("keyup", function (event) {
			if (event.key === "Enter") {
				searchTask();
			}
		});

	// let dropZoneIds = buckets;

	// dropZoneIds.forEach(function (dropZoneId) {
	// 	let dropZone = document.getElementById(dropZoneId);
	// 	let longPressTimeout;

	// 	if (dropZone) {
	// 		dropZone.addEventListener("touchstart", function (event) {
	// 			let targetCard = event.target.closest(".task-card");

	// 			if (targetCard) {
	// 				longPressTimeout = setTimeout(function () {
	// 					let cardIdString = targetCard.id.replace("task", "");
	// 					// Rufe die startDragging-Funktion auf
	// 					let cardId = parseInt(cardIdString, 10);
	// 					startDragging(cardId);
	// 					// moveTo(dropZoneId);
	// 					// removeHighlight(dropZoneId);
	// 					console.log("Long Press erkannt!");
	// 				}, 500); // Hier ist die Zeitverzögerung für den Long Press in Millisekunden (500ms in diesem Beispiel)
	// 			}
	// 		});

	// 		dropZone.addEventListener("touchend", function () {
	// 			clearTimeout(longPressTimeout);
	// 		});
	// 	}
	// });
});

/**
 * Saves the current task ID
 * @param {int} id - ID from the drag elements
 */
function startDragging(id) {
	currentDraggedElement = id;
}

function allowDrop(ev) {
	ev.preventDefault();
}

/**
 * The position of the column is changed in the array and the board is reloaded
 * @param {String} bucket - HTML Id from the drop zone
 */
async function moveTo(bucket) {
	addedTasks[currentDraggedElement]["bucket"] = bucket;
	loadBoard();
	await setItem("addedTasks", JSON.stringify(addedTasks));
}

/**
 * The target dropzone is highlighted when draging
 * @param {int} id - ID from the drag elements
 */
function highlight(id) {
	document.getElementById(id).classList.add("drag-area-highlight");
}

/**
 * The target dropzone remove highlighted when element ist drop
 * @param {int} id - ID from the drag elements
 */
function removeHighlight(id) {
	document.getElementById(id).classList.remove("drag-area-highlight");
}
