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
    resetBgColor();
    resetSVGColor();
}

function resetBgColor() {
    document.getElementById("urgent-btn").classList.remove("urgent-btn");
    document.getElementById("medium-btn").classList.remove("medium-btn");
    document.getElementById("low-btn").classList.remove("low-btn");
}

function resetSVGColor() {
    document.getElementById("low-btn-svg1").setAttribute("fill", "#7AE229");
    document.getElementById("low-btn-svg2").setAttribute("fill", "#7AE229");
    document.getElementById("medium-btn-svg1").setAttribute("fill", "#FFA800");
    document.getElementById("medium-btn-svg2").setAttribute("fill", "#FFA800");
    document.getElementById("urgent-btn-svg1").setAttribute("fill", "#FF3D00");
    document.getElementById("urgent-btn-svg2").setAttribute("fill", "#FF3D00");
}

function isClickedCheck() {
    if (isClicked) {
        isClicked = false;
    } else {
        isClicked = true;
    }
}
