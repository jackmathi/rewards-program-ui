import { useState, useEffect } from "react";
import { usefetch } from "../Service/api"

const CustomerRewards = () => {
  const [dataSet, setDataSet] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  // const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const apiCall = async () => {
    try {
      const result = await usefetch(); // Custom Hook called
      setDataSet(result);
    } catch (error) {
      console.error(error);
    }
     };

     apiCall();
  }, []);

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
    })

    return { points, totalAmount, totalPoints };
    
  }
  
  
  const handleCustomerClick = (customerId) => {
    setSelectedCustomer(customerId);
    // setActiveTab(customerId);
  };

  const displayCustomerDetail = () => {
    const {transactions=[]} = dataSet[selectedCustomer - 1]
    const {points=0, totalAmount=0, totalPoints=0 } = calculateTotals(transactions)
    
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-responsive">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Earned Points</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transId}>
                <td>{transaction.transId}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.points}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Totals:</th>
              <td>${totalAmount}</td>
              <td>{totalPoints}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

  return (
    <div className="row">
      <h3>Customers List</h3>
      <div className="col-4 list-group">
        {dataSet.map((customer) => (
          <a
            key={customer.id}
            href="#"
            className={`list-group-item list-group-item-action ${selectedCustomer === customer.id ? "active" : ""
              }`}
            onClick={() => handleCustomerClick(customer.id)}
          >
            {customer.customer}
          </a>
        ))}
      </div>
      <div className="col-8">
        {selectedCustomer !== null && (
          <div key={selectedCustomer}>
            {displayCustomerDetail()}
          </div>

        )}
        {selectedCustomer == null && <h2>Please select a customer.</h2>}
      </div>
    </div>
  );
};

export default CustomerRewards;