// html elements
const taskInput = document.getElementById("task-name")
const descriptionInput = document.getElementById("description")
const dateInput = document.getElementById("task-date")
const addBtn = document.getElementById("addBtn")
const editBtn = document.getElementById("editBtn")
const restoreBtn = document.getElementById("restoreBtn")
const tasksContainer = document.getElementById("tasks-container")
const completeContainer = document.getElementById("completeContainer")
var opendesc = document.querySelectorAll(".open-description")
const message = document.getElementById("message")

toast = document.querySelector(".toast"),
closeIcon = document.querySelector(".close"),
progresss = document.querySelector(".progresss");

let timer1, timer2;


// app variables
var updatedIndex;
var taskList = JSON.parse(localStorage.getItem("tasks")) || []
var completeList = JSON.parse(localStorage.getItem("complete")) || []
displayAllTasks()
displayAllCompletedTasks();


// functions
function addTask(){
    if(!validInput()){
        var task = {
        name: taskInput.value,
        description: descriptionInput.value,
        date: dateInput.value
    };
    taskList.push(task);
    localStorage.setItem("tasks" , JSON.stringify(taskList));
    displayTask(taskList.length-1)
    clearForm()   
    }

}

function displayTask(index){
    var taskHtml = `
        <div class="all-task">
        <div class="task p-2 px-3  rounded-2 w-100 d-flex align-items-center justify-content-center shadow position-relative bg-white z-3">
            <div class="form-check w-100 position-relative pb-3">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" onclick="completedTask(${index})" >
                <label class="form-check-label ms-2 fw-semibold" for="defaultCheck1">
                 ${taskList[index].name}
                </label>
                <span class="time position-absolute"><i class="fa-solid fa-calendar-day pe-2"></i>${taskList[index].date}</span>
              </div>
              <div class="icons d-flex align-items-center justify-content-center gap-2 fs-5">
                <div class="icon bg-warning p-1 d-flex align-items-center justify-content-center rounded-2 " id="editBtn" onclick="getTaskInfo(${index})"><i class="fa-solid fa-pen-to-square"></i></div>
                <div class="icon bg-danger d-flex align-items-center justify-content-center p-1 rounded-2 send-alert" id="deleteBtn" onclick="deleteTask(${index})"><i class="fa-solid fa-trash-can"></i></div>
              </div>
              <i class="fa-solid fa-caret-down ms-3 open-description"></i>
        </div>
        <div class=" description-box p-3  rounded-2 d-none">
           <p class=""> ${taskList[index].description}</p>
          </div>
    </div>
    `
    tasksContainer.innerHTML += taskHtml;
}

function displayAllTasks(){
    for(var i=0; i<taskList.length;i++){
      displayTask(i);
    }
  }
  

function clearForm(){
    taskInput.value = "";
    descriptionInput.value = "";
    dateInput.value=null;
}


function deleteTask(index){
    taskList.splice(index,1);
    localStorage.setItem("tasks" ,JSON.stringify(taskList));
    tasksContainer.innerHTML = "";
    displayAllTasks();
alertMessage()
    }
 
    function getTaskInfo(index){
        updatedIndex = index;
      taskInput.value = taskList[index].name;
      descriptionInput.value = taskList[index].description;
      dateInput.value = taskList[index].date;
      message.innerHTML=""
      addBtn.classList.add("d-none");
updateBtn.classList.remove("d-none");
}

function updateTask(){
    taskList[updatedIndex].name = taskInput.value ;
    taskList[updatedIndex].description = descriptionInput.value ;
    taskList[updatedIndex].date = dateInput.value ;

    localStorage.setItem("tasks" ,JSON.stringify(taskList));
   tasksContainer.innerHTML="";
   displayAllTasks();
   clearForm();

   addBtn.classList.remove("d-none");
   updateBtn.classList.add("d-none");
}

function completedTask(index) {
    var done = {
      name: taskList[index].name,
      description: taskList[index].description,
      date: taskList[index].date
      
    };
    completeList.push(done);
    localStorage.setItem("complete", JSON.stringify(completeList));
  
    setTimeout(function(){
         taskList.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  
    tasksContainer.innerHTML=""; 
    
    displayAllTasks();
    displayAllCompletedTasks();
    },1000)
  
  }

function displayAllCompletedTasks() {
    completeContainer.innerHTML = ""; 
    for (var i = 0; i < completeList.length; i++) {
      var completeHtml = `
        <div class="done w-100 d-flex justify-content-between p-2 bg-light rounded mb-2">
          <div class="w-100 position-relative ps-2 py-2 shadow">
            <h6 class="fw-semibold">${completeList[i].name}</h6>
            <p class="ps-3">${completeList[i].description}</p>
            <span class="time-complete position-absolute"><i class="fa-solid fa-calendar-day pe-2"></i>${completeList[i].date}</span>
          </div>
          <div class="d-flex align-items-center justify-content-center flex-column gap-2 ps-2">
          <div class="icon bg-primary d-flex align-items-center justify-content-center p-2 rounded-2" onclick="restoreCompletedTask(${i})" >
             <i class="fa-solid fa-rotate-left"></i>
          </div>
          <div class="icon bg-danger d-flex align-items-center justify-content-center p-2 rounded-2 send-alert" onclick="deleteCompletedTask(${i})">
            <i class="fa-solid fa-trash-can"></i>
          </div>
          </div>
          

        </div>
      `;
      completeContainer.innerHTML += completeHtml;
    }
  }

// Delete completed task
function deleteCompletedTask(index) {
    completeList.splice(index, 1);
    localStorage.setItem("complete", JSON.stringify(completeList));
    displayAllCompletedTasks();
    alertMessage()
  }


function validInput(){
    if(taskInput.value === "" || descriptionInput.value === "" || dateInput.value ===""){
        message.innerHTML= '<span class="p-2 text-danger">All inputs are required</span>';
        return true;
    }else{
        message.innerHTML="";
        return false;
    }
}
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("open-description")) {
      event.target.parentElement.nextElementSibling.classList.toggle("d-none");
    }
  });



function alertMessage(){
  toast.style.display = "block";
  toast.classList.add("alert");
  progresss.classList.add("alert");

  timer1 = setTimeout(() => {
      toast.classList.remove("alert");
  }, 2000); 

  timer2 = setTimeout(() => {
      progresss.classList.remove("alert");
      toast.style.display = "none";
  }, 2300);
  closeIcon.addEventListener("click", () => {
     toast.classList.remove("alert");
     toast.style.display = "none";
    
     setTimeout(() => {
         progresss.classList.remove("alert");
     }, 300);
    
     clearTimeout(timer1);
     clearTimeout(timer2);
    });
}

// Restore completed task back to the main task list
function restoreCompletedTask(index) {
  var restoredTask = {
    name: completeList[index].name,
    description: completeList[index].description,
    date: completeList[index].date
  };

  taskList.push(restoredTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  completeList.splice(index, 1);
  localStorage.setItem("complete", JSON.stringify(completeList));

  tasksContainer.innerHTML = ""; 
  completeContainer.innerHTML = ""; 
  displayAllTasks();
  displayAllCompletedTasks();
}

$("#addBtn").on("click" , function(){
  addTask()
})

$("#updateBtn").on("click" , function(){
  updateTask()
})