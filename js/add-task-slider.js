let isClicked = false;

function changePrioBtnColor(prio, color) {
    let proSVG1 = prio + "-svg1";
    let proSVG2 = prio + "-svg2";
    let path1 = document.getElementById(proSVG1);
    let path2 = document.getElementById(proSVG2);
    let button = document.getElementById(prio);
    changeSVGPathColor(path1, color);
    changeSVGPathColor(path2, color);
    changeColorClasses(button, prio);
}

function changeSVGPathColor(path, color) {
    let fillColor = path.getAttribute("fill");

    if (fillColor !== "white") {
        path.setAttribute("fill", "white");
    } else {
        path.setAttribute("fill", "#" + color);
    }
}

function changeColorClasses(button, prio) {
    if (isClicked) {
        button.classList.remove(prio);
        isClicked = false;
    } else {
        button.classList.add(prio);
        isClicked = true;
    }
}
