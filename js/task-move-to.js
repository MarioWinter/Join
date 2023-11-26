let currentDraggedElement;

function updateBoard(bucket) {
    let tasks = addedTasks.filter((t) => t["bucket"] == bucket);
    document.getElementById(bucket).innerHTML = "";
    for (let index = 0; index < tasks.length; index++) {
        let task = tasks[index];
        let id = task['id'];
        let bucket = task['bucket'];
        let title = task['title'];
        let description = task['description'];
        let duedate = task['duedate'];
        let prio = task['prio'];
        let category = task['category'];
        // let assigneds = loadAssigned(task['assigned']);
        // let subtasks = loadSubtask(task['subtask']);
        document.getElementById(bucket).innerHTML +=
        generateTaskHTML(id, bucket, title, description, duedate, prio, category);
    } 
}



// function updateBoard() {
//     updateTodo();
//     updateInProgress();
//     updateAwaitFeedback();
//     updateDone();
// }



// function updateTodo() {
//     let todo = addedTasks.filter((t) => t["bucket"] == "todo");

//     document.getElementById("todo").innerHTML = "";

//     for (let index = 0; index < todo.length; index++) {
//         const element = todo[index];
//         document.getElementById("todo").innerHTML += generateTaskHTML(element);
//     } 
// }

// function updateInProgress() {
//     let inProgress = addedTasks.filter((t) => t["bucket"] == "in-progress");

//     document.getElementById("in-progress").innerHTML = "";

//     for (let index = 0; index < inProgress.length; index++) {
//         const element = inProgress[index];
//         document.getElementById("in-progress").innerHTML += generateTaskHTML(element);
//     }
// }

// function updateAwaitFeedback() {
//     let awaitFeedback = addedTasks.filter((t) => t["bucket"] == "await-feedback");

//     document.getElementById("await-feedback").innerHTML = "";

//     for (let index = 0; index < awaitFeedback.length; index++) {
//         const element = awaitFeedback[index];
//         document.getElementById("await-feedback").innerHTML += generateTaskHTML(element);
//     }
// }

// function updateDone() {
//     let done = addedTasks.filter((t) => t["bucket"] == "done");

//     document.getElementById("done").innerHTML = "";

//     for (let index = 0; index < done.length; index++) {
//         const element = done[index];
//         document.getElementById("done").innerHTML += generateTaskHTML(element);
//     }
// }


function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(bucket) {
    addedTasks[currentDraggedElement]["bucket"] = bucket;
    updateBoard(bucket);
    loadBoard();
}

function highlight(id) {
    document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove("drag-area-highlight");
}


