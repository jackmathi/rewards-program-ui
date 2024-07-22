import { calculatePoints, isValidDate } from "../Components/rewards";

// Test cases for calculatePoints function
describe('calculatePoints function', () => {
  it('should return 0 points for amount <= 50', () => {
    expect(calculatePoints(50)).toBe(0);
    expect(calculatePoints(25)).toBe(0);
  });

  it('should correctly calculate points for amount > 50 and <= 100', () => {
    expect(calculatePoints(70)).toBe(20); // 70 - 50 = 20
    expect(calculatePoints(100)).toBe(50); // 100 - 50 = 50
  });

  it('should correctly calculate points for amount > 100', () => {
    expect(calculatePoints(120)).toBe(90); // 2 * (120 - 100) + 50 = 90
    expect(calculatePoints(200)).toBe(250); // 2 * (200 - 100) + 50 = 250
  });
});

// Test cases for isValidDate function
describe('isValidDate function', () => {
  it('should return true for dates within the last 3 months', () => {
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
    
    const validDate1 = new Date();
    validDate1.setDate(currentDate.getDate() - 10); // Within the last 3 months
    expect(isValidDate(validDate1)).toBe(true);

    // const validDate2 = threeMonthsAgo;
    // expect(isValidDate(validDate2)).toBe(true);
  });

  it('should return false for dates older than 3 months', () => {
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
    
    const invalidDate1 = new Date();
    invalidDate1.setFullYear(currentDate.getFullYear() - 1); // Older than 3 months
    expect(isValidDate(invalidDate1)).toBe(false);

    const invalidDate2 = threeMonthsAgo;
    invalidDate2.setFullYear(currentDate.getFullYear() - 1); // Older than 3 months
    expect(isValidDate(invalidDate2)).toBe(false);
  });
}); 


