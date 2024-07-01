import './App.css';
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import CustomerRewards from './Components/CustomerRewards';
import RewardsReport from './Components/RewardsReport';

function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
   
  return (
    <>
    <div className='container'>
      <Header></Header>
      <RewardsReport />
      <CustomerRewards></CustomerRewards>
    </div>
    </>
  );
}

export default App;
