import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete, declineModal } from '../../utils/handleClicks';
import { deleteSeminar } from '../../store/slices/seminarsSlice';
import { AppDispatch, RootState } from '../../store/store';
import { closeModal } from '../../store/slices/modalSlices';
import { IModalProp } from '../../types';

import styles from './modal.module.css';
import Button from '../Button/Button';

function DeleteModal({ id }: IModalProp) {
  //модалка подтвержения удаления
  const dispatch = useDispatch<AppDispatch>();
  const [seminarName, setSeminarName] = useState<string | null>(null);

  //достаю имя семинара и сохраняю в useState для дальнейшего использования(при удалении из стейта, у меня не будет ничего про этот семинар, а это имя я могу использовать при показе финального сообщения, о том что вы удалили семинар под именем ${seminarName})
  const name = useSelector(
    (store: RootState) =>
      store.seminars.seminarsList.filter((item) => item.id === id)[0].title
  );
  useEffect(() => {
    setSeminarName(name);
  }, []);

  return (
    <div className={styles.modal}>
      <h3>
        Вы уверены что хотите удалить семинар:<br></br>
        <span className={styles.selectedSeminar}>{seminarName}</span>
      </h3>
      <div className={styles.btnWrap}>
        {/*При нажатии на кнопку удаляем данные из reduxStore + запрос на удаление на сервере и закрываем модальное окно*/}
        <Button
          func={confirmDelete(dispatch, deleteSeminar, closeModal, id)}
          name="ДА"
        ></Button>
        {/*При нажатии на кнопку не удаляются данные, закрывается модальное окно */}
        <Button func={declineModal(dispatch, closeModal)} name="НЕТ"></Button>
      </div>
    </div>
  );
}

export default DeleteModal;
