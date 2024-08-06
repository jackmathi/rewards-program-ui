import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import CustomerRewards from "./Components/CustomerRewards";
import RewardsReport from "./Components/RewardsReport";
import CustomerTotalMonth from "./Components/TotalAmount";

function App() {
  return (
    <>
      <div className="container-fluid">
        <BrowserRouter>
          <div className="container">
            <div className="row">
               {/* Header component */}
              <Header />
              <div className="mainBody">
                <Routes>
                   {/* Route for Customer Rewards page */}
                  <Route path="/" element={<CustomerRewards />} />
                    {/* Route for Rewards Report page */}
                  <Route path="rewardreport" element={<RewardsReport />} />
                     {/* Route for Customer Total Amount page */}
                  <Route path="totalamout" element={<CustomerTotalMonth />} />
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
