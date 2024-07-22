import React, { useState, useEffect } from "react";
import { usefetch } from "./common/api"; // Assuming `usefetch` fetches customer data
import log from "loglevel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerTotalMonth = () => {
  const [dataSet, setDataSet] = useState([]);
  const [formattedDataSet, setFormattedDataSet] = useState([]);
  const [allMonths, setAllMonths] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true before fetching
      setError(null); // Clear any previous errors
      
      try {
        const result = await usefetch();
        setDataSet(result);
        toast.success("Fetching Customer Data Successfully!", {
          position: "top-right",
          autoClose: 10000, // Close after 10 seconds
        });
      } catch (error) {
        log.error("Custom hook Data fetch error!....");
        toast.error("Error Fetching Customer Data!", {
          position: "top-right",
          autoClose: 10000, // Close after 10 seconds
        });
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate current month and last three months
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    const lastThreeMonths = [];
    for (let i = 0; i < 3; i++) {
      lastThreeMonths.unshift(
        currentDate.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })
      );
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
    const requiredMonths = [currentMonth, ...lastThreeMonths];

    formatData(requiredMonths);
  }, [dataSet]);

  const formatData = (requiredMonths) => {
    const currentDate = new Date();
    const lastThreeMonths = [];
    
    // Calculate the last three months including the current month
    for (let i = 0; i < 3; i++) {
      lastThreeMonths.unshift(
        currentDate.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })
      );
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
  
    const newData = dataSet.map((customerRow) => {
      const { transactions = [], customer } = customerRow;
      const customerData = {};
      let monthlyTotals = calculateMonthlyTotals(transactions);
      // Filter out months not in lastThreeMonths
      const filteredMonthlyTotals = requiredMonths.reduce((acc, month) => {
        acc[month] = monthlyTotals[month] || 0;
        return acc;
      }, {});
  
      const totalAmount = Object.values(filteredMonthlyTotals).reduce(
        (sum, amount) => Math.floor(sum + amount),
        0
      );
  
      customerData["customer"] = customer;
      customerData["newMonthlyTotals"] = sortObject(filteredMonthlyTotals);
      customerData["totalAmount"] = totalAmount;
  
      return customerData;
    });
  
    setAllMonths(lastThreeMonths);
    setFormattedDataSet(newData);
  };
  

  const sortObject = (obj) => {
    const sortedObj = Object.keys(obj).map((key) => ({
      month: key,
      amount: obj[key],
    }));


    sortedObj.sort((a, b) => {
      return new Date(b.month) - new Date(a.month);
    });
    return sortedObj;
  };

  const calculateMonthlyTotals = (transactions) => {
    return transactions.reduce((monthlyTotals, transaction) => {
      if (!transaction.amount) return monthlyTotals;

      const month = new Date(transaction.date).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
      monthlyTotals[month] = (monthlyTotals[month] || 0) + Math.floor(transaction.amount);

      return monthlyTotals;
    }, {});
  };

  const displayCustomers = () => {
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
          {formattedDataSet.map((row, index) => {
            const { customer, totalAmount, newMonthlyTotals } = row;

            if (!customer) return null;
            const key = customer?.id || `row-${index}`;
            return (
              <tr key={key}>
                <td>{customer}</td>
                {allMonths.map((month) => (
        <td key={month}>
          {newMonthlyTotals.find((item) => item.month === month)?.amount || 0}
        </td>
      ))}
                <td>{totalAmount.toFixed(0)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="row">
      <h3>Monthly Total Amount</h3>
      <ToastContainer />
      {displayCustomers()}
    </div>
  );
};

export default CustomerTotalMonth;
