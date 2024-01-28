function frameSlideIn(id) {
	document.getElementById(id).classList.remove("slide-out");
	document.getElementById(id).classList.add("slide-in");
}

function frameSlideOut(id) {
	document.getElementById(id).classList.remove("slide-in");
	document.getElementById(id).classList.add("slide-out");
}

function addOverlayBg(id) {
	document.getElementById(id).classList.add("slider-bg");
	document.getElementById(id).classList.remove("slider-center");
}

function removeOverlayBg(id) {
	document.getElementById(id).classList.remove("slider-bg");
	document.getElementById(id).classList.add("slider-center");
}

function addFixedBackround(id) {
	document.getElementById(id).classList.add("pos-fixed");
}

function removeFixedBackround(id) {
	document.getElementById(id).classList.remove("pos-fixed");
}

async function hideTaskOpen(id) {
	loadBoard();
	frameSlideOut(id);
	removeFixedBackround("main_container_board");
	removeOverlayBg("task_overlay_bg");

	setTimeout(function () {
		hide("task_overlay_bg");
	}, 400);
	await setItem("addedTasks", JSON.stringify(addedTasks));
}
