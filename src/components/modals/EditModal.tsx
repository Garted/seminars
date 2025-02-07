import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { declineModal, saveChanges } from '../../utils/handleClicks';
import { closeModal } from '../../store/slices/modalSlices';
import { changeSeminar } from '../../store/slices/seminarsSlice';
import { IModalProp, ISeminarExclude } from '../../types';

import styles from './modal.module.css';
import Button from '../Button/Button';

function EditModal({ id }: IModalProp) {
  const dispatch = useDispatch<AppDispatch>();
  //состояние измененных данных для инпутов,
  const [newSeminar, setNewSeminar] = useState<ISeminarExclude>({
    title: '',
    description: '',
    time: '',
    date: '',
  });
  //достаем данные одного семинара
  const seminar = useSelector((store: RootState) =>
    store.seminars.seminarsList.find((item) => item.id === id)
  );
  const { title, description, time, date } = seminar || {};
  //устанавливаем значения из имеющихся данных
  useEffect(() => {
    setNewSeminar({
      title: title || '',
      description: description || '',
      time: time || '',
      date: date || '',
    });
  }, []);

  //Функция на создание label для инпутов исходя из переданного аргумента
  function labelTitle(t: string) {
    switch (t) {
      case 'title':
        return 'Название:';
      case 'description':
        return 'Описание:';
      case 'time':
        return 'Время:';
      case 'date':
        return 'Дата:';
    }
  }

  return (
    <div className={`${styles.modal} ${styles.edit}`}>
      <h2>Изменить семинар</h2>
      {Object.entries(newSeminar).map(([key, value]) => {
        return (
          <div className={styles.inputWrapper} key={key}>
            <label className={styles.label} htmlFor={key}>
              {labelTitle(key)}
            </label>
            <input
              className={styles.input}
              //изменяем данные и сохраняем в state
              onChange={(e) => {
                setNewSeminar((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }));
              }}
              type="text"
              value={value}
              placeholder={value}
              id={key}
            />
          </div>
        );
      })}

      <div className={styles.btnWrap}>
        <Button
          //когда нажимаем сохранить перезаписываем данные в reduxStore и закрываем модальное окно
          func={saveChanges(
            dispatch,
            changeSeminar,
            closeModal,
            { ...newSeminar, id },
            id
          )}
          name="Сохранить"
        ></Button>
        <Button
          //когда нажимаем отмена не перезаписываем данные в reduxStore и закрываем модальное окно
          func={declineModal(dispatch, closeModal)}
          name="Отменить"
        ></Button>
      </div>
    </div>
  );
}
export default EditModal;
