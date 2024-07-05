import React, { useState, useEffect } from "react";
import { usefetch } from "./common/api"; // Assuming `usefetch` fetches customer data
import log from 'loglevel';

const CustomerTotalMonth = () => {
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await usefetch();
        log.warn(' %c Data fetch Successfully !....', 'color:green; font-size:14px'); // Success logger
        setDataSet(result);
      } catch (error) {
        log.error('Custom hook Data fetch error!....'); // Logger error
       // console.error(error);
      }
    };

    fetchData();
  }, []);

  // Calculate the monthly total amount function
  const calculateMonthlyTotals = (transactions) => {
    const monthlyTotals = {};

    transactions.forEach((transaction) => {
      if (!transaction.amount) return; // Skip transactions with missing amount

      const month = new Date(transaction.date).toLocaleString('en-US', { month: 'long' });
      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
      monthlyTotals[month] += transaction.amount;
    });

    return monthlyTotals;
  };

  const displayCustomers = () => {
    if (dataSet.length === 0) {
      return <div>Loading...</div>;
    }

    // Collect all unique months with transactions
    const allMonths = dataSet.reduce((months, customer) => {
      customer.transactions.forEach(transaction => {
        const month = new Date(transaction.date).toLocaleString('en-US', { month: 'long' });
        if (!months.includes(month)) {
          months.push(month);
        }
      });
      return months;
    }, []);

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
          {dataSet.map((customer) => {
            const { transactions = [] } = customer;
            const monthlyTotals = calculateMonthlyTotals(transactions);
            const totalAmount = Object.values(monthlyTotals).reduce((sum, amount) => sum + amount, 0);

            // Only display rows with non-empty usernames
            if (!customer.customer) return null;

            return (
              <tr key={customer.id}>
                <td>{customer.customer}</td>
                {allMonths.map((month, index) => (
                  <td key={index}>{monthlyTotals[month] || 0}</td>
                ))}
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
      {displayCustomers()}
    </div>
  );
};

export default CustomerTotalMonth;
