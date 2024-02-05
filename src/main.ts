import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

// const todos: Todo[] = [];
const storedTodos = localStorage.getItem("todos");
const todos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];

const todoContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e) => {
  e.preventDefault();
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),
  };
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  todoInput.value = "";
  getAllTodos(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";
  // Creating a checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) {
        item.isCompleted = checkBox.checked;
      }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(isCompleted);
    paragraph.className = checkBox.checked ? "textCut" : "";
  };

  // Creating p for title
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "textCut" : "";
  // Creating delete btn
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
    localStorage.removeItem("todos")
    console.log("Deleted");
  };
  // Appending All To Todo Item
  todo.append(checkBox, paragraph, btn);
  todoContainer.append(todo);
};

// Delete Function
const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  getAllTodos(todos);
};

// Get All Todos
const getAllTodos = (todos: Todo[]) => {
  todoContainer.innerText = "";
  todos.forEach((item) => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
};
