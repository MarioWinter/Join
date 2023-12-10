let isClicked = false;
let fillColor = "";
let isActive = false;
let globalPrio = "";

function changePrioBtnColor(prio) {
    setGlobalPrio(prio);
    if (isActive && prio == globalPrio) {
        clearPrioButtonColor();
        isActive = false;
        isClicked = false;
        globalPrio = "";
    } else {
        clearPrioButtonColor();
        let proSVG1 = prio + "-svg1";
        let proSVG2 = prio + "-svg2";
        let path1 = document.getElementById(proSVG1);
        fillColor = path1.getAttribute("fill");
        let path2 = document.getElementById(proSVG2);
        let button = document.getElementById(prio);
        changeSVGPathColor(path1);
        changeSVGPathColor(path2);
        changeColorClasses(button, prio);
        isClickedCheck();
    }
    globalPrio = prio;
}

function setGlobalPrio(prio) {
    if (globalPrio == "") {
        globalPrio = prio;
    }
}

function changeSVGPathColor(path) {
    if (fillColor == "white") {
        path.setAttribute("fill", fillColor);
        isActive = true;
    } else {
        path.setAttribute("fill", "white");
        isActive = false;
    }
}

function changeColorClasses(button, prio) {
    if (isClicked || fillColor !== "white") {
        button.classList.add(prio);
        isActive = true;
    } else {
        button.classList.remove(prio);
        isActive = false;
    }
}

function clearPrioButtonColor() {
    resetBgColorAddTask();
    resetSVGColorAddTask();
    resetBgColorEdit();
    resetSVGColorEdit();
}

function resetBgColorAddTask() {
    document.getElementById("urgent-btn").classList.remove("urgent-btn");
    document.getElementById("medium-btn").classList.remove("medium-btn");
    document.getElementById("low-btn").classList.remove("low-btn");
}

function resetSVGColorAddTask() {
    document.getElementById("low-btn-svg1").setAttribute("fill", "#7AE229");
    document.getElementById("low-btn-svg2").setAttribute("fill", "#7AE229");
    document.getElementById("medium-btn-svg1").setAttribute("fill", "#FFA800");
    document.getElementById("medium-btn-svg2").setAttribute("fill", "#FFA800");
    document.getElementById("urgent-btn-svg1").setAttribute("fill", "#FF3D00");
    document.getElementById("urgent-btn-svg2").setAttribute("fill", "#FF3D00");
}

function resetBgColorEdit() {
    document.getElementById("urgent-btn-edit").classList.remove("urgent-btn-edit");
    document.getElementById("medium-btn-edit").classList.remove("medium-btn-edit");
    document.getElementById("low-btn-edit").classList.remove("low-btn-edit");
}

function resetSVGColorEdit() {
    document.getElementById("low-btn-edit-svg1").setAttribute("fill", "#7AE229");
    document.getElementById("low-btn-edit-svg2").setAttribute("fill", "#7AE229");
    document.getElementById("medium-btn-edit-svg1").setAttribute("fill", "#FFA800");
    document.getElementById("medium-btn-edit-svg2").setAttribute("fill", "#FFA800");
    document.getElementById("urgent-btn-edit-svg1").setAttribute("fill", "#FF3D00");
    document.getElementById("urgent-btn-edit-svg2").setAttribute("fill", "#FF3D00");
}



function isClickedCheck() {
    if (isClicked) {
        isClicked = false;
    } else {
        isClicked = true;
    }
}


function setTodayDateForCalendar() {
let today = new Date().toISOString().split('T')[0];
document.getElementById('calendar_add_task_slider').setAttribute('min', today);
document.getElementById('calendar_edit_task').setAttribute('min', today);

}
