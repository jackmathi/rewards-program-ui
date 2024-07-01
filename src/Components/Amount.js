import { useEffect } from "react";

export function calculateMonthlyTotals(transactions) {
    const monthlyTotals = {};
    for (const transaction of transactions) {
      const month = transaction.date.getMonth();
      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
      monthlyTotals[month] += transaction.amount;
    }
    return monthlyTotals;
  }
export function calculateMonthlyAmount(transactions) {
    const monthlyAmount = { January: 0, February: 0, March: 0 };
    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).getMonth(); 
      monthlyAmount[Object.keys(monthlyAmount)[month]] += calculateMonthlyTotals(transaction.amount);
    });
    return monthlyAmount;
  }
  
  

  