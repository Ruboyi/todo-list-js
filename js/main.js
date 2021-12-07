
import { formatDate } from './helpers.js';


import State, {
    addTask,
    toggleTask,
    cleanTasks,
    deleteAllTasks,
} from './state.js';


const form = document.querySelector('form.todo-form');
const todoList = document.querySelector('ul.todo-list');
const cleanBtn = document.querySelector('button.todo-clean');
const emptyBtn = document.querySelector('button.todo-empty');


form.addEventListener('submit', (e) => {
   
    e.preventDefault();
    const input = form.elements.todo;
    addTask(input.value);
    input.value = '';
    render();
});



todoList.addEventListener('click', (e) => {
    
    const { target } = e;
    if (target.matches('input[type="checkbox"]')) {
        
        const closestLi = target.closest('li');
        const index = closestLi.getAttribute('data-index');
        toggleTask(index);
        render();
    }
});


cleanBtn.addEventListener('click', () => {
    if (confirm('¿Quieres eliminar las tareas completadas?')) {
        cleanTasks();
        render();
    }
});


emptyBtn.addEventListener('click', () => {
    if (confirm('Seguro que quieres eliminar todas las tareas?')) {
        deleteAllTasks();
        render();
    }
});


function render() {
    todoList.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let i = 0; i < State.tasks.length; i++) {

        const { text, done, date } = State.tasks[i];
        const taskLi = document.createElement('li');
        taskLi.setAttribute('data-index', i);
        taskLi.innerHTML = `
            <input type="checkbox" />
            <p>${text}</p>
            <time datetime="${date}">${formatDate(new Date(date))}</time>
        `;
        if (done) {
            taskLi.classList.add('done');
            const input = taskLi.firstElementChild;
            input.setAttribute('checked', true);
        }
        frag.prepend(taskLi);
    }
    todoList.append(frag);
}

render();
