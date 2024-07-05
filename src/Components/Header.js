import { BrowserRouter, RouterProvider, Route, Link, Routes } from 'react-router-dom';
import CustomerRewards from './CustomerRewards';
import RewardsReport from './RewardsReport';
import CustomertotalMonth from './TotalAmount';
const Header = () => {
    return (
      <BrowserRouter>
      <div class="container">
      <div class="row">
<nav className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container-fluid">
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item"> <Link className="navbar-brand mb-0 h1" to="/">Customer List</Link>
      </li>
      <li className="nav-item"><Link className="navbar-brand mb-0 h1" to="/rewardreport">Customer Reward Points</Link></li>
      <li className="nav-item"><Link className="navbar-brand mb-0 h1" to="/totalamout">Customer total Amount</Link>
      </li>
    </ul>
    </div>
    </div>
    </nav>
    <div className="mainBody">
    <Routes>
        <Route path="/" element={ <CustomerRewards/> } />
        <Route path="rewardreport" element={ <RewardsReport/> } />
        <Route path="totalamout" element={ <CustomertotalMonth/> } />
      </Routes>
</div>
</div>
</div>
</BrowserRouter>
      
    )
  }
  
  export default Header;