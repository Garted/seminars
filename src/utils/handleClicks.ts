import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import { AppDispatch } from '../store/store';
import { deleteRequest, updateRequest } from './request';
import { IModal, ISeminar } from '../types';

//функция на показ модального окна при нажатии кнопки Delete
export function deleteButton(
  dispatch: AppDispatch,
  action: ActionCreatorWithPayload<IModal, 'modal/setModal'>,
  id: number | null
) {
  return () => {
    dispatch(
      action({
        isOpen: true,
        deleteModal: true,
        editModal: false,
        id: id,
      })
    );
  };
}
//функция на показ модального окна при нажатии кнопки Edit
export function editButton(
  dispatch: AppDispatch,
  action: ActionCreatorWithPayload<IModal, 'modal/setModal'>,
  id: number | null
) {
  return () => {
    dispatch(
      action({
        isOpen: true,
        deleteModal: false,
        editModal: true,
        id: id,
      })
    );
  };
}

//функция на удаление данных из ReduxStore, запрос на удаление на сервер, закрытие модального окна (срабатывает при нажатии на кнопку ДА в мональном окне DeleteModal)
export function confirmDelete(
  dispatch: AppDispatch,
  actionDeleteFromStore: ActionCreatorWithPayload<
    number | null,
    'seminars/deleteSeminar'
  >,
  actionCloseModal: ActionCreatorWithoutPayload,
  id: number | null
) {
  return async () => {
    try {
      await deleteRequest(`http://localhost:5000/seminars/${id}`);
      dispatch(actionCloseModal());
      if (id !== null) {
        dispatch(actionDeleteFromStore(id));
      }
    } catch (e) {
      console.log(e);
    }
  };
}

//функция на закрытие модального окна (срабатывает при кликах на кнопку НЕТ в модальных окнах DeleteModal, EditModal и Popup)
export function declineModal(
  dispatch: AppDispatch,
  actionCloseModal: ActionCreatorWithoutPayload
) {
  return () => {
    dispatch(actionCloseModal());
  };
}
//функция сохраняет изменения в ReduxStore и отправляет запрос на изменение данных на сервер, также закрывает модальное окно
export function saveChanges(
  dispatch: AppDispatch,
  actionChangeSeminar: ActionCreatorWithPayload<
    { id: number | null; seminar: ISeminar },
    'seminars/changeSeminar'
  >,
  actionCloseModal: ActionCreatorWithoutPayload,
  seminar: ISeminar,
  id: number | null
) {
  return async () => {
    try {
      await updateRequest(`http://localhost:5000/seminars/${id}`, seminar);
      dispatch(
        actionChangeSeminar({
          id,
          seminar,
        })
      );
      dispatch(actionCloseModal());
    } catch (e) {
      console.log(e);
    }
  };
}
