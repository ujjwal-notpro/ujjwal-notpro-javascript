let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if(task.completed){
            span.classList.add("completed");
        }

        span.onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.classList.add("delete-btn");
        const completeBtn = document.createElement("button");
completeBtn.textContent = "Complete";

completeBtn.onclick = () => {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
};

li.appendChild(completeBtn);

        delBtn.onclick = () => {
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");

    if(input.value.trim() === ""){
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

renderTasks();