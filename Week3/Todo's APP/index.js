const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  const taskItem = document.createElement("li");
  taskItem.className =
    "flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-lg";
  const taskSpan = document.createElement("span");
  taskSpan.className = "task-text";
  taskSpan.textContent = taskText;
  taskItem.appendChild(taskSpan);
  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.className =
    "bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600";
  completeButton.addEventListener("click", () => {
    taskSpan.classList.toggle("completed");
  });
  taskItem.appendChild(completeButton);
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className =
    "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2";
  removeButton.addEventListener("click", () => {
    taskList.removeChild(taskItem);
  });
  taskItem.appendChild(removeButton);

  taskList.appendChild(taskItem);
  taskInput.value = "";
});
