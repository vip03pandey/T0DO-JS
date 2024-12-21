document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let task = JSON.parse(localStorage.getItem('task')) || [];

    task.forEach(renderTask);

    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        task.push(newTask);
        saveTask();
        renderTask(newTask);
        todoInput.value = "";
    });
   function renderTask(task){
    const li=document.createElement("li");
    li.dataset.id=task.id;

    const text=document.createElement('span');
    text.textContent=task.text;
    text.style.textDecoration=task.completed ? "line-through" :"none";

    const completeBtn=document.createElement('button');
    completeBtn.textContent=task.completed ? "Undo " : "Complete"
    completeBtn.addEventListener('click',()=>toggleComplete(task.id))

    const deleteBtn=document.createElement('button');
    deleteBtn.textContent="Delete";
    deleteBtn.addEventListener('click',()=>deleteTask(task.id));

    li.append(text,completeBtn,deleteBtn);
    todoList.appendChild(li);


   }

   function toggleComplete(id){
    // find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, findIndex immediately returns that element index. Otherwise, findIndex returns -1.
    const taskindex=task.findIndex(t=>t.id===id);
    if(taskindex!==-1){
        task[taskindex].completed=!task[taskindex].completed;
        saveTask();
        refreshList();
    }
   }
   function deleteTask(id){
    task=task.filter(t=>t.id!=id);
    saveTask();
    refreshList();
   }

    function saveTask() {
        localStorage.setItem('task', JSON.stringify(task));
    }

    function refreshList() {
        todoList.innerHTML = "";
        task.forEach(renderTask);
    }
});