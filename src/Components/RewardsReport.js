import React, { useState, useEffect } from 'react';
import data from './common/CustomerData';
import { calculateMonthlyPoints, calculatePoints } from './rewards';
import log from 'loglevel'

function RewardsReport() {
  const [customerData, setCustomerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      // Simulate asynchronous API call 
      const simulatedResponse = await new Promise((resolve) =>
        setTimeout(() => resolve(data), 1000) // Simulate delay
      );

      // Process and update data
      const processedData = simulatedResponse.map((customer) => ({
        ...customer,
        monthlyPoints: calculateMonthlyPoints(customer.transactions),
        totalPoints: customer.transactions.reduce(
          (acc, transaction) => acc + calculatePoints(transaction.amount),
          0
        ),
      }));
      setCustomerData(processedData);
    };

    fetchData().catch((error) => setError(error)).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    log.error('Rewards Report fetch error!....') // Logger error
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
              <td>{customer.monthlyPoints.January}</td>
              <td>{customer.monthlyPoints.February}</td>
              <td>{customer.monthlyPoints.March}</td>
              <td>{customer.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RewardsReport;
