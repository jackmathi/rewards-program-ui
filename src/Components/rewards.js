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
    const monthlyPoints = { January: 0, February: 0, March: 0 };

    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).getMonth(); 
      monthlyPoints[Object.keys(monthlyPoints)[month]] += calculatePoints(transaction.amount);
    });
    return monthlyPoints;
  }
  