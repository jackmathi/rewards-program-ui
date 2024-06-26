import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import CustomerRewards from './Components/CustomerRewards';

function App() {
  return (
    <>
    <div className='container'>
      <Header></Header>
      <CustomerRewards></CustomerRewards>
    </div>
    </>
  );
}

export default App;
