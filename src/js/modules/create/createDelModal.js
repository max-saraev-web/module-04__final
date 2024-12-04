import {el, mount, setChildren} from "redom";

const createDelModal = () => {
  const modalDelOverlay = el('div', {
    class: 'modal-overlay'
  })


  const modalDel = el('div', {
    class: 'modal-delete'
  })
  const title = el('p', {
    class: 'modal-delete__title'
  });
  const closeBtn = el('button', {
    class: 'modal-delete__close-button'
  })
  const delBtn = el('button', {
    class: 'modal-delete__delete-button button-primary',
    textContent: 'Удалить',
  });
  const cancelBtn = el('button', {
    class: 'modal-delete__cancel-button',
    textContent: 'Отмена',
  });


  setChildren(modalDel, [title, closeBtn, delBtn, cancelBtn])

  mount(modalDelOverlay, modalDel);
  
  return {modalDelOverlay, title};
}

export default createDelModal;