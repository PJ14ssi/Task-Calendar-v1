// Get the current date
const currentDate = new Date();

// Define an array of month names
const monthNames = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

// Get the calendar and task input elements
const calendarContainer = document.querySelector(".calendar-table");
const messageInput = document.getElementById('messageInput');
const difficultySelect = document.getElementById('difficultySelect');
const addTaskButton = document.getElementById('addTaskButton');
const clearTasksButton = document.getElementById('clearTasksButton');

// Define an object to store the tasks
const tasks = {};

// Function to add a task to the tasks object
function addTaskToCalendar(year, month, day, taskName, difficulty) {
  const taskDate = new Date(year, month, day);
  const dateString = taskDate.toISOString().split("T")[0];

  if (!tasks[dateString]) {
    tasks[dateString] = [];
  }

  tasks[dateString].push({
    taskName: taskName,
    difficulty: difficulty
  });
}

// Function to generate the task list HTML for a specific date
function generateTaskListHTML(dateString) {
  let taskListHTML = '';

  if (tasks[dateString]) {
    tasks[dateString].forEach((task) => {
      taskListHTML += `
        <div class="task">
          <div class="checkbox"></div>
          <div class="task-name">${task.taskName}</div>
          <div class="dot ${task.difficulty}"></div>
        </div>
      `;
    });
  }

  return taskListHTML;
}

// Function to generate the calendar
function generateCalendar(year, month) {
  // Get the number of days in the specified month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create the calendar HTML
  let calendarHTML = `<h2 class="calendar-header">${monthNames[month]} ${year}</h2><table class="calendar-table"><tr>`;

  // Add weekday labels
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 0; i < 7; i++) {
    calendarHTML += `<th>${weekdays[i]}</th>`;
  }
  calendarHTML += "</tr><tr>";

  // Add blank cells for the days before the first day of the month
  const firstDay = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDay; i++) {
    calendarHTML += "<td></td>";0
  }

  // Add the days of the month
  let day = 1;
  let currentWeekday = firstDay;
  while (day <= daysInMonth) {
    if (currentWeekday === 7) {
      calendarHTML += "</tr><tr>";
      currentWeekday = 0;
    }
    const dateString = new Date(year, month, day).toISOString().split("T")[0];
    const taskListHTML = generateTaskListHTML(dateString);
    calendarHTML += `<td><div class="date">${day}</div>${taskListHTML}</td>`;
    day++;
    currentWeekday++;
  }

  // Add blank cells for the remaining days
  while (currentWeekday < 7) {
    calendarHTML += "<td></td>";
    currentWeekday++;
  }

  // Close the table and set the calendar HTML
  calendarHTML += "</tr></table>";
  calendarContainer.innerHTML = calendarHTML;

  // Add event listeners to checkboxes
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', handleCheckboxClick);
  });
}

// Function to handle sending user tasks
function sendUserTask() {
  const taskName = messageInput.value;
  const difficulty = difficultySelect.value;

  if (taskName.trim() === '') {
    return;
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  addTaskToCalendar(year, month, day, taskName, difficulty);
  generateCalendar(year, month);

  messageInput.value = '';
  messageInput.focus();
}

// Function to handle clearing the task list for the selected date
function clearTasks() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const dateString = currentDate.toISOString().split("T")[0];

  if (tasks[dateString]) {
    delete tasks[dateString];
    generateCalendar(year, month);
  }
}

// Generate the calendar for the current month
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

// Add event listeners
addTaskButton.addEventListener('click', sendUserTask);
clearTasksButton.addEventListener('click', clearTasks);

// Function to handle checkbox click event
function handleCheckboxClick(event) {
  const taskId = event.target.getAttribute('data-task-id');
  // Implement your logic to handle the checkbox click event
  // For example, you can update the task status or style
}
