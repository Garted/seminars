import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import SingleSeminar from './SingleSeminar/SingleSeminar';
import style from './seminarWrap.module.css';

function SeminarsWrap() {
  //Компонент обертка для элементов
  //данные из стора:
  //-seminarsList - массив данных для орисовки, когда сервер
  //-isLoading - состояние когда запрос на сервер ушел, но ответа пока не дал
  //-errorMessage - сообщение, когда сервер ответил ошибкой
  const { seminarsList, isLoading, errorMessage } = useSelector(
    (store: RootState) => store.seminars
  );
  return (
    <div className={style.seminarsWrap}>
      {/*исходя из полученных данных формирую страницу:
      если статус загрузки есть, то отображается элемент с загрузкой,
      если массив загруженных данных не пуст, то изменяю каждый элемент массива на кусок верстки,
      если есть ошибка, то отображается сообщение об ошибке*/}
      {isLoading ? (
        <div>Loading...</div>
      ) : seminarsList.length > 0 ? (
        seminarsList.map((item, index) => {
          return <SingleSeminar key={index} seminar={item}></SingleSeminar>;
        })
      ) : (
        <div>{errorMessage}</div>
      )}
    </div>
  );
}

export default SeminarsWrap;
