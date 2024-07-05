export function calculatePoints(amount) {
    if (amount <= 50) {
      return 0;
    } else if (amount <= 100) {
      return amount - 50;
    } else {
      return 2 * (amount - 100) + 50;
    }
  }
 
  export function calculateMonthlyPoints(transactions) {
    return transactions.reduce((monthlyPoints, transaction) => {
      const month = new Date(transaction.date).getMonth();
  
      // Use an array of month names instead of object keys
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
  
      // Ensure month is within valid range (0-11)
      if (month < 0 || month > 11) {
        console.warn(`Encountered unexpected month: ${month}`);
        return monthlyPoints;  // Skip processing this transaction (optional)
      }
  
      const monthName = monthNames[month];
      monthlyPoints[monthName] = (monthlyPoints[monthName] || 0) + calculatePoints(transaction.amount);
  
      return monthlyPoints;
    }, {}); // Empty object as initial accumulator
  }
  
  