let isClicked = false;
let fillColor = "";
let isActive = false;
let globalPrioButtonID = "";

function changePrioBtnColor(prioButtonID, isClicked, taskID, prio) {
    if(!isClicked) {
        setButtonColor(prioButtonID);
        setNewTaskPriority(taskID, prio);
        globalPrioButtonID = prioButtonID;
    } else {
        setGlobalPrioButtonID(prioButtonID);
        if (isActive && prioButtonID == globalPrioButtonID) {
        resetButtonColor();
        setNewTaskPriority(taskID, '');
        } else {
        setButtonColor(prioButtonID);
        setNewTaskPriority(taskID, prio);
        globalPrioButtonID = prioButtonID;
        }
    }
}

function resetButtonColor() {
    clearPrioButtonColor();
    isActive = false;
    isClicked = false;
    globalPrioButtonID = "";
}

function setButtonColor(prioButtonID) {
    clearPrioButtonColor();
        let proSVG1 = prioButtonID + "-svg1";
        let proSVG2 = prioButtonID + "-svg2";
        let path1 = document.getElementById(proSVG1);
        fillColor = path1.getAttribute("fill");
        let path2 = document.getElementById(proSVG2);
        let button = document.getElementById(prioButtonID);
        changeSVGPathColor(path1);
        changeSVGPathColor(path2);
        changeColorClasses(button, prioButtonID);
}

function setGlobalPrioButtonID(prioButtonID) {
    if (globalPrioButtonID == "") {
        globalPrioButtonID = prioButtonID;
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

function changeColorClasses(button, prioButtonID) {
    if (isClicked || fillColor !== "white") {
        button.style.color = "#ffffff"
        if(prioButtonID.includes('low')) {
            button.style.backgroundColor = "#7AE229";
        } else if(prioButtonID.includes('medium')) {
            button.style.backgroundColor = "#FFA800";
        } else if (prioButtonID.includes('urgent')) {
            button.style.backgroundColor = "#FF3D00";
        }
        isActive = true;
    } else {
        button.style.backgroundColor = "#fffff";
        button.style.color = "#000000"
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
    document.getElementById("urgent-btn").style.backgroundColor = "#ffffff";
    document.getElementById("urgent-btn").style.color = "#000000";
    document.getElementById("medium-btn").style.backgroundColor = "#ffffff";
    document.getElementById("medium-btn").style.color = "#000000";
    document.getElementById("low-btn").style.backgroundColor = "#ffffff";
    document.getElementById("low-btn").style.color = "#000000";

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
    document.getElementById("urgent-btn-edit").style.backgroundColor = "#ffffff";
    document.getElementById("urgent-btn-edit").style.color = "#000000";
    document.getElementById("medium-btn-edit").style.backgroundColor = "#ffffff";
    document.getElementById("medium-btn-edit").style.color = "#000000";
    document.getElementById("low-btn-edit").style.backgroundColor = "#ffffff";
    document.getElementById("low-btn-edit").style.color = "#000000";
}

function resetSVGColorEdit() {
    document.getElementById("low-btn-edit-svg1").setAttribute("fill", "#7AE229");
    document.getElementById("low-btn-edit-svg2").setAttribute("fill", "#7AE229");
    document.getElementById("medium-btn-edit-svg1").setAttribute("fill", "#FFA800");
    document.getElementById("medium-btn-edit-svg2").setAttribute("fill", "#FFA800");
    document.getElementById("urgent-btn-edit-svg1").setAttribute("fill", "#FF3D00");
    document.getElementById("urgent-btn-edit-svg2").setAttribute("fill", "#FF3D00");
}

function setTodayDateForCalendar(id) {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById(id).setAttribute('min', today);
    
    
}

function setNewTaskPriority(taskID, prio) {
    addedTasks[taskID]['prio'] = prio;
}
