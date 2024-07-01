import React, { useState, useEffect } from 'react';
import data from './common/CustomerData';
import { calculateMonthlyAmount, calculateMonthlyTotals } from './Amount';
import log from 'loglevel'

function AmountReport() {
  const [customerData, setCustomerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      // Simulate asynchronous API call 
      const simulated = await new Promise((resolve) =>
        setTimeout(() => resolve(data), 1000) // Simulate delay
      );

      // Process and update data
      const processedData1 = simulated.map((customer) => ({
        ...customer,
        monthlyAmount: calculateMonthlyAmount(customer.transactions),
        totalAmount: customer.transactions.reduce(
          (acc, transaction) => acc + calculateMonthlyTotals(transaction.amount),
          0
        ),
      }));
      setCustomerData(processedData1);
    };

    fetchData().catch((error) => setError(error)).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    log.error('Data fetch error!....') // Logger error
     return <div>Error: {error.message}</div>;
  }

  return (
    <div className="table-responsive">
      <h3>Rewards Report</h3>
      <table className="table table-bordered table-striped table-responsive">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>January</th>
            <th>February</th>
            <th>March</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.customer}</td>
              <td>{customer.monthlyAmount.January}</td>
              <td>{customer.monthlyAmount.February}</td>
              <td>{customer.monthlyAmount.March}</td>
              <td>{customer.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AmountReport;
