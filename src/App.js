import './App.css';
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import CustomerRewards from './Components/CustomerRewards';
import RewardsReport from './Components/RewardsReport';
import AmountReport from './Components/TotalAmount';

function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  //  log.warn('App is starting!....')
   
  return (
    <>
    <div className='container'>
      {/* <AmountReport /> */}
      <Header></Header>
      <RewardsReport />
      <CustomerRewards></CustomerRewards>
    </div>
    </>
  );
}

export default App;
