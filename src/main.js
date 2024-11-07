import './scss/index.scss';
import './index.html';
import Tomato from './js/modules/Tomato';
import { DefaultTask } from './js/modules/Task';
import { el, mount } from 'redom';

  const task = [
    'написать эссе',
    'освоить Angular',
    'Сортировка электронной почты',
    'Отредактировать лонгрид по лестницам в Тюмени',
    'уборка кухонного стола'
  ];

document.addEventListener('DOMContentLoaded', () => {

  const app = new Tomato({
    taskDuration: 2,
    pause: 5,
    bigPause: 15,
  }, '.main__container');

  // * - убрать в controller
  // let count = 0;
  // const imp = ['default', 'important', 'medium'];
  // document.querySelector('.button-importance')
  //   .addEventListener('click', ({target}) => {
  //     count += 1;
  //     if (count >= imp.length) {
  //       count = 0;
  //     }

  //     for (let i = 0; i < imp.length; i++) {
  //       if (count === i) {
  //         target.classList.add(imp[i]);
  //       } else {
  //         target.classList.remove(imp[i]);
  //       }
  //     }
  //   });
  // * - убрать в controller
  // const appDoc = document.querySelector('.main__container');
  // console.log('appDoc: ', appDoc);
  // const div = el('h2', '123213213213213', {
  //   style: {
  //     color: 'black'
  //   }
  // });
  // mount(appDoc, div)
  // app.collectTasks(task);
  // console.log(app);
  // app.makeRandomTaskActive();
  // const {targetTime} = app.getTargetTime();
  // console.log('targetTime: ', targetTime);
  // app.startTask(targetTime);
});
