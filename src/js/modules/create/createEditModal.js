import { el, setChildren } from "redom";

const createEditModal = () => {
  const editOverlay = el('div', {
    class: 'modal-overlay'
  });

  const modalEdit = el('div', {
    class: 'modal-edit'
  });
  const editText = el('p', {
    class: 'modal-edit__title',
    textContent: 'Редактировать задачу:'
  });
  const closeBtn = el('button', {
    class: 'modal-edit__close-button'
  })

  const modalEditForm = el('form', {
    class: 'modal-edit__form',
    action: 'submit',
    autocomplete: 'off'
  });

  const titleInputGroup = el('div', {
    class: 'modal-edit__input-group'
  });
  const titleInput = el('input', {
    class: 'modal-edit__title-input',
    name: 'text',
    autocomplete: 'off',
  })
  const titleLabel = el('span', {
    class: 'modal-edit__subtitle',
    textContent: 'Введите новое название задачи'
  })


  const radioInputGroup = el('div', {
    class: 'modal-edit__input-group'
  });

  const defaultOption = el('label',{
    class: 'modal-edit__radio-elem',
  }, [el('input', {
    required: 'true',
    name: 'taskImportance',
    type: 'radio',
    value: 'default'
    }), el('span', {
      class: 'modal-edit__checkbox'
    }), el('span', {
      class: 'modal-edit__text',
      textContent: 'Задача обычной важности'
    })]); 
  const importantOption = el('label',{
    class: 'modal-edit__radio-elem',
  }, [el('input', {
    required: 'true',
    name: 'taskImportance',
    type: 'radio',
    value: 'important'
    }), el('span', {
      class: 'modal-edit__checkbox'
    }), el('span', {
      class: 'modal-edit__text',
      textContent: 'Задача повышенной важности'
    })]); 
  const mediumOption = el('label',{
    class: 'modal-edit__radio-elem',
  }, [el('input', {
    required: 'true',
    name: 'taskImportance',
    type: 'radio',
    value: 'medium'
    }), el('span', {
      class: 'modal-edit__checkbox'
    }), el('span', {
      class: 'modal-edit__text',
      textContent: 'Задача средней важности'
    })]); 

  const editSubmit = el('button', {
    type: 'submit',
    class: 'modal-edit__submit-btn button button-primary',
    textContent: 'Принять изменения'
  })

  const cancelBtn = el('button', {
    class: 'modal-edit__cancel-btn button button-secondary',
    textContent: 'Отмена'
  })


  setChildren(radioInputGroup, [defaultOption, importantOption, mediumOption]);
  setChildren(titleInputGroup, [titleLabel, titleInput]);
  setChildren(modalEditForm, [titleInputGroup, radioInputGroup, editSubmit, cancelBtn]);

  setChildren(modalEdit, [editText, closeBtn, modalEditForm]);
  setChildren(editOverlay, modalEdit);

  return {editOverlay, editText, editSubmit, cancelBtn, modalEditForm};
}

export default createEditModal;
