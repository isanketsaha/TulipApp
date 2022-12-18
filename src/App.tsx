import { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import './App.scss'

const App = () => {
  let navigate = useNavigate();
  useEffect(() => {
    return navigate("\home");
  },[]);



  return (
    <></>
  );

};

export default App
