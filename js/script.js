// global array
let taskList = []; //empty array
const entryElm = document.getElementById("entry");
const badElm = document.getElementById("bad");
const badHr = document.getElementById("badHr");
const allHr = document.getElementById("allHr");

// get the form data on button click
const handleOnSubmit = (form) => {
  const newTask = new FormData(form);

  // array object
  const taskObj = {
    id: randomStr(),
    task: newTask.get("task"),
    hr: +newTask.get("hr"),
    type: "entry",
  };

  // total weekly
  const totalWeeklyHr = 24 * 7;
  const calcTotalHr = totalAllocatedHr();

  if (taskObj.hr + calcTotalHr > totalWeeklyHr) {
    return alert(
      `You are not allowed to add any task that takes more than ${
        totalWeeklyHr - calcTotalHr
      } hour`
    );
  }

  // add to the global array
  taskList.push(taskObj);
  displayEntryTask();
};

// create the function that takes the array (only entry list), loop through it and create html and push to the dom
const displayEntryTask = () => {
  let str = ``;

  const entryListOnly = taskList.filter((item) => item.type === "entry");

  entryListOnly.map((item, i) => {
    str += `<tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td class="text-center">${item.hr}</td>
    <td class="text-end">
      <button onclick="deleteTask('${item.id}')" class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button onclick="switchTask('${item.id}', 'bad')" class="btn btn-success">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
  </tr>`;
  });

  // check total
  totalAllocatedHr();
  entryElm.innerHTML = str;
};

// create the function that takes the array (only bad list), loop through it and create html and push to the dom
const displayBadTask = () => {
  let str = ``;

  const badListOnly = taskList.filter((item) => item.type === "bad");

  badListOnly.map((item, i) => {
    str += `<tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td class="text-center">${item.hr}</td>
    <td class="text-end">
      <button onclick="switchTask('${
        item.id
      }', 'entry')" class="btn btn-warning">
      <i class="fa-solid fa-arrow-left"></i>
      </button>
      <button onclick="deleteTask('${item.id}')" class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  </tr>`;
  });

  const totalBadHr = badListOnly.reduce((acc, item) => acc + item.hr, 0);

  badHr.innerHTML = totalBadHr;
  badElm.innerHTML = str;
};

// random id create
const randomStr = () => {
  let result = "";
  const length = 6;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(
      Math.floor(Math.random() * (characters.length - 1))
    );
    counter++;
  }
  console.log(result);
  return result;
};

// switch task between entry and bad list
const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        type,
      };
    }
    return item;
  });

  displayEntryTask();
  displayBadTask();
};

// delete task on entry and bad list
const deleteTask = (id) => {
  if (window.confirm("Are you sure to delete?")) {
    taskList = taskList.filter((item) => item.id !== id);

    displayEntryTask();
    displayBadTask();
  }
};

// total allocated hr
const totalAllocatedHr = () => {
  const total = taskList.reduce((acc, item) => acc + item.hr, 0);

  allHr.innerHTML = total;
  return total;
};

// filter, map, reduce, forEach
