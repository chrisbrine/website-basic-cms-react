import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { fetchMainData, fetchUserData, getMainIsLoading } from './store';
import Website from './components';
import Dashboard from './components/dashboard';


function App() {
  const dispatch = useDispatch();
  const loading = useSelector(getMainIsLoading);

  useEffect(() => {
    if (loading) {
      dispatch(fetchMainData() as unknown as AnyAction);
    }
    dispatch(fetchUserData() as unknown as AnyAction);
  }, [loading, dispatch]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/*" element={<Website />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
