import React, { useState, useEffect } from "react";
import data from "../Service/CustomerData";
import { calculateMonthlyPoints, calculatePoints, isValidDate } from "./rewards"; // Importing necessary functions
import log from "loglevel"; // Importing logging library
import { toast, ToastContainer } from "react-toastify";

function RewardsReport() {
  const [customerData, setCustomerData] = useState([]); // State to hold customer data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true before fetching
      setError(null); // Clear any previous errors

      try {
        // Simulate asynchronous API call
        const simulatedResponse = await new Promise((resolve) =>
          setTimeout(() => resolve(data), 1000) // Simulate delay
        );

        // Process and update data
        const processedData = simulatedResponse.map((customer) => {
          const {transactions} = customer;
          const validTransactions = transactions.filter(trans => isValidDate(trans.date));
          const monthlyPoints = calculateMonthlyPoints(validTransactions);
          // Extract used month names from monthlyPoints object
          const usedMonths = Object.keys(monthlyPoints);
          return {
            ...customer,
            monthlyPoints,
            totalPoints: Math.round(validTransactions.reduce(
              (acc, transaction) => acc + calculatePoints(transaction.amount),
              0
            )),
            usedMonths, // Add usedMonths property
          };
        });
        setCustomerData(processedData); // Update state with processed data

      } catch (error) {
        toast.error("Error Fetching Customer Data!", {
          position: "top-right",
          autoClose: 10000, // Close after 10 seconds
        }); // Display toast error message
        log.error("Rewards Report fetch error!....", error); // Log error
        setError(error); // Set error state
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchData(); // Fetch data on component mount
    toast.success("Fetching Customer Data Successfully!", {
      position: "top-right",
      autoClose: 10000, // Close after 10 seconds
    });// Display toast Success message
    
  }, []); // Empty dependency array ensures this effect runs only once

  if (isLoading) {
    return <div className="loader">Loading...</div>; // Display loading message while fetching data
  }

  if (error) {
    
    return <div>Error: {error.message}</div>; // Display error message if fetch fails
  }

  // Calculate all unique months with transactions across all customers

  const allMonths = customerData.reduce((months, customer) => {
    const {transactions = []} = customer;
    const validTransactions = transactions.filter(trans => isValidDate(trans.date));
    const uniqueMonths = new Set([...months, ...validTransactions.map(transaction => new Date(transaction.date).toLocaleString("en-US", { month:"long",year:"numeric" }))]);

    return [...uniqueMonths]; // Convert Set back to an array
  }, []);

  return (
    <div className="table-responsive">
      <h3>Rewards Report</h3>
      <table className="table table-bordered table-striped table-responsive">
        <thead>
          <tr>
            <th>Customer Name</th>
            {/* Dynamically generate headers based on used months */}
            {allMonths.map((month, index) => (
              <th key={index}>{month}</th>
            ))}
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.customer}</td>
              {/* Dynamically generate cells based on used months */}
              {allMonths.map((monthName, index) => (
                <td key={index}>
                  {customer.monthlyPoints[monthName] || 0}
                </td>
              ))}
              <td>{customer.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default RewardsReport;