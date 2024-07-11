//totalmonth.js
import React, { useState, useEffect } from "react";
import { usefetch } from "./common/api"; // Assuming `usefetch` fetches customer data
import log from 'loglevel';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

const CustomerTotalMonth = () => {
  const [dataSet, setDataSet] = useState([]);
  const [formattedDataSet, setFormattedDataSet] = useState([]);
  const [allMonths, setAllMonths] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await usefetch();
       // log.warn(' %c Data fetch Successfully !....', 'color:green; font-size:14px'); // Success logger
        setDataSet(result);
        toast.success("Fetching Customer Data Successfully!", {
          position: "top-right",
          autoClose: 10000, // Close after 10 seconds
        }); // Display toast success message
      } catch (error) {
        log.error('Custom hook Data fetch error!....'); // Logger error
        toast.error("Error Fetching Customer Data!", {
          position: "top-right",
          autoClose: 10000, // Close after 10 seconds
        }); // Display toast error message
       // console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const allMonths = dataSet.reduce((months, customer) => {
      const uniqueMonths = new Set([...months, ...customer.transactions.map(transaction => new Date(transaction.date).toLocaleString('en-US', { month: 'long' }))]);
      return [...uniqueMonths]; // Convert Set back to an array
    }, []);
    formatData(allMonths)
  },[dataSet])

  const formatData = (allMonths) => {
    const newData = dataSet.map((customerRow) => {
      const { transactions = [] , customer} = customerRow;
      const customerData = {}
      let monthlyTotals = calculateMonthlyTotals(transactions);
      const months = Object.keys(monthlyTotals)
      const totalAmount = Object.values(monthlyTotals).reduce((sum, amount) => sum + amount, 0);
      customerData['customer'] = customer
      customerData['totalAmount'] = totalAmount
      const diffMonth = allMonths.filter(month => !months.includes(month))
      if(diffMonth.length) {
        const diffMonthObj = diffMonth.reduce((newObj,month) => {
          newObj[month] = 0
          return newObj
        }, {})
        monthlyTotals = {...monthlyTotals, ...diffMonthObj}
      }
      
      customerData['newMonthlyTotals'] = sortObject(monthlyTotals)
      
      // console.log('customerData---',customerData);
      return customerData
    })
    setAllMonths(allMonths)
    setFormattedDataSet(newData)
  }

  function sortObject(obj) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const sortedObj =  Object.keys(obj).sort((a,b)=> monthNames.indexOf(a)-monthNames.indexOf(b)).reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
    let td = []
    Object.values(sortedObj).forEach((value, index) => {
        td.push( <td key={index}>{value}</td>)
    });
    return td
}

  // Calculate the monthly total amount function
  const calculateMonthlyTotals = (transactions) => {
    return transactions.reduce((monthlyTotals, transaction) => {
      if (!transaction.amount) return monthlyTotals; // Skip transactions with missing amount
  
      const month = new Date(transaction.date).toLocaleString('en-US', { month: 'long' });
      monthlyTotals[month] = (monthlyTotals[month] || 0) + transaction.amount; // Initialize if needed
  
      return monthlyTotals;
    }, {}); // Initial accumulator (empty object)
  };
  

  const displayCustomers = () => {
    
    if (formattedDataSet.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <table className="table table-bordered table-striped table-responsive">
        <thead>
          <tr>
            <th>Username</th>
            {allMonths.map((month, index) => (
              <th key={index}>{month}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {formattedDataSet.map((row) => {
            const { customer, totalAmount, newMonthlyTotals } = row;
            
            if (!customer) return null;
            const key = customer?.id || Math.random().toString(36).substring(2, 15); 
            return (
              <tr key={key}>
                <td>{customer}</td>
                {newMonthlyTotals}
                <td>{totalAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="row">
      <h3>Monthly Total Amount</h3>
      <ToastContainer />
      {displayCustomers()}
    </div>
  );
};

export default CustomerTotalMonth;
