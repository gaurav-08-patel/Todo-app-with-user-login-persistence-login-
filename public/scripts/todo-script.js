const submit = document.querySelector(".input-controls button");
let groceryContainer = document.querySelector(".grocery-container");
let grocery = document.querySelector(".grocery");
let list = document.querySelector(".grocery-list");
let alert = document.querySelector(".alert");
let clearItem = document.querySelector(".clear-items");

let editElement;
let editFlag = false;
let editId = "";

clearItem.addEventListener("click", clearlist);
window.addEventListener("DOMContentLoaded", () => {
    setPage();
});

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    let value = grocery.value;

    if (value && !editFlag) {
        await fetch("/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: `${value}` }),
        });

        setPage();

        groceryContainer.classList.add("show-container");

        setToDefault();
        displayAlert("item added !", "success");
    } else if (value && editFlag) {
        editElement.innerHTML = grocery.value;
        displayAlert("item Edited !", "success");

        await fetch("/todos/edit", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: `${parseInt(editId)}`, text: value }),
        });

        setToDefault();
    } else {
        displayAlert("Please enter value !", "danger");
    }
});

function setToDefault() {
    grocery.value = "";
    editId = "";
    editFlag = false;
    submit.innerHTML = "submit";
}

function displayAlert(msg, type) {
    alert.innerHTML = msg;
    alert.classList.add(`alert-${type}`);

    setTimeout(() => {
        alert.innerHTML = "";
        alert.classList.remove(`alert-${type}`);
    }, 1000);
}

async function deleteItem(e) {
    let element = e.currentTarget.parentElement.parentElement;
    let id = parseInt(element.dataset.id);
    list.removeChild(element);

    if (list.children.length === 0) {
        groceryContainer.classList.remove("show-container");
    }
    displayAlert("item removed !", "danger");
    setToDefault();

    await fetch(`/todos/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
}

function editItem(e) {
    editElement = e.currentTarget.parentElement.previousElementSibling;
    let value = editElement.innerHTML;
    editId = editElement.parentElement.dataset.id;
    editFlag = true;

    grocery.value = value;
    submit.innerHTML = "edit";
}
async function clearlist() {
    await fetch("/todos/clear", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    setPage();
    groceryContainer.classList.remove("show-container");
}

function createList(id, value) {
    let element = document.createElement("div");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.classList.add("grocery-item");
    element.setAttributeNode(attr);

    element.innerHTML = `<p class="title">${value}</p>
                    <div class="btn-container">
                        <button type="button" class="edit-btn">
                            <i class="fas fa-edit"></i>
                          </button>
                          
                          <button type="button" class="delete-btn">
                            <i class="fas fa-trash"></i>
                          </button>
                    </div>`;
    list.appendChild(element);
    let deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    let editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
}

async function setPage() {
    list.innerHTML = "";
    let response = await fetch("todos", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    let data = await response.json();

    data.rows.forEach((item) => {
        createList(item.id, item.text);
    });
    if (data.rows.length > 0) {
        groceryContainer.classList.add("show-container");
    }
}
