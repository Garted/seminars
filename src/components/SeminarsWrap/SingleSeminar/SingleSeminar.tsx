import { useDispatch } from 'react-redux';
import { ISingleSeminarProp } from '../../../types';
import { deleteButton, editButton } from '../../../utils/handleClicks';
import { setModal } from '../../../store/slices/modalSlices';
import { AppDispatch } from '../../../store/store';
import style from './singleSeminar.module.css';
import Button from '../../Button/Button';

function SingleSeminar({ seminar }: ISingleSeminarProp) {
  //Создание карточки семинара из данных которые прихоят как пропс
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className={style.seminar}>
      <img className={style.img} src={seminar.photo} alt={seminar.title} />
      <h3 className={style.title}>{seminar.title}</h3>
      <p className={style.description}>{seminar.description}</p>
      <p className={style.start}>
        Start event {seminar.time} {seminar.date}
      </p>
      <div className={style.buttonWrap}>
        {/*компоненты кнопок в которые я отправляю пропсы с именем кнопки и функцией которую она будет вызывать при клике*/}
        <Button
          func={deleteButton(dispatch, setModal, seminar.id)}
          name="Delete"
        ></Button>
        <Button
          func={editButton(dispatch, setModal, seminar.id)}
          name="Edit"
        ></Button>
      </div>
    </div>
  );
}

export default SingleSeminar;
