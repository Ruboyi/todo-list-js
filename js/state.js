

const localStorageTasks = window.localStorage.getItem('tasks');


const State = {
    tasks: localStorageTasks ? JSON.parse(localStorageTasks) : [],
};


const saveTasks = () => {
    const tasksJSON = JSON.stringify(State.tasks);
    window.localStorage.setItem('tasks', tasksJSON);
};


const addTask = (text) => {
    State.tasks.push({
        text,
        done: false,
        date: new Date().toISOString(),
    });
    saveTasks();
};


const toggleTask = (index) => {
    const task = State.tasks[index];
    if (!task) throw new Error('La tarea no existe');
    task.done = !task.done;
    saveTasks();
};


const cleanTasks = () => {
    State.tasks = State.tasks.filter((task) => !task.done);
    saveTasks();
};

const deleteAllTasks = () => {
    State.tasks.length = 0;
    saveTasks();
};


export default State;
export { addTask, toggleTask, cleanTasks, deleteAllTasks };
