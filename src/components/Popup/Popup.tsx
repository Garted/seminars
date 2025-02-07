import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/slices/modalSlices';
import { AppDispatch, RootState } from '../../store/store';
import style from './popup.module.css';
import DeleteModal from '../modals/DeleteModal';
import EditModal from '../modals/EditModal';

function Popup() {
  //Компонент для создания показа модальных окон
  const dispatch = useDispatch<AppDispatch>();
  //Из стора достаем данные
  //isOpen - если будет true то будем отображаться модальное окно
  //deleteModal если true то отображаем модальное окно для deleteModal, если нет то будет отображаться для редактирования
  //id для отслеживания на каком элементе было вызвано модальное окно, чтобы передать этот id в модальное окно, чтобы отрисовать с данными соответствующими данными этому id
  const { isOpen, deleteModal, id } = useSelector(
    (store: RootState) => store.modal
  );
  useEffect(() => {
    if (isOpen) {
      //задаю инлайн стили для body, чтобы скрыть полосу прокрутки и сделать отступ справа, чтобы при вызове модального окна не было видно смещения контента за модальным окном
      const hasScrollbar =
        window.innerWidth > document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = hasScrollbar ? '17px' : '0';
    } else {
      //при закрытие модального окна возвращаю назад
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    }
  }, [isOpen]);

  return isOpen ? (
    <div
      onClick={(e) => {
        //сравниваю что клик произведен именно на текущий элемент и не задевает вложенные элементы(чтобы событие не срабатывало при кликах на вложенных элементах)
        if (e.target === e.currentTarget) dispatch(closeModal());
      }}
      className={style.popup}
    >
      {' '}
      {/*Отображаем модальное окно DeleteModal если deleteModal=true, если нет то отображаем модальное окно EditModal */}
      {deleteModal ? <DeleteModal id={id} /> : <EditModal id={id} />}
    </div>
  ) : null;
}

export default Popup;
