import './scss/index.scss';
import './index.html';
import Tomato from './js/modules/Tomato';

let count = 0;
const imp = ['default', 'important', 'so-so'];
document.querySelector('.button-importance')
  .addEventListener('click', ({target}) => {
    count += 1;
    if (count >= imp.length) {
      count = 0;
    }

    for (let i = 0; i < imp.length; i++) {
      if (count === i) {
        target.classList.add(imp[i]);
      } else {
        target.classList.remove(imp[i]);
      }
    }
  });

  const task = [
    'написать эссе',
    'освоить Angular',
    'Сортировка электронной почты',
    'Отредактировать лонгрид по лестницам в Тюмени',
    'уборка кухонного стола'
  ];

document.addEventListener('DOMContentLoaded', () => {
  const app = new Tomato({
    taskDuration: 25,
    pause: 5,
    bigPause: 15,
  });
  app.collectTasks(task);
  // console.log(app);
  app.makeRandomTaskActive();
  const {targetTime} = app.getTargetTime();
  // console.log('targetTime: ', targetTime);
  app.startTask(targetTime);
});
