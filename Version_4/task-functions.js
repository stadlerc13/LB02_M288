'use strict'

// Fetch existing tasks from localStorage
const getSavedTasks = () => {
    //read from browser storage
    const tasksJSON = localStorage.getItem('tasks');

    try {
        //if tasksJSON contains data
        if (tasksJSON){
            return JSON.parse(tasksJSON);
        } else {
            return [];
        }
        //line 9 to 13 can be replaced one line below
        //that accomplish the same
        //return tasksJSON ? JSON.parse(tasksJSON) : [];
    } catch (e) {
        return [];
    }
}

// Save tasks to localStorage
const saveTasks = (tasks) => {
    //write to browser storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task by id
const removeTask = (id) => {
    //find task by id
    const taskIndex = tasks
        .findIndex((task) => task.id === id);

    //remove task
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    }
}

// Toggle the completed value for a given task
const toggleTask = (id) => {
    const task = tasks
        .find((task) => task.id === id);

    if (task) {
        task.completed = !task.completed;
    }
};

// Render application tasks based on filters
const renderTasks = (tasks, filters) => {
    const filteredTasks = tasks.filter((task) => {
        const searchTextMatch = task.text
            .toLowerCase()
            .includes(filters.searchText.toLowerCase());

        const filterCateoryMatch = task.category
            .toLowerCase()
            .includes(filters.categoryText.toLowerCase());

        let einkaufsListe;
        if (filters.hideCompleted){
            einkaufsListe = task.completed;
        } else {
            einkaufsListe = !task.completed;
        }

        return searchTextMatch && einkaufsListe && filterCateoryMatch;
        //return searchTextMatch && einkaufsListe;
    });

    let einkauf;
    let text;
    if (filters.hideCompleted){
        einkauf = filteredTasks
            .filter((task) => task.completed);
        console.log(`eingekauft: ${einkauf.length}`);
        text = 'Dinge wurden eingekauft';
    }

    if (!filters.hideCompleted)
    {
        einkauf = filteredTasks
            .filter((task) => !task.completed);
        console.log(`noch zu kaufen: ${einkauf.length}`);
        text = 'Dinge müssen eingekauft werden';
    }


    document.querySelector('#tasks').innerHTML = '';
    document.querySelector('#tasks')
        .appendChild(generateSummaryDOM(einkauf,text));

    filteredTasks.forEach((task) => {
        document.querySelector('#tasks')
            .appendChild(generateTaskDOM(task));
    })
}

// Get the DOM elements for an individual note
const generateTaskDOM = (task) => {
    const taskEl = document.createElement('div');
    const checkbox = document.createElement('input');
    const taskText = document.createElement('span');
    const removeButton = document.createElement('button');

    // Setup task checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = task.completed;
    taskEl.appendChild(checkbox);
    checkbox.addEventListener('change', () => {
        toggleTask(task.id);
        saveTasks(tasks);
        renderTasks(tasks, filters);
    })

    // Setup the task text
    taskText.textContent = task.text;
    taskEl.appendChild(taskText);

    // Setup the remove button
    removeButton.textContent = 'x';
    taskEl.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        removeTask(task.id);
        saveTasks(tasks);
        renderTasks(tasks, filters);
    });

    return taskEl;
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTasks, text) => {
    const summary = document.createElement('h2');
    summary.textContent = ` ${incompleteTasks.length} ${text}`;
    return summary;
}
