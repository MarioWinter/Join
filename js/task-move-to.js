let currentDraggedElement;
let currentBucketId;
let touchStartX;
let touchStartY;
// Ein Schwellenwert für die force Eigenschaft
let FORCE_THRESHOLD = 0.2;

// Eine Verzögerung für den Timer in Millisekunden
let TIMER_DELAY = 2000;

// Eine Variable, um den Timer zu speichern
let timer = null;

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
	// Wenn die force Eigenschaft nicht verfügbar ist, starten Sie einen Timer
	timer = setTimeout(function () {
		// Starten Sie das Drag and Drop nach der Verzögerung
		const touch = event.touches[0];
		touchStartY = touch.clientY;
		startDragging(id);
	}, TIMER_DELAY);
	//touchStartX = touch.clientX;
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

	currentBucketId = getParentId(draggedElement);
	// draggedElement.style.transform = `translate(${offsetX}px)`;

	event.preventDefault();
}

function handleTouchEnd(event) {
	if (!currentDraggedElement) return;

	const draggedElement = document.getElementById(
		`task${currentDraggedElement}`
	);
	draggedElement.style.transform = ""; // Zurücksetzen der transform-Eigenschaft

	// Überprüfen, ob das touchend-Ereignis über einer Drop-Zone liegt
	const dropZoneId = getDropZoneFromEvent(event);

	if (dropZoneId) {
		// Hier kannst du die ID verwenden, um deine individuelle Logik durchzuführen
		console.log(
			`Element mit der ID ${currentDraggedElement} wurde verschoben zur Drop-Zone ${dropZoneId}.`
		);
		// Aktualisiere die aktuelle Bucket-ID
		currentBucketId = dropZoneId;
		moveTo(currentBucketId);
	}

	// touchStartX = null;
	touchStartY = null;
	currentDraggedElement = null;

	event.preventDefault();
}

function getDropZoneFromEvent(event) {
	const dropZones = document.querySelectorAll(".column-drop-zone");

	for (const dropZone of dropZones) {
		const rect = dropZone.getBoundingClientRect();
		const touchX = event.changedTouches[0].clientX;
		const touchY = event.changedTouches[0].clientY;

		if (
			touchX >= rect.left &&
			touchX <= rect.right &&
			touchY >= rect.top &&
			touchY <= rect.bottom
		) {
			return dropZone.id;
		}
	}

	// Falls keine Drop-Zone gefunden wurde, gib die aktuelle Bucket-ID zurück
	return currentBucketId;
}

function getParentId(element) {
	const parentElement = element.parentNode;

	if (parentElement) {
		return parentElement.id || null; // Gibt die ID des übergeordneten Elements zurück oder null, wenn es keine ID gibt.
	} else {
		return null; // Wenn es kein übergeordnetes Element gibt.
	}
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
