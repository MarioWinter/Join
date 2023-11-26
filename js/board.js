let buckets = ['todo', 'in-progress','await-feedback', 'done']

function initBoard() {
    loadBoard();
}

function loadBoard() {
    for (let i = 0; i < buckets.length; i++) {
        let bucket = buckets[i];
        updateBoard(bucket);
    }
}