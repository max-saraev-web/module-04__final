import Tomato from "./Tomato";

export class ControllerTomato {
  constructor(params) {
    this.tomato = new Tomato(params);
  }
  handleTaskActive(id) {
    
  }
  receiveActiveTask() {
    return this.tomato.activeTask;
  }
  pullTasks() {
    return this.tomato.tasks;
  }
  handleIsStorageEmpty() {
    return this.tomato.isStorageEmpty();
  }
  pullActiveTask() {
    return this.tomato.activeTask;
  }
  handleAddTask(taskId) {
    console.log(this.tomato);
    this.tomato.addTask(taskId);
  }
  handleActiveTask(taskId) {
    return this.tomato.makeTaskActive(taskId);
  }
  handleTimer() {
    return this.tomato.startTask();
  }
  handleStop() {
    return this.tomato.activeTask.stop();
  }
  handleSubscribe(fieldName, cb) {
    return this.tomato.subscribe(fieldName, cb);
  }
  handleSetupNewTask(importance, params) {
    return this.tomato.setupNewTask(importance, params);
  }
  handleTaskState(params) {
    return this.tomato.activeTask.taskState(params);
  }
  handleGetTaskNameById(id) {
    return this.tomato.getTaskNameById(id);
  }
  handleDeleteTaskByID(id) {
    return this.tomato.deleteTaskById(id);
  }
  handleEditTaskById(id, newParams) {
    return this.tomato.editTaskById(id, newParams);
  }
  handleSaveActiveTaskCount(count) {
    const tasks = this.tomato.tasks;
    tasks.forEach((elem) => {
      if (elem.isActive === true) {
        elem.count = count;
      }
    });
    this.tomato.setStorage(tasks);
  }
}