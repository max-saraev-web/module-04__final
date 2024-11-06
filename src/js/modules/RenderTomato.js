import { el, mount, setChildren } from "redom";

export class RenderTomato {
  constructor(root) {
    this.root = root;
    this.form = this.renderForm();
    // this.tasks = this.renderTasks();
  }
  // renderForm(title, count, time, controlBtn) {
  //   console.dir(header)
  //   this.root.append(header);
  // }
  renderForm() {
    const pomodoroForm = el('div', {
      class: 'pomodoro-form window',
      // style: {
      //   'border': '3px solid red',
      //   'min-width': '100%',
      //   'min-height': '20px',
      //   'display': 'block',
      //   'text-align': 'center',
      // }
    });
    //! - Шапка
    const windowPanel = el('div', {
      class: 'window__panel',
    })
    const panelTitle = el('p',
    {
      class: 'window__panel-title',
      textContent: 'Сверстать сайт'
    });
    const count = el('p', {
      class: 'window__panel-task-text',
      textContent: 'Томат 2',
    });
    //! - Шапка

    // ! - Окно с таймером и кнопками
    const windowBody = el('div', {
      class: 'window__body'
    });
    const timerText = el('p', {
      class: 'window__timer-text',
      textContent: '25:00'
    });
    const windowButtons = el('div', {
      class: 'window__buttons',
    });
    const startBtn = el('button', {
      class: 'button button-primary',
      textContent: 'Старт',
    })
    const stopBtn = el('button', {
      class: 'button button-secondary hidden',
      textContent: 'Стоп',
    })
    // ! - Окно с таймером и кнопками

    // ! - ФОРМА
    const taskForm = el('form', {
      class: 'task-form',
      action: 'submit',
    });
    const formInput = el('input', {
      class: 'task-name input-primary',
      name: 'task-name',
      id: 'task-name',
      placeholder: 'название задачи'
    });
    const importanceBtn = el('button', {
      type: 'button',
      class: 'button button-importance default',
      ariaLabel: 'Указать важность',
    });
    const submitBtn = el('button', {
      type: 'submit',
      class: 'button button-primary task-form__add-button',
      textContent: 'Добавить',
    });
    // ! - ФОРМА

    // ? - НИЖЕ: Основной контейнер для приложения
    // mount(this.root, pomodoroForm, 'before');
    this.root.prepend(pomodoroForm);

    // ? НИЖЕ: форма добавления задачи
    setChildren(taskForm, [formInput, importanceBtn, submitBtn]),

    // ? НИЖЕ: шапка 
    setChildren(windowPanel, [panelTitle, count]);

    // ? НИЖЕ: окно с таймером и кнопками
    setChildren(windowButtons, [startBtn, stopBtn]);
    setChildren(windowBody, [timerText, windowButtons]);

    // ? - НИЖЕ: большое окно с таймером и активной задачей
    setChildren(pomodoroForm, [windowPanel, windowBody, taskForm]);

    return {
      pomodoroForm, 
      panelTitle,
      count};
  }
}
