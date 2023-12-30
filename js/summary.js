function renderSummaryData(){
    showTodo();
    showDone();
    showAllTask();
    showTaskInProgress();
    showAwaitingFeedback()
}

function showTodo() {
    let todo = document.getElementById('sm_todo');
    let toDoCount = addedTasks.filter(task => task.bucket === 'to-do')
    todo.innerHTML = toDoCount.length;
}

function showDone(){
    let done = document.getElementById('sm_done');
    let doneCount = addedTasks.filter(task => task.bucket === 'done');
    done.innerHTML = doneCount.length;
}

function showAllTask(){
    let allTasks = document.getElementById('sm_all_task');
    allTasks.innerHTML = addedTasks.length;
}

function showTaskInProgress(){
    let task = document.getElementById('progress_task');
    let progressTask = addedTasks.filter(task => task.bucket === 'in-progress');
    task.innerHTML = progressTask.length;
}

function showAwaitingFeedback(){
    let awaiting = document.getElementById('sm_awaiting_fb');
    let task = addedTasks.filter(task => task.bucket === 'await-feedback');
    awaiting.innerHTML = task.length;
}

function showUrgentTask(){
    let urgent = document.getElementById('sm_urgent');
    let task = addedTasks.filter(task => task.prio === 'Urgent');
    console.log(task)
}