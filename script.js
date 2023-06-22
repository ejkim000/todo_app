//  bring in elements from doto list

const form = document.getElementById("form");
const input = document.getElementById("input");
const todoUL = document.getElementById("todos");

form.addEventListener("submit", (e) => { // hit enter = submit form
    e.preventDefault(); // default action should not be taken as it normally would be

    addTodo();
});



function addTodo(todo) {
    let todoText = input.value;
    
    if (todo) todoText = todo.text;

    if (todoText) {
        const todoEL = document.createElement("li");
        if (todo && todo.completed) {
            todo.classList.add("completed"); // ??
        }

        todoEL.innerText = todoText;
        todoUL.appendChild(todoEL);
        input.value = ""; // remove input text after <li> was crated

        // mouse right click -> remove <li>
        // Dosen't allow remove when responsive view. why?
        todoEL.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todoEL.remove();
        });

        // mouse left click -> toggle completed style
        todoEL.addEventListener("click", (e) => {
            e.preventDefault();
            todoEL.classList.toggle("completed");
        });
    }
}