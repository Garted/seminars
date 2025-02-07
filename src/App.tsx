import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from './store/slices/seminarsSlice';
import { AppDispatch } from './store/store';
import SeminarsWrap from './components/SeminarsWrap/SeminarsWrap';
import Popup from './components/Popup/Popup';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  //Использование useEffect для загрузки данных с сервера в reduxStore
  useEffect(() => {
    dispatch(fetchData('http://localhost:5000/seminars'));
    console.log('render App');
  }, [dispatch]);
  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Seminars</h1>
      <SeminarsWrap />
      <Popup />
    </>
  );
}

export default App;
