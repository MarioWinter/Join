function frameSlideIn(id) {
    document.getElementById(id).classList.remove('slide-out');
    document.getElementById(id).classList.add('slide-in');
}

function frameSlideOut(id) {
    document.getElementById(id).classList.remove('slide-in');
    document.getElementById(id).classList.add('slide-out');
    }

function addOverlayBg(id) {
    document.getElementById(id).classList.add('slider-bg');
    document.getElementById(id).classList.remove('slider-center');
}

function removeOverlayBg(id) {
    document.getElementById(id).classList.remove('slider-bg');
    document.getElementById(id).classList.add('slider-center');
}

function hideTaskOpen(id) {
    frameSlideOut(id);
    removeOverlayBg('task_overlay_bg');
    setTimeout(function(){hide('task_overlay_bg');}, 400);
    loadBoard();
}