import React, { useState, useEffect } from "react";
import { usefetch } from "./common/api";
// import { useParams } from 'react-router-dom';
import log from 'loglevel';

const CustomerRewards = () => {
  const [dataSet, setDataSet] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await usefetch(); // Assuming usefetch fetches customer data
        log.warn(' %c Data fetch Successfully !....', 'color:green; font-size:14px'); // Success logger
        setDataSet(result);
        // Set the first customer as selected initially
        if (result.length > 0) {
          setSelectedCustomer(result[0].id);
        }
      } catch (error) {
        log.error('Custom hook Data fetch error!....'); // Logger error
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Calculate the Total amount & points function
  const calculateTotals = (transactions) => {
    let points = 0;
    let totalAmount = 0;
    let totalPoints = 0;

    transactions.forEach((transaction) => {
      totalAmount += transaction.amount;

      if (transaction.amount >= 50 && transaction.amount < 100) {
        transaction.points = transaction.amount - 50;
      } else if (transaction.amount > 100) {
        transaction.points = (((transaction.amount - 100) * 2) + 50);
      } else {
        transaction.points = 0;
      }

      totalPoints += transaction.points;
    });

    return { points, totalAmount, totalPoints };
  };

  // Handle customer list side tab click event
  const handleCustomerClick = (customerId) => {
    setSelectedCustomer(customerId);
  };

  // Display customer detail based on selected customer
  const displayCustomerDetail = () => {
    const selectedCustomerData = dataSet.find(customer => customer.id === selectedCustomer);
    if (!selectedCustomerData) {
      return <h2>Please select a customer.</h2>;
    }

    const { transactions = [] } = selectedCustomerData;
    const { points = 0, totalAmount = 0, totalPoints = 0 } = calculateTotals(transactions);

    return (
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-responsive">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Earned Points</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transId}>
                <td>{transaction.transId}</td>
                <td>{transaction.date}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.points}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Totals:</th>
              <th></th>
              <td>${totalAmount}</td>
              <td>{totalPoints}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  return (
    <div className="row">
      <h3>Customers List</h3>
      <div className="col-4 list-group">
        {dataSet.map((customer) => (
          <a
            key={customer.id}
            href="#"
            className={`list-group-item list-group-item-action ${selectedCustomer === customer.id ? "active" : ""}`}
            onClick={() => handleCustomerClick(customer.id)}
          >
            {customer.customer}
          </a>
        ))}
      </div>
      <div className="col-8">
        {displayCustomerDetail()}
      </div>
    </div>
  );
};

export default CustomerRewards;
