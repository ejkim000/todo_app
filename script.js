//  bring in elements from doto list

const form = document.getElementById("form");
const input = document.getElementById("input");
const todoUL = document.getElementById("todos");
const todos = JSON.parse(localStorage.getItem("todos"));

// show todos when todos are saved in my localStorage
if (todos) {
    todos.forEach(todo => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => { // hit enter = submit form
    // default action should not be taken as it normally would be
    e.preventDefault();
    // add todo
    addTodo();
});


function addTodo(todo) {
    let todoText = input.value;

    if (todo) todoText = todo.text;

    if (todoText) {
        const todoEL = document.createElement("li");

        // if there is a todo and completed
        if (todo && todo.completed) {
            todoEL.classList.add("completed");
        }

        todoEL.innerText = todoText;
        todoUL.appendChild(todoEL);
        // remove input text after <li> was crated
        input.value = "";

        // mouse right click -> remove <li>
        // Dosen't allow remove when dev tool opened && responsive view. why?
        todoEL.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todoEL.remove();
            updateLS();
        });

        // mouse left click -> toggle completed style
        todoEL.addEventListener("click", (e) => {
            e.preventDefault();
            todoEL.classList.toggle("completed");
            updateLS();
        });
        
        updateLS(); //here or next line?
    }
}

// update local storage
function updateLS() {
    const todosEL = document.querySelectorAll("li");
    const todos = [];

    todosEL.forEach(todoEL => {
        todos.push({
            text: todoEL.innerText,
            completed: todoEL.classList.contains("completed")
        });
    });

    // localstorage doesn't accept array so change to JSON
    localStorage.setItem("todos", JSON.stringify(todos));
}