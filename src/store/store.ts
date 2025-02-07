import { configureStore } from '@reduxjs/toolkit';
import seminarsSlice from './slices/seminarsSlice';
import modalSlices from './slices/modalSlices';

//создание стора из слайсов
const store = configureStore({
  reducer: {
    seminars: seminarsSlice,
    modal: modalSlices,
  },
});
//экспорт типа стора, если типизированы reducers, то он подтянет их типы
export type RootState = ReturnType<typeof store.getState>;
//экспорт типа dispatch понимает, какие экшны к нему могут приходить, в моем случае только экшны их seminarSlice и modalSlice
export type AppDispatch = typeof store.dispatch;
//экспорт стора для передачи как пропс в Provider который оборачивает мое приложение, для того чтобы я мог обращаться к данным стора в любом месте приложения
export default store;
