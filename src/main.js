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
});
