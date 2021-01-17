'use strict'

//get task list as JSON-object format
let tasks = getSavedTasks();

//set initial filter of empty
const filters = {
    searchText: '',
    hideCompleted: false,
    categoryText: ''
};

//show task list
renderTasks(tasks, filters);


/**
 * Event when searching for tasks
 */
document.querySelector('#search-text')
    .addEventListener('input', (e) => {
    //set search filter
    filters.searchText = e.target.value;
    //show task list with filter
    renderTasks(tasks, filters);
});


/**
 * Event for a new task
 */
document.querySelector('#new-task')
    .addEventListener('submit', (e) => {
    e.preventDefault();

    let errObj = document.getElementById("error");
        errObj.innerHTML = "";
    let cat = e.target.elements.category.value;

    if (cat === '-'){
        errObj.innerHTML = "Bitte Kategorie auswählen!";
    }
    else {
        //add new task with push-method into JSON-object
        tasks.push({
            id: uuidv4(),
            text: e.target.elements.text.value,
            category: cat,
            completed: false
        });
    }
    console.log(cat);

    //save tasks
    saveTasks(tasks);
    //show tasks
    renderTasks(tasks, filters);
    e.target.elements.text.value = '';
});



/**
 * Hide completed tasks
 */
document.querySelector('#hide-completed')
    .addEventListener('change', (e) => {
    //en- or disable completed tasks
    filters.hideCompleted =e.target.checked;
    //show tasks
    renderTasks(tasks, filters);
})


document.querySelector('#filter-category')
    .addEventListener('change', (e) => {
    //en- or disable completed tasks
    filters.categoryText = e.target.value;
    console.log(e.target.value);
    //show tasks
    renderTasks(tasks, filters);
});
