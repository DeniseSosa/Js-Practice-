const inputTask = document.getElementById("input-task");
const taskList = document.getElementById("draggableUl"); // ul

function addTask() {
  if (inputTask.value === "") {
    alert("Debes escribir una tarea");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputTask.value;
    taskList.appendChild(li);
    li.classList.add("list"); ///Le agrego class="list" a <li>

    let span = document.createElement("span");
    li.appendChild(span);
    span.classList.add("li-span"); ///Le agrego class="li-span" a <span>

    let buttonCheck = document.createElement("button");
    buttonCheck.classList.add("button-checked"); ///Le agrego class="span-button" a <button>
    li.appendChild(buttonCheck);

    buttonCheck.addEventListener("click", function () {
      const text = taskList.textContent.trim();
      let findedTask = taskList.querySelectorAll(".list");
      console.log(findedTask);
      findedTask = Array.from(findedTask).find(
        (task) => task.textContent.trim() === text
      );
      findedTask && findedTask.classList.toggle("toggle");
    });

    let buttonTrash = document.createElement("button");
    buttonTrash.classList.add("button-trash"); ///Le agrego class="span-button" a <button>
    li.appendChild(buttonTrash);

    buttonTrash.addEventListener("click", function () {
      taskList.removeChild(li);
    });

    let buttonRevert = document.createElement("button");
          buttonRevert.classList.add("button-reload"); ///Le agrego class="button-reload" a <button>
          li.appendChild(buttonRevert);

    const draggable = taskList.querySelectorAll("li")
    const dropZone = document.getElementById("dropzone")

    let originalIndexLi = {}

    draggable.forEach((li,index)=>{
      let uniqueId= Date.now()- (Math.floor(Math.random()*38476)+1000)
      console.log(uniqueId);
      li.setAttribute("draggable", "true");
      li.setAttribute("id", uniqueId);

      originalIndexLi[uniqueId] = li.parentElement; // guardo el uniqueId en 


      li.addEventListener("dragstart",function(event){
        event.dataTransfer.clearData();
        console.log(event);
        event.dataTransfer.setData("text/plain", event.target.id); 
      })
    
      dropZone.addEventListener("dragover",function(event){
        event.preventDefault()
      })
      dropZone.addEventListener("drop", function(event){
        const getId= event.dataTransfer.getData("text/plain")
        console.log(getId);
        sourceData= document.getElementById(getId)
        if(sourceData) dropZone.appendChild(sourceData)

         buttonRevert.addEventListener('click', function() {
            for (const id in originalIndexLi) {
                const elemento = document.getElementById(id);
                const posicionOriginal = originalIndexLi[id];
                if (elemento && posicionOriginal) {
                    posicionOriginal.appendChild(elemento);
                }
                buttonRevert.style.display="none"
            }
        });

      })
  
    })


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

function searchTask() {
  filterInput = inputTask.value.toLowerCase();
  let itemsLi = taskList.getElementsByTagName("li");
  Array.from(itemsLi).forEach((item) => {
    if (item.textContent.toLowerCase().includes(filterInput)) {
      item.style.display = "list-item";
    } else {
      item.style.display = "none";
    }
  });
  localStorage.setItem(Array.from(itemsLi));
}

// // Selecciona todos los botones con la clase "span-button"
// const buttons = document.querySelectorAll(".span-button");

// // Itera sobre cada botón y agrega un evento click
// buttons.forEach(button => {
//   button.addEventListener(onclick, function() {
//     // Encuentra el 'li' más cercano al botón clicado
//     let li = button.closest("li");

//     // Si se encontró el 'li', se elimina de su padre
//     if (li) {
//       li.parentNode.removeChild(li);
//     }
//   });
// });
