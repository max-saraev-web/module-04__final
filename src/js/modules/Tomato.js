import { RenderTomato } from "./RenderTomato";
import { DefaultTask, Important, Medium, Task } from "./Task";

class Tomato {
  #taskDuration = 25;
  #pause = 5;
  #bigPause = 15;
  #tasks = [];
  #activeTask = null;
  #loremTask = [
    {
      text: 'Задача средней важности',
      count: 1,
      id: '30365260',
      isActive: false,
      importance: 'medium',
    },
    {
      importance: 'important',
      text: 'Задача повышенной важности',
      count: 1,
      id: '23345367',
      isActive: true,
    },
    {
      importance: 'default',
      text: 'Задача низкой важности важности',
      count: 1,
      id: '04538350',
      isActive: false,
    },
  ];
  subscribers = {};
  constructor({taskDuration, pause, bigPause}) {
    if (Tomato.instance) return Tomato.instance;
    // this.renderTomato = new RenderTomato(document.querySelector(app));
    this.#taskDuration = taskDuration;
    this.#pause = pause;
    this.#bigPause = bigPause;
    Tomato.instance = this;
    this.init();
  }
  init() {
    const currentStorage = this.getStorage();
    if (currentStorage.length <= 0) {
      this.collectTasks(this.#loremTask);
    } else {
      this.collectTasks(currentStorage);
    };
  }
  get settings() {
    return {
        taskDuration:this.#taskDuration,
        pause: this.#pause,
        bigPause: this.#bigPause,
      }
  }
  addTask(task) {
    const currentStorage = this.getStorage();
    if (currentStorage.length <= 0) {
      this.#tasks = [];
      task.isActive = true;
      this.#activeTask = task;
    }
    this.#tasks.push(task);
    this.addStorageTask(currentStorage, task);
    this.setStorage(currentStorage);
    return this.#tasks;
  }
  isStorageEmpty() {
    return this.getStorage().length <= 0 ? true : false;
  }
  collectTasks(arr) {
        // let taskToAdd;
    // switch (importance) {
    //   case 'default':
    //     taskToAdd = new DefaultTask(obj);
    //     break;
    //   case 'important':
    //     taskToAdd = new Important(obj);
    //     break;
    //   case 'medium':
    //     taskToAdd = new Medium(obj);
    //     break;
    // }
    for (const elem of arr) {
      const taskImp = elem.importance;
      const classTask = this.strToClass(taskImp, elem);
      if (arr.length === 1) {
        classTask.isActive = true;
        this.#tasks = [];
        }
      this.#tasks.push(classTask);
      if (classTask.isActive) this.#activeTask = classTask;
    }
  }
  makeTaskActive(taskId) {
    // ! - Реализовать запись в локальное хранилище
    let task;
    for (const element of this.#tasks) {
      if (element.id === taskId) {
        this.#tasks.forEach(elem => elem.isActive = false);
        element.isActive = true;
        task = element;
      };
    }
    this.#activeTask = task;
    this.setStorage(this.#tasks);
    return this.#activeTask;
  }
  startTask() {
    try {
      if (!this.#activeTask) throw new Error('Активной задачи не найденно!');
      console.log(this.subscribers);
      this.#activeTask.start(this.settings, this.subscribers);
    } catch (error) {
      console.warn(error);
    }
  }
  makeRandomTaskActive() {
    const number = Math.round(Math.random() * (this.#tasks.length - 1) + 1);
    this.#activeTask = this.#tasks[number];
  }
  get tasks(){
    return this.#tasks;
  }
  get activeTask() {
    return this.#activeTask;
  }
  addStorageTask(arr, task) {
    arr.push(task);
  }
  getStorage(key = 'tomatoTimer') {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
  }
  setStorage(obj, key = 'tomatoTimer') {
    localStorage.setItem(key, JSON.stringify(obj));
  }
  strToClass(mode, obj) {
    let taskToAdd;
    switch (mode) {
      case 'default':
        taskToAdd = new DefaultTask(obj);
        break;
      case 'important':
        taskToAdd = new Important(obj);
        break;
      case 'medium':
        taskToAdd = new Medium(obj);
        break;
    }
    return taskToAdd;
  }
  setupNewTask(importance, params) {

    let taskToAdd;
    switch (importance) {
      case 'default':
        taskToAdd = new DefaultTask(params);
        break;
      case 'important':
        taskToAdd = new Important(params);
        break;
      case 'medium':
        taskToAdd = new Medium(params);
        break;
    }

    if (this.isStorageEmpty()) {
      this.notifySubscribers('tasksList', '');
      taskToAdd.isActive = true;
    }
    return taskToAdd;
  }
  subscribe(fieldName, cb) {
    if (!this.subscribers.hasOwnProperty(fieldName)) {
      this.subscribers[fieldName] = [];
    }
    this.subscribers[fieldName].push(cb);
  }
  getTaskNameById(id) {
    let title;
    for (const task of this.#tasks) {
      if (task.id === id ) title = task.text;
    }
    return title;
  }
  deleteTaskById(id) {
    for (const [index, item] of this.#tasks.entries()) {
      if (item.id === id ) {
        this.#tasks.splice(index, 1);
        if (item.isActive === true && this.#tasks.length > 0) {
            this.#tasks[0].isActive = true
            this.#activeTask = this.#tasks[0];
          };
        this.setStorage(this.#tasks);
        break;
      }
    }
  }
  editTaskById(id, {importance, text}) {
    for (const [index, item] of this.#tasks.entries()) {
      if (item.id === id) {
        if (item.isActive === true) {
          const classParams = JSON.parse(JSON.stringify(item));

          this.#activeTask.stop();
          this.#activeTask.notifySubscribers('stopBtn', this.subscribers);

          this.#tasks[index].text = text;
          classParams.text = text;
          this.#tasks[index].importance = importance;

          this.setStorage(this.#tasks);
          this.#activeTask = this.strToClass(importance, classParams);
          const params = {
            taskDuration: this.#taskDuration,
            pause: this.#pause,
            bigPause: this.#bigPause,
          }
          this.#activeTask.taskState(params, this.subscribers);
        } else {
          this.#tasks[index].text = text;
          this.#tasks[index].importance = importance;
          this.setStorage(this.#tasks);
        }
      }
    }
  }
  saveActiveTaskCount(count) {
    this.#tasks.forEach((elem) => {
      if (elem.isActive === true) {
        elem.count = count;
        this.setStorage(this.#tasks);
      }
    })
  }
}

export default Tomato;
