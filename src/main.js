import './scss/index.scss';
import './index.html';
import Tomato from './js/modules/Tomato';
import { DefaultTask } from './js/modules/Task';
import { el, mount } from 'redom';
import { RenderTomato } from './js/modules/RenderTomato';


document.addEventListener('DOMContentLoaded', () => {
    const app = new RenderTomato({
    taskDuration: 0.5,
    pause: 0.75,
    bigPause: 1,
    }, '.main__container');
    app.renderInit();

  // const app = new Tomato({
  //   taskDuration: 2,
  //   pause: 5,
  //   bigPause: 15,
  // }, '.main__container');

  // * - убрать в controller

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
