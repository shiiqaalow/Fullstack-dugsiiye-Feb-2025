const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const todoForm = document.querySelector("#form");
const todoBtn = document.querySelector(".btn");

document.addEventListener("DOMContentLoaded",loadTasks);

function loadTasks(){
    const tasks = getTaskFromLocalStorage();

    tasks.forEach(task=>{
       addTaskToDOM(task)
    })
}

todoForm.addEventListener("submit",addTask);

function addTask(e){
    e.preventDefault();
    const taskText = todoInput.value.trim();

    if(taskText!==""){
        const task = {
            id:Date.now(),
            text:taskText,
            completed:false
        }
    todoInput.value = "";
    addTaskToDOM(task);
    saveData(task);
    }
}

function addTaskToDOM(task){
    const li = document.createElement("li");
    li.className = `todo-item ${task.completed ? "completed" :""}`;
    li.dataset.id = task.id;
    li.innerHTML = `        <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''}>
                    <span class ="task">${task.text}</span>
                    <button class="edit">Edit<button
                    <button class="delete">Delete<button`
    todoList.appendChild(li);
    attachEventListeners(li,task)
}

function attachEventListeners(li,task){
    const deleteBtn = li.querySelector(".delete");
    const editBtn = li.querySelector(".edit");
        const checkbox = li.querySelector('.complete-checkbox');

    deleteBtn.addEventListener("click",function(){
        handleDelete(task.id,li);
    })

    editBtn.addEventListener("click",function(){
        handleEdit(task.id,li);
    })

        checkbox.addEventListener('change', function () {
        toggleTaskCompletion(task.id, li, checkbox.checked);
    });

}

function handleDelete(id,li){
    let tasks =getTaskFromLocalStorage();

    tasks = tasks.filter(task => task.id != id);
    
    localStorage.setItem("tasks",JSON.stringify(tasks));
    li.remove();
}

function handleEdit(taskId,li){
    const taskSpan = li.querySelector(".task")
    const newTaskText = prompt("Edit your task",taskSpan.textContent);

    //updating the DOM after being edited

if(newTaskText !== null && newTaskText.trim() !== "")
    taskSpan.textContent = newTaskText;

    updateTask(taskId,newTaskText);
}

function updateTask(id,newTaskText){
    const tasks = getTaskFromLocalStorage();
    const task = tasks.find(task => task.id == id);

    if(task){
        task.text = newTaskText;
        localStorage.setItem("tasks",JSON.stringify(tasks))
    }
}

function toggleTaskCompletion(taskId, li, isCompleted) {
    const tasks = getTaskFromLocalStorage();
    const task = tasks.find(task => task.id == taskId);
    if (task) {
        task.completed = isCompleted;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.classList.toggle('completed', isCompleted);
    }
}


function saveData(task){
    const oldTasks = getTaskFromLocalStorage()
    oldTasks.push(task)
    localStorage.setItem("tasks",JSON.stringify(oldTasks));
}

function  getTaskFromLocalStorage(){
    const oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return oldTasks;
}

