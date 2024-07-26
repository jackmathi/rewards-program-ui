// * Calculate reward points based on the transaction amount.
export function calculatePoints(amount) {
  if (amount <= 50) {
    return 0;
  } else if (amount <= 100) {
    return amount - 50;
  } else {
    return 2 * (amount - 100) + 50;
  }
}
// * Check if a given date is within the last three months.
export function isValidDate(date) {
  const currentDate = new Date();
  const expectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());
  const transactionDate = new Date(date);
  return expectedDate <= transactionDate && transactionDate <= currentDate;
}


// * Calculate monthly reward points based on transactions.
export function calculateMonthlyPoints(transactions) {
  const monthlyPoints = transactions.reduce((monthlyPoints, transaction) => {
    if(isValidDate(transaction.date)) {
      const month = new Date(transaction.date).toLocaleString("en-US", { month:"long",year:"numeric" });
      monthlyPoints[month] = (monthlyPoints[month] || 0) + calculatePoints(Math.round(transaction.amount));
    } 
    return monthlyPoints;
  }, {}); // Empty object as initial accumulator
  return monthlyPoints;
}


