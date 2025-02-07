import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModal } from '../../types';

//Стор для отслеживания модальных окон

//Начальное состояние
//Можно было сделать 1 поле и привязать true для deleteModal и false для editModal и передавать только 1 поле вместо deleteModal: action.payload.deleteModal,editModal: action.payload.editModal,
const initialState: IModal = {
  isOpen: false,
  deleteModal: false,
  editModal: false,
  id: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    //при вызове action перезаписываю в него данные из action(аргументы которые попадут в setModal)
    setModal: (state, action: PayloadAction<IModal>) => {
      return {
        ...state,
        isOpen: action.payload.isOpen,
        deleteModal: action.payload.deleteModal,
        editModal: action.payload.editModal,
        id: action.payload.id,
      };
    },
    //при вызове этого экшна уставаливаем значения в дефолт, закроет любое модальное окно
    closeModal: () => {
      return initialState;
    },
  },
});
//экспорт actions для вызова
export const { setModal, closeModal } = modalSlice.actions;
//экспорт reducer для создания store
export default modalSlice.reducer;
