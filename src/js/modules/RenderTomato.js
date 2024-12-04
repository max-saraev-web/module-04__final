import { el, mount, setChildren } from "redom";
import { ControllerTomato } from "./ControllerTomato";
import createDelModal from "./create/createDelModal";
import createEditModal from "./create/createEditModal";

export class RenderTomato {
  constructor(params,root) {
    this.controller = new ControllerTomato(params);
    this.root = document.querySelector(root);
    this.bindUpdaters();
    this.form = this.renderForm(this.controller.handleTaskState(params));
    this.tasks = this.renderTasks(this.controller.pullTasks());
    this.modalDel = createDelModal();
    this.modalEdit = createEditModal();
    this.inputDelay;
    this.impCount = 0;
    this.deleteId = null;
    this.editId = null;
    this.params = params;
  }
  renderInit() {
    this.updateRoot('');
    mount(this.root, this.form.pomodoroForm);
    mount(this.root, this.tasks.tasksWrapper);
    this.bindListeners();
  }
  bindUpdaters() {
    this.controller.handleSubscribe('tasksList', this.updateTasksList.bind(this));
    this.controller.handleSubscribe('mode', this.updateCount.bind(this));
    this.controller.handleSubscribe('timer', this.updateTime.bind(this));
    this.controller.handleSubscribe('title', this.updatePanelTitle.bind(this));
    this.controller.handleSubscribe('stopBtn', this.toggleStopBtn.bind(this));
    this.controller.handleSubscribe('counter', this.updateActiveCountItem.bind(this));
    this.controller.handleSubscribe('saveCount', this.saveActiveTaskCount.bind(this));
  }
  renderForm({taskTitle, mode, modeTime}) {
    const pomodoroForm = el('div', {
      class: 'pomodoro-form window',
    });

    //! - Шапка
    const tomatoHeader = this.createPanel(taskTitle, mode);
    const {windowPanel, panelTitle, countBlock: count} = tomatoHeader;
    //! - Шапка

    // ! - Окно с таймером и кнопками
    const windowBody = el('div', {
      class: 'window__body'
    });
    const timerText = el('p', {
      class: 'window__timer-text',
      textContent: `${modeTime}`,
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

    // ? НИЖЕ: форма добавления задачи
    setChildren(taskForm, [formInput, importanceBtn, submitBtn]);

    // ? НИЖЕ: окно с таймером и кнопками
    setChildren(windowButtons, [startBtn, stopBtn]);
    setChildren(windowBody, [timerText, windowButtons]);

    // ? - НИЖЕ: большое окно с таймером и активной задачей
    setChildren(pomodoroForm, [windowPanel, windowBody, taskForm]);

    // * 
    return { 
      pomodoroForm,
      panelTitle,
      count,
      timerText,
      startBtn,
      stopBtn,
      formInput,
      importanceBtn,
      submitBtn,
      taskForm,
      };
  }
  renderTasks(tasksArr) {
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
    setChildren(tasksList, this.createTasks(tasksArr));
    // ? - Наполнение обёртки tasks
    setChildren(tasks, [tasksTitle, tasksList, timeRemaning]);

    setChildren(tasksWrapper, [tasks,manual]);

    //? - подключение и наполнение инструкции
    this.bulkMount(manualList, manualElems());
    setChildren(manualDetails, [summary, manualList]);
    mount(manual, manualDetails);
    return {tasksWrapper, tasks, tasksList};
  }
  taskControl = ({target}) => {
    const burgerButtons = [...this.tasks.tasks.querySelectorAll('.tasks__button')];
    const tasksButtons = [...this.tasks.tasks.querySelectorAll('.tasks__text')];
    const tasks = [...this.tasks.tasks.querySelectorAll('.tasks__item')];
    const popUps = [...this.tasks.tasks.querySelectorAll('.popup')];
    
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
    }

    if (target.matches('.tasks__text')) {
      let taskId;
      tasksButtons.forEach((elem, i) => {
        if (target === elem) {
          tasksButtons.forEach(elem => elem.classList.remove('tasks__text_active'));
          tasksButtons[i].classList.add('tasks__text_active');
          taskId = tasks[i].dataset.id;
        }
      });
    const taskObj = this.controller.handleActiveTask(taskId);
    const{taskTitle,modeTime, mode} = taskObj.taskState(this.params);

    this.updatePanelTitle(taskTitle);
    this.updateCount(mode);
    this.updateTime(modeTime);
    }
    if (target.matches('.popup__edit-button')) {
      this.editId = target.parentElement.parentElement.dataset.id;
      console.log('Хочу поменять задачу', this.editId);
      this.openEditModal();
      this.editTaskName(`Редактирование задачи: <br>${this.controller.handleGetTaskNameById(this.editId)}`);
    }
    if (target.matches('.popup__delete-button')) {
      this.deleteId = target.parentElement.parentElement.dataset.id;
      this.openDelModal();
      this.modalTaskName(`Удалить задачу: <br>${this.controller.handleGetTaskNameById(this.deleteId)}?`);
    }
  };
  startTimer(){
    this.toggleStopBtn();
    this.controller.handleTimer();
  }
  stopTimer = () => {
    this.toggleStopBtn();
    this.controller.handleStop();
  }
  chooseImportance = ({target}) => {
    const imp = ['default', 'important', 'medium'];
    console.log(this.impCount);
    this.impCount += 1;
        if (this.impCount >= imp.length) {
          this.impCount = 0;
        }

        for (let i = 0; i < imp.length; i++) {
          if (this.impCount === i) {
            target.classList.add(imp[i]);
          } else {
            target.classList.remove(imp[i]);
          }
        }
  }
  formValidity = ({target}) => {
      clearTimeout(this.inputDelay);
      this.inputDelay = setTimeout(() => {
        console.log(target.value);
        console.log(target.parentElement);
      },1500);
  }
  readyToSubmit(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      console.log("Введите валидные данные для создания новой задачи");
    }
  }
  formSubmit = (ev) => {
    ev.preventDefault();
    const target = ev.target;
    console.log('target: ', target.elements);
    const impBtn = target.querySelector('.button-importance');
    const obj = Object.fromEntries(new FormData(target))['task-name'];
    const params = {
      text: obj,
    }
    const importance = ([...impBtn.classList].filter(elem => {
      return elem === 'default' || elem === 'important' || elem === 'medium';
    }))[0];

    const taskToAdd = this.controller.handleSetupNewTask(importance, params);

    mount(this.tasks.tasksList, this.createTask(taskToAdd));
    this.controller.handleAddTask(taskToAdd);
    target.reset();

    const { count, text }  = this.controller.receiveActiveTask();
    this.form.panelTitle.textContent = text;
    this.updateCount(count);

  }
  bindListeners() {
    this.tasks.tasks.addEventListener('click', this.taskControl);

    const{startBtn, formInput, importanceBtn, taskForm, stopBtn} = this.form;
    const {modalDelOverlay} = this.modalDel;
    const {editOverlay, cancelBtn, modalEditForm} = this.modalEdit;

    startBtn.addEventListener('click', () => this.startTimer());
    stopBtn.addEventListener('click', this.stopTimer)

    formInput.addEventListener('input', this.formValidity);
    formInput.addEventListener('keydown', this.readyToSubmit)
    taskForm.addEventListener('submit', this.formSubmit)
    importanceBtn.addEventListener('click', this.chooseImportance);

    modalDelOverlay.addEventListener('click', ({target}) => {
      if (target.matches('.modal-delete__close-button') ||  target.matches('.modal-delete__cancel-button')) {
        this.closeDelModal();
      }
      if (target.matches('.modal-delete__delete-button')) {
        this.controller.handleDeleteTaskByID(this.deleteId);
        this.closeDelModal();
        this.updateTasksList('');
        setChildren(this.tasks.tasksList, this.createTasks(this.controller.pullTasks()));
        const {taskTitle,modeTime, mode} = this.controller.handleTaskState(this.params);
        this.updatePanelTitle(taskTitle);
        this.updateCount(mode);
        this.updateTime(modeTime);
      }
    });
    editOverlay.addEventListener('click', ({target}) => {
      if (target.matches('.modal-edit__close-button') || target === cancelBtn) {
        this.closeEditModal();
      }
    });
    modalEditForm.addEventListener('submit', ev => {
      ev.preventDefault();
      const target = ev.target;
      const data = Object.fromEntries(new FormData(target));
      const newParams = {
        importance: data.taskImportance,
        text: data.text,
      };
      this.controller.handleEditTaskById(this.editId, newParams);
      this.updateTasksList('');
      this.generateNewTasksList(this.controller.pullTasks());
      this.closeEditModal();
    })
  }
  createTask({importance, text, count, id, isActive}) {
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
        class: `tasks__text${isActive ? ' tasks__text_active' : ''}`,
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
  createPanel(taskTitle, mode) {
    const windowPanel = el('div', {
      class: 'window__panel',
    })
    const panelTitle = el('p',
    {
      class: 'window__panel-title',
      textContent: `${taskTitle}`
    });
    const countBlock = el('p', {
      class: 'window__panel-task-text',
      textContent: `${mode}`,
    });
    setChildren(windowPanel, [panelTitle, countBlock]);
    return {windowPanel, panelTitle, countBlock};
  }
  bulkMount(parent, arr) {
    for (const element of arr) {
      mount(parent, element);
    }
  }
  updateCount(newCount) {
    this.form.count.textContent = newCount;
  }
  updatePanelTitle(title) {
    this.form.panelTitle.textContent = title;
  }
  updateTime(timeVal) {
    this.form.timerText.textContent = timeVal;
  }
  updateTasksList(content) {
    this.tasks.tasksList.textContent = content;
  }
  updateRoot(content) {
    this.root.textContent = content;
  }
  toggleStopBtn() {
    this.form.stopBtn.classList.toggle('hidden');
  }
  // ? - в работе
  openDelModal() {
    mount(this.root, this.modalDel.modalDelOverlay);
    this.modalDel.modalDelOverlay.style.display = 'block';
  }
  closeDelModal() {
    this.modalDel.modalDelOverlay.style.display = 'none';
    this.deleteId = null;
  }
  modalTaskName(title) {
    this.modalDel.title.innerHTML = title;
  }
  createTasks(arr) {
    const createdTasks = [];
    for (const element of arr) {
      createdTasks.push(this.createTask(element));
    }
    return createdTasks;
  };
  openEditModal() {
    mount(this.root, this.modalEdit.editOverlay);
    this.modalEdit.editOverlay.style.display = 'block';
  }
  closeEditModal() {
    this.modalEdit.modalEditForm.reset();
    this.modalEdit.editOverlay.style.display = 'none';
    this.editId = null;
  }
  editTaskName(title) {
    this.modalEdit.editText.innerHTML = title;
  }
  updateActiveCountItem(count) {
    const docElem = [...this.tasks.tasksList.querySelectorAll('.tasks__item')];
    docElem.forEach(elem => {
      if (elem.querySelector('.tasks__text_active')) elem.querySelector('.count-number').textContent = count;
    });
  }
  generateNewTasksList(arr) {
    setChildren(this.tasks.tasksList, this.createTasks(arr));
  }
  saveActiveTaskCount(count) {
    this.controller.handleSaveActiveTaskCount(count);
  }
}
