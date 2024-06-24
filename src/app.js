const inputTask = document.getElementById("input-task");
const taskList = document.getElementById("task-list");

function addTask() {
  if (inputTask.value === "") {
    alert("Debes escribir una tarea");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputTask.value;
    taskList.appendChild(li);
  }
  inputTask.value = "";
}

inputTask.addEventListener("input", function () {
  filterInput = inputTask.value.toLowerCase();
  let itemsLi = taskList.getElementsByTagName("li");
  Array.from(itemsLi).forEach((item) => {
    if (item.textContent.toLowerCase().includes(filterInput)) {
      item.style.display = "list-item";
    } else {
      item.style.display = "none";
    }
  });
});


