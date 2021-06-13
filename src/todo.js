const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoPendList = document.querySelector(".js-toDoPend"),
  toDoFinishList = document.querySelector(".js-toDoFinish");

const TODO_PEND_LS = "PENDING";
const TODO_FINISH_LS = "FINISHED";
let toDoPends = [];
let toDoFinishs = [];
let newText = "";

function saveToDoPend() {
  localStorage.setItem(TODO_PEND_LS, JSON.stringify(toDoPends));
}
function saveToDoFinish() {
  localStorage.setItem(TODO_FINISH_LS, JSON.stringify(toDoFinishs));
}

function deleteToDoPend(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoPendList.removeChild(li);
  const cleanToDoPend = toDoPends.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDoPends = cleanToDoPend;
  saveToDoPend();
}

function deleteToDoFinish(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoFinishList.removeChild(li);
  const cleanToDoFinish = toDoFinishs.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDoFinishs = cleanToDoFinish;
  saveToDoFinish();
}

function modifyToDoFinish(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoFinishList.removeChild(li);
  const cleanToDoFinish = toDoFinishs.filter(function (toDo) {
    if (toDo.id === parseInt(li.id)) newText = toDo.text;
    return toDo.id !== parseInt(li.id);
  });
  toDoFinishs = cleanToDoFinish;
  saveToDoFinish();

  const newli = document.createElement("li");
  const delBtn = document.createElement("button");
  const modBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDoPends.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDoPend);
  modBtn.innerHTML = "✅";
  modBtn.addEventListener("click", modifyToDoPend);
  span.innerText = newText;
  newli.appendChild(span);
  newli.appendChild(delBtn);
  newli.appendChild(modBtn);
  newli.id = newId;
  toDoPendList.appendChild(newli);
  const toDoObj = {
    text: newText,
    id: newId
  };
  toDoPends.push(toDoObj);
  saveToDoPend();
}

function modifyToDoPend(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoPendList.removeChild(li);
  const cleanToDoPend = toDoPends.filter(function (toDo) {
    if (toDo.id === parseInt(li.id)) newText = toDo.text;
    return toDo.id !== parseInt(li.id);
  });
  toDoPends = cleanToDoPend;
  saveToDoPend();

  const newli = document.createElement("li");
  const delBtn = document.createElement("button");
  const modBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDoFinishs.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDoFinish);
  modBtn.innerHTML = "🔁";
  modBtn.addEventListener("click", modifyToDoFinish);
  span.innerText = newText;
  newli.appendChild(span);
  newli.appendChild(delBtn);
  newli.appendChild(modBtn);
  newli.id = newId;
  toDoFinishList.appendChild(newli);
  const toDoObj = {
    text: newText,
    id: newId
  };
  toDoFinishs.push(toDoObj);
  saveToDoFinish();
}

function paintToDoPend(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const modBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDoPends.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDoPend);
  modBtn.innerHTML = "✅";
  modBtn.addEventListener("click", modifyToDoPend);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(modBtn);
  li.id = newId;
  toDoPendList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDoPends.push(toDoObj);
  saveToDoPend();
}

function paintToDoFinish(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const modBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDoFinishs.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDoFinish);
  modBtn.innerHTML = "🔁";
  modBtn.addEventListener("click", modifyToDoFinish);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(modBtn);
  li.id = newId;
  toDoFinishList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDoFinishs.push(toDoObj);
  saveToDoFinish();
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDoPend(currentValue);
  toDoInput.value = "";
}

function loadToDoPend() {
  const loadedToDoPend = localStorage.getItem(TODO_PEND_LS);
  if (loadedToDoPend !== null) {
    const parsedToDoPend = JSON.parse(loadedToDoPend);
    parsedToDoPend.forEach(function (toDo) {
      paintToDoPend(toDo.text);
    });
  }
}

function loadToDoFinish() {
  const loadedToDoFinish = localStorage.getItem(TODO_FINISH_LS);
  if (loadedToDoFinish !== null) {
    const parsedToDoFinish = JSON.parse(loadedToDoFinish);
    parsedToDoFinish.forEach(function (toDo) {
      paintToDoFinish(toDo.text);
    });
  }
}

function init() {
  loadToDoPend();
  loadToDoFinish();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();