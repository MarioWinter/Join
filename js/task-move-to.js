let currentDraggedElement;
let touchStartX;
let touchStartY;

document.addEventListener("DOMContentLoaded", function () {
	document
		.getElementById("find_task")
		.addEventListener("keyup", function (event) {
			if (event.key === "Enter") {
				searchTask();
			}
		});
});

/**
 * Saves the current task ID
 * @param {int} id - ID from the drag elements
 */
function startDragging(id) {
	currentDraggedElement = id;
}

function handleTouchStart(event, id) {
	const touch = event.touches[0];
	//touchStartX = touch.clientX;
	touchStartY = touch.clientY;
	currentDraggedElement = id;
}

function handleTouchMove(event) {
	// if (!touchStartX || !touchStartY || !currentDraggedElement) return;
	if (!touchStartY || !currentDraggedElement) return;
	const touch = event.touches[0];
	const offsetX = 0;
	const offsetY = touch.clientY - touchStartY;

	const draggedElement = document.getElementById(
		`task${currentDraggedElement}`
	);
	draggedElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
	// draggedElement.style.transform = `translate(${offsetX}px)`;

	event.preventDefault();
}

function handleTouchEnd(event, destinationBucket) {
	debugger;
	if (!currentDraggedElement) return;

	const draggedElement = document.getElementById(
		`task${currentDraggedElement}`
	);
	draggedElement.style.transform = ""; // Zurücksetzen der transform-Eigenschaft

	// Hier kannst du die ID verwenden, um deine individuelle Logik durchzuführen
	console.log(
		`Element mit der ID ${currentDraggedElement} wurde verschoben.`
	);

	moveTo(destinationBucket);

	// touchStartX = null;
	touchStartY = null;
	currentDraggedElement = null;

	event.preventDefault();
}

function allowDrop(ev) {
	ev.preventDefault();
}

/**
 * The position of the column is changed in the array and the board is reloaded
 * @param {String} bucket - HTML Id from the drop zone
 */
async function moveTo(bucket) {
	debugger;
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
