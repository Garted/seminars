import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ISeminar, ISeminarSlice } from '../../types';

//слайс для семинаров и состояния

const initialState: ISeminarSlice = {
  isLoading: false,
  errorMessage: '',
  seminarsList: [],
};

//асинхронная функция для получения данных, результат попадет в extraReducers
export const fetchData = createAsyncThunk(
  'seminars/fetchData',

  async (url: string, thunkAPI) => {
    try {
      const res = await fetch(url);
      //Если сервер возвращает ошибку, то я выбрасываю ошибку, которая попадает в catch
      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
      }
      //преобразую json формат в javaScript
      const data = await res.json();
      return data;
    } catch (error) {
      //для того чтобы корректно отобразить ошибку использую thunkAPI при возврате результата данные попадут в action и сообщение ошибки можно записать в errorMessage
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : 'Неизвестная ошибка'
      );
    }
  }
);

const seminarsSlice = createSlice({
  name: 'seminars',
  initialState,

  reducers: {
    //экшн для удаления одного семинара по id
    deleteSeminar: (state, action: PayloadAction<number | null>) => {
      return {
        ...state,
        seminarsList: state.seminarsList.filter(
          (item: ISeminar) => item.id !== action.payload
        ),
      };
    },
    //изменение одного семинара по id, изменяем поля которые приходят как аргумент
    changeSeminar: (
      state,
      action: PayloadAction<{
        id: number | null;
        seminar: ISeminar;
      }>
    ) => {
      return {
        ...state,
        seminarsList: state.seminarsList.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                title: action.payload.seminar.title,
                description: action.payload.seminar.description,
                time: action.payload.seminar.time,
                date: action.payload.seminar.date,
              }
            : item
        ),
      };
    },
  },
  //обработка состояния запроса
  extraReducers: (builder) => {
    //запрос на сервер отправлнен, но ответа пока нет
    builder.addCase(fetchData.pending, (state) => {
      return { ...state, isLoading: true };
    });
    //сервер ответил положительно, я сохраняю данные в стор
    builder.addCase(
      fetchData.fulfilled,
      (state, action: PayloadAction<ISeminar[]>) => {
        return { ...state, isLoading: false, seminarsList: action.payload };
      }
    );
    //сервер ответил отрицательно, я обрабатываю ошибку и сохраняю ее стор
    builder.addCase(fetchData.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload as string,
      };
    });
  },
});

//экспорт actions
export const { deleteSeminar, changeSeminar } = seminarsSlice.actions;
//экспорт reducer для store
export default seminarsSlice.reducer;
