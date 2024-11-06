import { RenderTomato } from "./RenderTomato";
import { DefaultTask, Task } from "./Task";

class Tomato {
  #taskDuration = 25;
  #pause = 5;
  #bigPause = 15;
  #tasks = [];
  #activeTask = null;
  #messages = {
    ru: {
    noTask: 'Активной задачи не найдено!',
    tomato: 'Томат',
    noTask: 'Активной задачи не найденно. Пожалуйста активируйте задачу.',
    timerStart: 'Старт',
    timerStop: 'Стоп',
    pause: 'Перерыв',
    bigPause: 'Большой перерыв',
  },
  en: {
    noTask: 'No active task found!',
    tomato: 'Tomato',
    noTask: 'No active task found. Please active a task.',
    timerStart: 'Start',
    timerStop: 'Stop',
    pause: 'Pause',
    bigPause: 'Big pause',
  }
  };
  constructor({taskDuration, pause, bigPause}, app) {
    if (Tomato.instance) return Tomato.instance;
    this.renderTomato = new RenderTomato(document.querySelector(app));
    this.#taskDuration = taskDuration;
    this.#pause = pause;
    this.#bigPause = bigPause;
    Tomato.instance = this;
    this.init();
  }
  init() {
    // this.renderTomato.form.count.textContent = '121';
    console.log(this.renderTomato);
    const currentStorage = this.getStorage();
    console.log('currentStorage: ', currentStorage);
    if (currentStorage.length <= 0) {
      console.log('В данный момент, задач нет!')
    } else {
      this.collectTasks(currentStorage);
      console.log(this.#tasks);
    };
  }
  addTask(task) {
    this.#tasks.push(task);
  }
  collectTasks(arr) {
    for (const title of arr) {
      this.#tasks.push(new Task(title));
    }
  }
  makeTaskActive(task) {
    this.#activeTask = task;
  }
  startTask(time) {
    try {
      if (!this.#activeTask) throw new Error('Активной задачи не найденно!');
      this.#activeTask.start(time);
    } catch (error) {
      console.warn(error);
    }
  }
  makeRandomTaskActive() {
    const number = Math.round(Math.random() * (this.#tasks.length - 1) + 1);
    this.#activeTask = this.#tasks[number];
  }
  getTargetTime() {
    let targetTime; 
    let minutes;
    let modeName;

    switch(this.#activeTask.count) {
      case 0 :
      case 2 :
      case 4 :
        targetTime = this.#taskDuration * 60 * 1000;
        minutes = this.#taskDuration;
        modeName = 'tomato';
        break;
      case 1 :
      case 3 :
        targetTime = this.#pause * 60 * 1000;
        minutes = this.#pause;
        modeName = 'pause';
        break;
      case 5 :
        targetTime = this.#bigPause * 60 * 1000;
        minutes = this.#bigPause;
        modeName = 'bigPause';
        break;
    }
    return {targetTime, minutes, modeName};
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
}

export default Tomato;
