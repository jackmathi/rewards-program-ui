import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
    return (
    
<nav className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container-fluid">
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       {/* Navigation link to the Customer List page */}
      <li className="nav-item"> <Link className="navbar-brand mb-0 h1" to="/">Customer List</Link>
      </li>
      {/* Navigation link to the Customer Reward Points page */}
      <li className="nav-item"><Link className="navbar-brand mb-0 h1" to="/rewardreport">Customer Reward Points</Link></li>
       {/* Navigation link to the Customer Total Amount page */}
      <li className="nav-item"><Link className="navbar-brand mb-0 h1" to="/totalamout">Customer total Amount</Link>
      </li>
    </ul>
    </div>
    </div>
    </nav>
      
    );
  };
  
  export default Header;