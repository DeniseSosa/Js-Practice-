const inputTask = document.getElementById("input-task");
const taskList = document.getElementById("draggableUl"); // ul
const dropZone = document.getElementById("dropzone");
let originalIndexLi = {}
let listaStorage= []
const textareaTask= document.getElementById("textareaTask")

const openModal= document.querySelector("#open-modal")
const closeModal= document.querySelector("#close-modal")
const modal = document.querySelector("#modal-container")

function addTask() {
  console.log(textareaTask.value);
  if (textareaTask.value === "") {
    alert("Debes escribir una tarea");
  } else {
    let li = document.createElement("li");
    li.innerHTML = textareaTask.value;
    taskList.appendChild(li);
    li.classList.add("list"); ///Le agrego class="list" a <li>
    

    let uniqueId= Date.now()- (Math.floor(Math.random()*38476)+1000)
    li.setAttribute("id", uniqueId);

    originalIndexLi[uniqueId] = taskList

    let buttonCheck = document.createElement("button");
    buttonCheck.classList.add("button-checked"); ///Le agrego class="span-button" a <button>
    li.appendChild(buttonCheck);

    buttonCheck.addEventListener("click", function () {
        // Obtener el elemento 'li' correspondiente usando el parentNode
  const li = this.parentNode;

  li.classList.toggle("toggle");
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
          buttonRevert.addEventListener('click', function() {
            const originalParent = originalIndexLi[li.id]
            if(originalParent) originalParent.appendChild(li)
          })
          

      li.setAttribute("draggable", "true");

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
      })
      modal.classList.remove("mostrarModal")  
  }

  textareaTask.value = "";
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
      item.style.display 
    } else {
      item.style.display = "none";
    }
  });
  localStorage.setItem(Array.from(itemsLi));
}


  openModal.addEventListener("click", function(event){
   event.preventDefault()
   modal.classList.add("mostrarModal")
  })

  closeModal.addEventListener("click", function(event){
    event.preventDefault()
    modal.classList.remove("mostrarModal")
   })

const form = document.querySelector(".formModal")

form.addEventListener("click", function(event){
  event.preventDefault()
})


