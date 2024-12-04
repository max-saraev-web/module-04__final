export class Task {
  constructor({text, count = 1, id, isActive}) {
    const proto = Object.getPrototypeOf(this);
    if (proto.constructor === Task) throw new Error('Класс задачи является АБСТРАКТНЫМ');
    this.text = text;
    this.count = count;
    this.id = id ? id : this.generateId();
    this.isActive = isActive ? isActive : false;
    // this.id = Math.random().toString().substring(2, 10);
    this.timerId;
    this.resumeTime = null;
  }
  increaseCounter() {
    ++this.count;
  }
  setTitle(newTitle) {
    this.text = newTitle;
  }

  start(settings, subscribers) {
    const {time} = this.taskState(settings);
    console.log('time: ', time);
    const timeMs = time * 60 * 1000;

    const end = this.resumeTime ?
      this.resumeTime + Date.now() : Date.now() + timeMs;

    let minutesRemaning;
    let secondsRemaning;

    const timerStarter = () => {

      const timeRemaning = end - Date.now();

      minutesRemaning = Math.floor(timeRemaning / 1000 / 60 % 60);
      
      secondsRemaning = Math.floor(timeRemaning / 1000 % 60);

      this.resumeTime = timeRemaning;
      this.notifySubscribers('timer', 
        subscribers,
        `${this.formatTime(minutesRemaning)}:${this.formatTime(secondsRemaning)}`
        ); 

      console.log('счётчик', this.countVal);
      this.timerId = setTimeout(timerStarter, 1000);
      if (timeRemaning <= 0 && this.count === 6) {
        this.count = 1;
        clearInterval(this.timerId);
        this.resumeTime = null;
        this.notifySubscribers(
            'stopBtn',
            subscribers
          );
        this.taskState(settings, subscribers);
        this.notifySubscribers('counter',
            subscribers, this.count);
        this.notifySubscribers('saveCount', subscribers, this.count);
        } else if(timeRemaning <= 0) {
          this.increaseCounter();
          clearInterval(this.timerId);
          this.notifySubscribers(
            'stopBtn',
            subscribers
          );
          this.taskState(settings, subscribers);
          this.resumeTime = null;
          this.notifySubscribers('counter',
            subscribers, this.count);
          console.log(subscribers);
          this.notifySubscribers('saveCount', subscribers, this.count);
        }

    };
    timerStarter();
  }
  stop() {
    clearInterval(this.timerId);
  }
  formatTime(num) {
    return num.toString().padStart(2,'0');
  }
  generateId(min = 1, max = 9) {
  const fullId = [];

  for (let i = 0; i < 8; i++) {
    if (i === 0) {
      fullId[i] = Math.round(Math.random() * (max - min) + min);
    } else fullId.push(Math.round(Math.random() * (max - min) + min));
  }
  return fullId.join('');
  }
  getTimeRemamning(stopTime) {
    // console.log('123', stopTime);
    const timeRemaning = stopTime - Date.now();
    // console.log('timeRemaning: ', timeRemaning);

    const min = Math.floor(timeRemaning / 1000 / 60 % 60) + '';
    const sec = Math.floor(timeRemaning / 1000 % 60) + '';

    return {
      minutes: min.padStart(2, 0),
      seconds: sec.padStart(2, 0),
      timeRemaning,
    }
  }
  get countVal() {
    return this.count;
  }
  taskState(params, subscribers) {
    const taskTitle = this.text;
    const {taskDuration, pause, bigPause} = params;

    let time;
    let mode;

    switch (this.count) {
      case 1:
        mode = 'Томат 1';
        time = taskDuration;
        break;
      case 2:
        mode = 'Маленький перерыв 1';
        time = pause;
        break;
      case 3:
        mode = 'Томат 2';
        time = taskDuration;
        break;
      case 4:
        mode = 'Маленький перерыв 2';
        time = pause;
        break;
      case 5:
        mode = 'Томат 3';
        time = taskDuration;
        break;
      case 6:
        mode = 'Большой перерыв'
        time = bigPause;
        break;
    }

    const totalSeconds = Math.floor(time * 60);
    const min = Math.floor(totalSeconds / 60);
    const sec = (totalSeconds % 60);

    const modeTime = `${this.formatTime(min)}:${this.formatTime(sec)}`;

    if (!subscribers) {
      return {taskTitle,modeTime, mode, time};
    } 

    this.notifySubscribers(
      'timer',
      subscribers,
      modeTime);
    this.notifySubscribers(
      'title',
      subscribers,
      taskTitle);
    this.notifySubscribers(
      'mode',
      subscribers,
      mode);
  }
  notifySubscribers(fieldName,subscribers, content) {
    subscribers[fieldName].forEach(cb => {
      if (content !== undefined) {
        cb(content);
      }
      else {
        cb();
      }
    });
  }
}

export class DefaultTask extends Task {
  constructor({text, count, id, isActive, importance = 'default'}) {
    super({text, count, id, isActive})
    this.importance = importance;
  }
}

export class Important extends Task {
  constructor({text, count, id, isActive, importance = 'important'}) {
    super({text, count, id, isActive})
    this.importance = importance;
  }
}

export class Medium extends Task {
  constructor({text, count, id, isActive, importance = 'medium'}) {
    super({text, count, id, isActive})
    this.importance = importance;
  }
}
