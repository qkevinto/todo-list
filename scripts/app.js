/**
* JavaScript To Do List application
*/
function Task(taskString) {
  this.listItem = document.createElement("li");
  this.listItem.className = "ToDo-incompleteTask-list-item";
  this.listItemInner = document.createElement("div");
  this.listItemInner.className = "ToDo-incompleteTask-list-inner";
  this.checkBox = document.createElement("input");
  this.checkBox.className = "ToDo-input-checkbox";
  this.label = document.createElement("label");
  this.label.className = "ToDo-label";
  this.editInput = document.createElement("input");
  this.editInput.className = "ToDo-input-text";
  this.editButton = document.createElement("button");
  this.deleteButton = document.createElement("button");

  // Each elements, needs to be modified (shaped)
  this.checkBox.type = "checkbox";
  this.editInput.type = "text";
  this.editButton.innerText = "Edit";
  this.editButton.className = "ToDo-btn ToDo-btn-edit";
  this.deleteButton.innerText = "Delete";
  this.deleteButton.className = "ToDo-btn ToDo-btn-delete";

  this.label.innerText = taskString;

  // Each elements, needs to be appended to the list item
  this.listItemInner.appendChild(this.checkBox);
  this.listItemInner.appendChild(this.label);
  this.listItemInner.appendChild(this.editInput);
  this.listItem.appendChild(this.listItemInner);
  this.listItem.appendChild(this.editButton);
  this.listItem.appendChild(this.deleteButton);

  var incompleteTasksHolder = document.getElementById("incomplete-tasks"); // incomplete-tasks
  incompleteTasksHolder.appendChild(this.listItem);

  /** Elements Selection for attaching events */
  // cycle over the incompleteTasksHolder ul li
  for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    // bind events to li's children (taskCompleted)
    this.bindTaskEvents(incompleteTasksHolder.children[i], this.taskCompleted);
  }

  // cycle over the completedTasksHolder ul li
  if (this.completedTasksHolder) {

    for (var i = 0; i < this.completedTasksHolder.children.length; i++) {
      // foreach li
      // bind events to li's children (taskIncomplete)
      this.bindTaskEvents(this.completedTasksHolder.children[i], this.taskIncomplete);
    }
  }

  return this.listItem;
}

/** Events Handlers */
/** New task li */
Task.prototype.createTask = function(taskString) {
  // Each elements, needs to be created

}

// Edit existing tasks
Task.prototype.editTask = function() {

  // When the edit button is pressed
  this.listItem = this.parentNode;
  this.editInput = this.listItem.querySelector("input[type=text]");
  this.label = this.listItem.querySelector("label");
  this.editButton = this.listItem.querySelector("button.ToDo-btn-edit");

  var containsClass = this.listItem.classList.contains("editMode");
  // if the class of the parent is .editMode
  if (containsClass) {
    // switch back from .editMode
    // label text become the input value
    this.label.innerText = this.editInput.value;
    this.editButton.innerText = "Edit";
  } else {
    // switch to .editMode
    // input value becomes the label text
    this.editInput.value = this.label.innerText;
    this.editButton.innerText = "Save";
  }

  // Basically we're doing a Toggle of .editMode on the li
  this.listItem.classList.toggle("editMode");
}

// Delete existing task
Task.prototype.deleteTask = function() {
  // When the delete button is pressed
    // Remove the parent li from the ul
    this.listItem = this.parentNode;
    var ul = this.listItem.parentNode;

    ul.removeChild(this.listItem);
}

// Mark a task as complete
Task.prototype.taskCompleted = function(_this, checkbox) {
  // When the checkbox is checked
    // append the task li to the #completed-tasks
    var listItemInner = checkbox.parentNode;
    var listItem = listItemInner.parentNode;
    var labelCompleted = checkbox.nextSibling;
    labelCompleted.className += " ToDo-completedTask-label";
    var completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks
    completedTasksHolder.appendChild(listItem);

    _this.bindTaskEvents(listItem, _this.taskIncomplete);
}

// Mark a task as incomplete
Task.prototype.taskIncomplete = function(_this, checkbox) {
  // When the checkbox is unchecked
    // append the task li to the #incomplete-tasks
    var listItemInner = checkbox.parentNode;
    var listItem = listItemInner.parentNode;
    var labelIncomplete = checkbox.nextSibling;
    labelIncomplete.className = "ToDo-label";
    var incompleteTasksHolder = document.getElementById("incomplete-tasks");
    incompleteTasksHolder.appendChild(listItem);

    _this.bindTaskEvents(listItem, _this.taskCompleted);
}

/*
* Data Binding
*/
Task.prototype.bindTaskEvents = function(taskListItem, checkboxEventHandler) {
  // select taskListItems's children
  var _this = this;

  var checkBox = taskListItem.querySelector("input[type=checkbox");
  var editButton = taskListItem.querySelector("button.ToDo-btn-edit");
  var deleteButton = taskListItem.querySelector("button.ToDo-btn-delete");

  // bind editTask to edit button
  editButton.onclick = this.editTask;

  // bind deleteTask to delete button
  deleteButton.onclick = this.deleteTask;

  // bind taskCompleted (checkboxEventHandler) to checkbox
  checkBox.addEventListener("click", function() {
      checkboxEventHandler(_this, this);
  });
}

// Set the click handler to addTask function

var ToDo = function() {
  var _this = this;

  _this.taskInput = document.getElementById("new-task"); // new-task
  _this.addButton = document.getElementById("addButton"); // first-button

  _this.addButton.addEventListener("click", function() {
    if (_this.taskInput.value === "") {
      alert("Please insert a new task");
    } else {
      var task = new Task(_this.taskInput.value);
      _this.taskInput.value = "";
    }
  });
}

var toDo = new ToDo();
