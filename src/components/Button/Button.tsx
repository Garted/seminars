import { IButtonProp } from '../../types';
import style from './button.module.css';

function Button({ name, func }: IButtonProp) {
  //Компонент кнопки который принимает пропсы имя и функцию на клик
  return (
    <button
      onClick={() => {
        func();
      }}
      className={style.button}
    >
      {name}
    </button>
  );
}

export default Button;
