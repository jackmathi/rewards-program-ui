import './App.css';
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, RouterProvider, Route, Link, Routes } from 'react-router-dom';
import Header from './Components/Header';
import CustomerRewards from './Components/CustomerRewards';
import RewardsReport from './Components/RewardsReport';
import CustomerTotalMonth from './Components/TotalAmount';



function App() {
  useEffect(() => {

    window.process = {
      ...window.process,
    };
  }, []);
   
  return (
    <>
    <div className="container-fluid">
    <BrowserRouter>
      <div className="container">
      <div className="row">
<Header />
<div className="mainBody">
    <Routes>
        <Route path="/" element={ <CustomerRewards/> } />
        <Route path="rewardreport" element={ <RewardsReport/> } />
        <Route path="totalamout" element={ <CustomerTotalMonth /> } />
      </Routes>
</div>
    </div>
    </div>
</BrowserRouter>
    </div>
    </>
  );
}

export default App;
