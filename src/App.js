import './App.css';
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, RouterProvider, Route, Link, Routes } from 'react-router-dom';
import Header from './Components/Header';
import CustomerRewards from './Components/CustomerRewards';


function App() {
  useEffect(() => {

    window.process = {
      ...window.process,
    };
  }, []);
   
  return (
    <>

    <div class="container-fluid">
    <Header></Header>
    </div>
    </>
  );
}

export default App;
