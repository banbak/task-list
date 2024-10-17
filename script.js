
// Variables globales
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskIndex = null;  // Variable para identificar si estamos editando

// Elementos del DOM
const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date");
const priorityInput = document.getElementById("priority");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search");
const filterPriority = document.getElementById("filter-priority");

// Función para renderizar tareas
function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = ''; // Limpiar la lista
    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${task.name}</strong>
            <p>Fecha límite: ${task.dueDate || 'Sin fecha'}</p>
            <p>Prioridad: ${task.priority}</p>
            <button onclick="editTask(${index})">Editar</button>
            <button onclick="deleteTask(${index})">Eliminar</button>
        `;
        taskList.appendChild(li);
    });
}

// Función para añadir o editar una tarea
function addOrEditTask() {
    const taskName = taskInput.value.trim();
    const taskDueDate = dueDateInput.value;
    const taskPriority = priorityInput.value;

    if (taskName === "") {
        alert("Por favor, introduce una tarea.");
        return;
    }

    if (editingTaskIndex !== null) {
        // Si estamos editando una tarea
        tasks[editingTaskIndex] = {
            name: taskName,
            dueDate: taskDueDate,
            priority: taskPriority
        };
        editingTaskIndex = null;
        addTaskBtn.textContent = "Añadir"; // Cambia el botón de nuevo a "Añadir"
    } else {
        // Si estamos añadiendo una nueva tarea
        const newTask = {
            name: taskName,
            dueDate: taskDueDate,
            priority: taskPriority
        };
        tasks.push(newTask);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "baja";
    renderTasks();
}

// Función para cargar una tarea en el formulario para editarla
function editTask(index) {
    const task = tasks[index];
    taskInput.value = task.name;
    dueDateInput.value = task.dueDate;
    priorityInput.value = task.priority;
    editingTaskIndex = index; // Guardar el índice de la tarea que estamos editando
    addTaskBtn.textContent = "Guardar cambios"; // Cambia el texto del botón a "Guardar cambios"
}

// Función para eliminar una tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Función para filtrar tareas por prioridad
function filterTasks() {
    const selectedPriority = filterPriority.value;
    if (selectedPriority === "todas") {
        renderTasks(); // Mostrar todas las tareas
    } else {
        const filteredTasks = tasks.filter(task => task.priority === selectedPriority);
        renderTasks(filteredTasks);
    }
}

// Función para buscar tareas
function searchTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const searchedTasks = tasks.filter(task => task.name.toLowerCase().includes(searchTerm));
    renderTasks(searchedTasks);
}

// Event Listeners
addTaskBtn.addEventListener("click", addOrEditTask);
searchInput.addEventListener("input", searchTasks);
filterPriority.addEventListener("change", filterTasks);

// Renderizar tareas al cargar la página
renderTasks();
