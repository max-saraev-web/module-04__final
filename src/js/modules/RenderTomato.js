import { el, mount, setChildren, text } from "redom";

export class RenderTomato {
  constructor(root) {
    this.root = root;
    this.clearContainer(root);
    this.form = this.renderForm();
    this.tasks = this.renderTasks();
    this.bindListeners();
  }
  // renderForm(title, count, time, controlBtn) {
  //   console.dir(header)
  //   this.root.append(header);
  // }
  clearContainer(container) {
    container.innerHTML = '';
  }
  renderForm() {
    const pomodoroForm = el('div', {
      class: 'pomodoro-form window',
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
      placeholder: 'название задачи',
      autocomplete: 'off',
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
    mount(this.root, pomodoroForm);

    // ? НИЖЕ: форма добавления задачи
    setChildren(taskForm, [formInput, importanceBtn, submitBtn]);

    // ? НИЖЕ: шапка 
    setChildren(windowPanel, [panelTitle, count]);

    // ? НИЖЕ: окно с таймером и кнопками
    setChildren(windowButtons, [startBtn, stopBtn]);
    setChildren(windowBody, [timerText, windowButtons]);

    // ? - НИЖЕ: большое окно с таймером и активной задачей
    setChildren(pomodoroForm, [windowPanel, windowBody, taskForm]);

    // * 
    return { 
      panelTitle,
      count,
      timerText,
      startBtn,
      stopBtn,
      formInput,
      importanceBtn,
      submitBtn,
      };
  }
  renderTasks(tasksArr = [
    {
      text: 'Сверстать сайт',
      count: 0,
      id: '38569442',
      importance: 'important'
    },
    {
      text: 'Оплатить налоги',
      count: 0,
      id: '38569448',
      importance: 'medium'
    },
    {
      text: 'Проверить валидность',
      count: 0,
      id: '38569441',
      importance: 'default'
    }

  ]) {
    //! - Обёртка
    const tasksWrapper = el('div', {
      class: 'pomodoro-tasks'
    });
    //! - Обёртка
    // ! - Задачи
    const tasks = el('div', {
      class: 'tasks',
    });
    const tasksTitle = el('p', {
      class: 'tasks__title',
      textContent: 'Задачи:',
    });
    const tasksList = el('ul', {
      class: 'tasks__list',
    })
    const createTasks = () => {
      const createdTasks = [];
      for (const element of tasksArr) {
        createdTasks.push(this.createTask(element));
      }
      return createdTasks;
    };
    const timeRemaning = el('p', {
      class: 'tasks__deadline',
      textContent: '1 час 30 мин',
    });
    // ! - Задачи
    // ! - Инструкция_начало
    const manual = el('div', {
      class: 'manual',
    });
    const manualDetails = el('details', {
      class: 'manual__details',
    });
    const summary = el('summary', {
      class: 'manual__title tasks__header-title',
      textContent: 'Инструкция',
    });
    const manualList = el('ol', {
      class: 'manual__list',
    })
    const manualElems = () => {
      const manualSteps = [];
      const instructionsText = [
        'Напишите название задачи чтобы её добавить',
        'Для активации задачи, выберите её из списка',
        'Запустите таймер',
        'Работайте пока таймер не прозвонит',
        'Сделайте короткий перерыв (5 минут)',
        'Продолжайте работать, пока задача не будет выполнена.',
        'Каждые 4 периода таймера делайте длинный перерыв (15-20 минут).'
        ];

        for (const element of instructionsText) {
          manualSteps.push(el('li', {
            class: 'manual__item',
            textContent: `${element}`
          }));
        }
        return manualSteps;
    };
    // ! - Инструкция_конец

    
    
    // ? Заполнение списка задач 
    setChildren(tasksList, createTasks());
    // ? - Наполнение обёртки tasks
    setChildren(tasks, [tasksTitle, tasksList, timeRemaning]);

    setChildren(tasksWrapper, [tasks,manual]);

    //? - подключение обёртки в приложение
    mount(this.root, tasksWrapper);

    //? - подключение и наполнение инструкции
    this.bulkMount(manualList, manualElems());
    setChildren(manualDetails, [summary, manualList]);
    mount(manual, manualDetails);
    return tasksList;
  }
  taskControl = ({target}) => {
    const burgerButtons = [...this.tasks.querySelectorAll('.tasks__button')];
    const tasksButtons = [...this.tasks.querySelectorAll('.tasks__text')];
    const tasks = [...this.tasks.querySelectorAll('.tasks__item')];
    const popUps = [...this.tasks.querySelectorAll('.popup')];
    
    if (target.matches('.tasks__button')) {
      burgerButtons.forEach((elem,i) => {
        if (target === elem) {
          if (popUps[i].matches('.popup_active')) {
            popUps.forEach(elem => elem.classList.remove('popup_active'));
          } else {
            popUps.forEach(elem => elem.classList.remove('popup_active'));
            popUps[i].classList.add('popup_active');
          }
        }
      });
      // console.log('tasks: ', tasks);
      // console.log(target.parentElement);
    }
  };
  bindListeners() {
    console.log('Подключаю слушатели', this.tasks);
    this.tasks.addEventListener('click', this.taskControl);
  }
  createTask({importance, text, count, id}) {
    const task = el('li', 
    {
      class: `tasks__item ${importance}`,
      'data-id': `${id}`
    },[
      el('span', {
      class: 'count-number',
      textContent: `${count}`,     
    }),
      el('button',{
        class: 'tasks__text tasks__text_active',
        textContent: `${text}`
      }),
      el('button', {
        class: 'tasks__button',
      }),
      el('div', {
        class: 'popup',
      }, [
        el('button', {
          class: 'popup__button popup__edit-button',
          textContent: 'Редактировать', 
        }),
        el('button', {
          class: 'popup__button popup__delete-button',
          textContent: 'Удалить', 
        })
      ])
    ]);

    return task;
  }
  bulkMount(parent, arr) {
    for (const element of arr) {
      mount(parent, element);
    }
  }
}
