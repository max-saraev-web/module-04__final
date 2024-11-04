export class Task {
  constructor(title, count = 0) {
    this.title = title;
    this.count = count;
    this.id = this.generateId();
    // this.id = Math.random().toString().substring(2, 10);
  }
  increaseCounter() {
    ++this.count;
  }
  setTitle(newTitle) {
    this.title = newTitle;
  }
  start(time) {
    let timerId;
    const endTime = Date.now() + time;
    // console.log('endTime: ', endTime);

    const timerStarter = () => {
      console.log('функция таймера стартанула');
      // console.log(endTime);

      const dataTime = this.getTimeRemamning(endTime);
      const {minutes, seconds, timeRemaning } = dataTime;

      console.log('Остаток времени', `${minutes}:${seconds}`);
      timerId = setTimeout(timerStarter, 1000);
      if (timeRemaning <= 0 && this.count === 5) {
        clearInterval(timerId);
        this.count = 0
        };
      if (timeRemaning <= 0) {
          this.increaseCounter();
          clearInterval(timerId);
        };
    };
    timerStarter();
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
}