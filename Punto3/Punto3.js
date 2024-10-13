const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
  todo = [];
}

function CreateToDoItems() {
    if (todoValue.value === "" || todoValue.value === null) {
      todoAlert.innerText = "Ingrese la tarea que desea añadir a la lista";
      todoValue.focus();
    } else {
      let IsPresent = false;
      todo.forEach((element) => {
        if (element.item == todoValue.value) {
          IsPresent = true;
        }
      });
  
      if (IsPresent) {
        setAlertMessage("La tarea ya existe");
        return;
      }
  
      let li = document.createElement("li");
      const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
                      <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ_HTjbXAwi7gX2R-tmBh6zPL1bM9OUkrzY2MDeVcI5InyyiILQrnPG7rHc6mm9St5jwo&usqp=CAU" />
                      <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKwoPKQU2hidR3sNc12cNjYkuvDIR6p9_QgA&s" /></div></div>`;
      li.innerHTML = todoItems;
      listItems.appendChild(li);
  
      if (!todo) {
        todo = [];
      }
      let itemList = { item: todoValue.value, status: false };
      todo.push(itemList);
      setLocalStorage();
      todoValue.value = "";
      setAlertMessage("Tarea añadida");
    }
  }

  function ReadToDoItems() {
    todo.forEach((element) => {
      let li = document.createElement("li");
      let style = "";
      if (element.status) {
        style = "style='text-decoration: line-through'";
      }
      const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
        element.item
      }
      ${
        style === ""
          ? ""
          : '<img class="todo-controls" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxqJdTWvBdMRQ5b1CFor2vARrTIEiwQnjwgw&s" />'
      }</div><div>
      ${
        style === ""
          ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ_HTjbXAwi7gX2R-tmBh6zPL1bM9OUkrzY2MDeVcI5InyyiILQrnPG7rHc6mm9St5jwo&usqp=CAU" />'
          : ""
      }
      <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKwoPKQU2hidR3sNc12cNjYkuvDIR6p9_QgA&s" /></div></div>`;
      li.innerHTML = todoItems;
      listItems.appendChild(li);
    });
  }
  ReadToDoItems();

  function UpdateToDoItems(e) {
    if (
      e.parentElement.parentElement.querySelector("div").style.textDecoration ===
      ""
    ) {
      todoValue.value =
        e.parentElement.parentElement.querySelector("div").innerText;
      updateText = e.parentElement.parentElement.querySelector("div");
      addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
      todoValue.focus();
    }
  }
  
  function UpdateOnSelectionItems() {
    let IsPresent = false;
    todo.forEach((element) => {
      if (element.item == todoValue.value) {
        IsPresent = true;
      }
    });
  
    if (IsPresent) {
      setAlertMessage("La tarea ya esta en la lista");
      return;
    }
  
    todo.forEach((element) => {
      if (element.item == updateText.innerText.trim()) {
        element.item = todoValue.value;
      }
    });
    setLocalStorage();
  
    updateText.innerText = todoValue.value;
    addUpdate.setAttribute("onclick", "CreateToDoItems()");
    addUpdate.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/32/32339.png");
    todoValue.value = "";
    setAlertMessage("Tarea creada");
  }

  function DeleteToDoItems(e) {
    let deleteValue =
      e.parentElement.parentElement.querySelector("div").innerText;
  
    if (confirm(`¿Esta seguro de eliminar la tarea "${deleteValue}"?`)) {
      e.parentElement.parentElement.setAttribute("class", "deleted-item");
      todoValue.focus();
  
      todo.forEach((element) => {
        if (element.item == deleteValue.trim()) {
          todo.splice(element, 1);
        }
      });
  
      setTimeout(() => {
        e.parentElement.parentElement.remove();
      }, 1000);
  
      setLocalStorage();
    }
  }

  function CompletedToDoItems(e) {
    if (e.parentElement.querySelector("div").style.textDecoration === "") {
      const img = document.createElement("img");
      img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxqJdTWvBdMRQ5b1CFor2vARrTIEiwQnjwgw&s";
      img.className = "todo-controls";
      e.parentElement.querySelector("div").style.textDecoration = "line-through";
      e.parentElement.querySelector("div").appendChild(img);
      e.parentElement.querySelector("img.edit").remove();
  
      todo.forEach((element) => {
        if (
          e.parentElement.querySelector("div").innerText.trim() == element.item
        ) {
          element.status = true;
        }
      });
      setLocalStorage();
      setAlertMessage("Tarea completada");
    }
}

    function setLocalStorage() {
        localStorage.setItem("todo-list", JSON.stringify(todo));
      }

      function setAlertMessage(message) {
        todoAlert.removeAttribute("class");
        todoAlert.innerText = message;
        setTimeout(() => {
          todoAlert.classList.add("toggleMe");
        }, 1000);
      }

