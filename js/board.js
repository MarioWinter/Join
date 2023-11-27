
function initBoard() {
    loadBoardHeader();
    loadBoard();
}


function loadBoard() {
    for (let i = 0; i < buckets.length; i++) {
        let bucket = buckets[i];
        updateBoard(bucket);
        loadNoTasksLabel(bucket);
    }
}

function loadNoTasksLabel(bucket) {
    let taskColumn = document.getElementById(bucket);

    if (taskColumn.innerHTML === '') {
        taskColumn.innerHTML = generateNoTaskHTML(bucket);
    }
}

