
function initBoard() {
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
        let formatBucket = formatNoTaskLabelString(bucket);
        taskColumn.innerHTML = generateNoTaskHTML(formatBucket);
    }
}


// function formatNoTaskLabelString(str) {

//   // Capitalize the first letter of each part
//   let formattedParts = parts.map(
//     part => part.charAt(0).toUpperCase() + part.slice(1)
//   );
//    // Split the string at the hyphen
//    let parts = str.split('-');

//   // Join the parts with spaces and return the result
//   return formattedParts.join(' ');
// }



function formatNoTaskLabelString(str) {
      str = str.charAt(0).toUpperCase() + str.slice(1)
     let formattedStr = str.replace('-', ' ');
    return formattedStr;
  }