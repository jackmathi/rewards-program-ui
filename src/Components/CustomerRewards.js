import React, { useState, useEffect } from "react";
import { usefetch } from "../Service/api";
import log from "loglevel";
import { toast, ToastContainer } from "react-toastify";

const CustomerRewards = () => {
    // State hooks for various data and status
  const [dataSet, setDataSet] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from the mock file
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true before fetching
      setError(null); // Clear any previous errors
      try {
        const result = await usefetch(); // Assuming usefetch fetches customer data
        log.info(
          " %c Data fetch Successfully !....",
          "color:green; font-size:14px"
        ); // Success logger
        setDataSet(result);
        toast.success("Fetching Customer Data Successfully!", {
          position: "top-right",
          autoClose: 5000, // Close after 5 seconds
        }); // Display toast Success message
        // Set the first customer as selected initially
        if (result.length > 0) {
          setSelectedCustomer(result[0].id);
        }
      } catch (error) {
        setError(error); // Set error state
        toast.error("Error Fetching Customer Data!", {
          position: "top-right",
          autoClose: 5000, // Close after 5 seconds
        }); // Display toast error message
        log.error("Error Fetching Customer Data!...."); // Logger error
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="loader">Loading...</div>; // Display loading message while fetching data
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message if fetch fails
  }
  // Calculate the Total amount & points function
  const calculateTotals = (transactions) => {
    return transactions.reduce(
      (acc, transaction) => {
        
        acc.totalAmount += Math.round(transaction.amount);
        transaction.points =
          transaction.amount >= 50 && transaction.amount < 100
            ? transaction.amount - 50
            : transaction.amount >= 100
            ? (transaction.amount - 100) * 2 + 50
            : 0;

        acc.totalPoints += Math.round(transaction.points); 

        return acc; // Return the accumulator for the next iteration
      },
      {
        // Initial accumulator (optional)
        totalAmount: 0,
        totalPoints: 0,
      }
    );
  };

  // Handle customer list side tab click event
  const handleCustomerClick = (customerId) => {
    setSelectedCustomer(customerId);
  };

  // Display customer detail based on selected customer
  const displayCustomerDetail = () => {
    const selectedCustomerData = dataSet.find(
      (customer) => customer.id === selectedCustomer
    );
    const { transactions = [] } = selectedCustomerData;
    const { totalAmount = 0, totalPoints = 0 } = calculateTotals(transactions);

    return (
      <div className="table-responsive">
         <h4 className="custome-name">Name: {selectedCustomerData.customer}</h4> {/* Display customer name above table */}
         <hr></hr>
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
                <td>${Math.round(transaction.amount)}</td>
                <td>{Math.round(transaction.points)}</td>
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
            href={"#"}
            key={customer.id}
            className={`list-group-item list-group-item-action ${
              selectedCustomer === customer.id ? "active" : ""
            }`}
            onClick={() => handleCustomerClick(customer.id)}
          >
            {customer.customer}
          </a>
        ))}
      </div>
      <div className="col-8">
        <ToastContainer />
        {displayCustomerDetail()}
      </div>
    </div>
  );
};

export default CustomerRewards;