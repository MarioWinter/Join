let currentDraggedElement;

function updateBoard() {
    let open = todos.filter((t) => t["category"] == "open");

    document.getElementById("open").innerHTML = "";

    for (let index = 0; index < open.length; index++) {
        const element = open[index];
        document.getElementById("open").innerHTML += generateTaskHTML(element);
    }

    let closed = todos.filter((t) => t["category"] == "closed");

    document.getElementById("closed").innerHTML = "";

    for (let index = 0; index < closed.length; index++) {
        const element = closed[index];
        document.getElementById("closed").innerHTML +=
            generateTaskHTML(element);
    }

    let archiv = todos.filter((t) => t["category"] == "archiv");

    document.getElementById("archiv").innerHTML = "";

    for (let index = 0; index < archiv.length; index++) {
        const element = archiv[index];
        document.getElementById("archiv").innerHTML +=
            generateTaskHTML(element);
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTaskHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element["id"]})" class="todo">${element["title"]}</div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    todos[currentDraggedElement]["category"] = category;
    updateBoard();
}

function highlight(id) {
    document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove("drag-area-highlight");
}
