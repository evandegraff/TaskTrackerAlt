// Creates a variable called tasks. 
// This is the same array of tasks that'll be in our Local Storage.
// Then parses the JSON object from it's local storage, which is done with the help of the JSON.parse().
// If there are no objects in local storage, it creates an empty array and assigns it to tasks.


window.addEventListener("load", () => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const nameInput = document.querySelector("#name");
    // Adds new form page. 
    const newTaskForm = document.querySelector("#new-task-form"); 
  // Creating a variable called taskInputs so we can store any inputs that come from this form into our array of tasks.
    const username = localStorage.getItem("username") || "";
  // Adding event listener to change() on name input so whenever someone changes their username,
  // it updates the localStorage key "Username" with whatever they typed into the text
  // field and calls itself again after setting its own value back. 
    nameInput.value = username;
  
    nameInput.addEventListener("change", (e) => {
      localStorage.setItem("username", e.target.value);
    });
  //-----------------------------------------------------------//
  // Adds a submit listener event, that is triggered when the user submits their task. 
  // When they do, it prevents behavior and creates a new task object with some of the inputs.
    newTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const task = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false,
        createdAt: new Date().getTime(),
      };
  // Pushes the object onto an array called tasks which is stored in local storage for later retrieval.
      tasks.push(task);
  
      localStorage.setItem("tasks", JSON.stringify(tasks));
  // Then it resets so they can start over if they want. 
      // Reset the form
      e.target.reset();
  // Displays our tasks here and updates them based on user changes / inputs. 
      DisplayTasks();
    });
  
    DisplayTasks();
  });
  
  function DisplayTasks() {
    const taskList = document.querySelector("#task-list");
    taskList.innerHTML = "";
  
    tasks.forEach((task) => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
  
      const label = document.createElement("label");
      const input = document.createElement("input");
      const span = document.createElement("span");
      const content = document.createElement("div");
      const actions = document.createElement("div");
      const edit = document.createElement("button");
      const deleteButton = document.createElement("button");
  // Creating checkbox and done button for tasks.
      input.type = "checkbox";
      input.checked = task.done;
      span.classList.add("bubble");
      if (task.category == "personal") {
        span.classList.add("personal");
      } else {
        span.classList.add("business");
      }
      // Creates, Edits, Deletes contents via innerHTML. 
      content.classList.add("task-content");
      actions.classList.add("actions");
      edit.classList.add("edit");
      deleteButton.classList.add("delete");
  // Adds content to show what type of task it is, adds action button for deleting and editing.
      content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
      edit.innerHTML = "Edit";
      deleteButton.innerHTML = "Delete";
  
      label.appendChild(input);
      label.appendChild(span);
      actions.appendChild(edit);
      actions.appendChild(deleteButton);
      taskItem.appendChild(label);
      taskItem.appendChild(content);
      taskItem.appendChild(actions);
  
      taskList.appendChild(taskItem);
  // Adding tasks to local storage to be displayed later. 
  // Use task / taskItems as containers. Then sets up an if statement that checks whether or not the done property was selected.
      if (task.done) {
        taskItem.classList.add("done");
      }
  
      input.addEventListener("change", (e) => {
        task.done = e.target.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
  // If it has been set to true, then it will display as completed. 
        if (task.done) {
          taskItem.classList.add("done");
        } else {
          taskItem.classList.remove("done");
        }
  
        DisplayTasks();
      });
  // Adds click listener to the delete button, goes through the task and filters out so that only one remains. 
      edit.addEventListener("click", (e) => {
        const input = content.querySelector("input");
        input.removeAttribute("readonly");
        input.focus();
        input.addEventListener("blur", (e) => {
          input.setAttribute("readonly", true);
          task.content = e.target.value;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          DisplayTasks();
        });
      });
  
      deleteButton.addEventListener("click", (e) => {
        tasks = tasks.filter((t) => t != task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        DisplayTasks();
      });
    });
  }
  