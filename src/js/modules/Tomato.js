import { Task } from "./Task";

class Tomato {
  #taskDuration = 25;
  #pause = 5;
  #bigPause = 15;
  #tasks = [];
  #activeTask = null;
  constructor({taskDuration, pause, bigPause}) {
    
    this.#taskDuration = taskDuration;
    this.#pause = pause;
    this.#bigPause = bigPause;
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
}

export default Tomato;
