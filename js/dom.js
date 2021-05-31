const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";

const addTodo = () => {
    const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;
    const todo = makeTodo(textTodo, timestamp);

    uncompletedTODOList.append(todo);
}

const makeTodo = (data, timestamp, isCompleted) => {
    const textTitle = document.createElement("h2");
    textTitle.innerText = data;

    const textTimeStamp = document.createElement("p");
    textTimeStamp.innerText = timestamp;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle, textTimeStamp);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton())
    } else {
        container.append(createCheckButton());
    }

    return container;
}

const createButton = (buttonTypeClass, eventListener) => {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", (event) => {
        eventListener(event);
    });
    
    return button;
}

const addTaskToCompleted = (taskElement) => {
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskTimestamp, true);
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    listCompleted.append(newTodo);
    taskElement.remove();
}

const createCheckButton = () => {
    return createButton("check-button", (event) => {
        addTaskToCompleted(event.target.parentElement);
    });
}

const removeTaskFromCompleted = (taskElement) => {
    taskElement.remove();
}

const createTrashButton = () => {
    return createButton("trash-button", (event) => {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

const undoTaskFromCompleted = (taskElement) => {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskTimestamp, false);

    listUncompleted.append(newTodo);
    taskElement.remove();
}

const createUndoButton = () => {
    return createButton("undo-button", (event) => {
        undoTaskFromCompleted(event.target.parentElement);
    });
}