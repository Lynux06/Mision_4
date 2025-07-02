    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById("prioritySelect");
    const todoList = document.getElementById("todoList");
    const doneList = document.getElementById("doneList");
    const currentTime = document.getElementById("current-time");

    document.getElementById("addTaskBtn").addEventListener("click", addTask);
    document.getElementById("deleteAllBtn").addEventListener("click", () => {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    });

    function updateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentTime.textContent = "Hari & Tanggal: " + now.toLocaleDateString('id-ID', options);
    }

    function addTask() {
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (!taskText) return;

    const li = document.createElement("li");
    const date = new Date();
    const timestamp = date.toLocaleString('id-ID');

    li.innerHTML = `
        <input type="checkbox" />
        <span><strong>[${priority}]</strong> ${taskText} <small>(${timestamp})</small></span>
    `;

    li.dataset.time = date.toISOString();
    li.classList.add(priority.toLowerCase());

    const checkbox = li.querySelector("input");
    checkbox.addEventListener("click", () => markAsDone(li));

    todoList.appendChild(li);
    taskInput.value = "";
    checkOverdue(li);
    }

    function markAsDone(taskItem) {
    taskItem.classList.add("done");
    doneList.appendChild(taskItem);
    taskItem.querySelector("input").disabled = true;
    }

    function checkOverdue(taskItem) {
    const taskTime = new Date(taskItem.dataset.time);
    const now = new Date();
    const diffHours = (now - taskTime) / (1000 * 60 * 60);

    if (diffHours > 24) {
        taskItem.classList.add("overdue");
    }
    }

    // Initial
    updateTime();
    setInterval(updateTime, 60000); // Update time every minute
