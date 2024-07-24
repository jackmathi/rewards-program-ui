import { calculatePoints, isValidDate } from "../Components/rewards";

// Test cases for calculatePoints function
describe("calculatePoints function", () => {
  it("should return 0 points for amount <= 50", () => {
    expect(calculatePoints(50)).toBe(0);
    expect(calculatePoints(25)).toBe(0);
  });

  it("should correctly calculate points for amount > 50 and <= 100", () => {
    expect(calculatePoints(70)).toBe(20); // 70 - 50 = 20
    expect(calculatePoints(100)).toBe(50); // 100 - 50 = 50
  });

  it("should correctly calculate points for amount > 100", () => {
    expect(calculatePoints(120)).toBe(90); // 2 * (120 - 100) + 50 = 90
    expect(calculatePoints(200)).toBe(250); // 2 * (200 - 100) + 50 = 250
  });
});

// Test cases for isValidDate function
describe('isValidDate function', () => {
  test('should return true for current date', () => {
    const currentDate = new Date();
    expect(isValidDate(currentDate)).toBe(true);
  });

  test('should return true for date within last 3 months', () => {
    const recentDate = new Date();
    recentDate.setMonth(recentDate.getMonth() - 2); // Setting date 2 months ago
    expect(isValidDate(recentDate)).toBe(true);
  });

  test('should return false for date older than 3 months', () => {
    const oldDate = new Date();
    oldDate.setFullYear(oldDate.getFullYear() - 1); // Setting date 1 year ago
    expect(isValidDate(oldDate)).toBe(false);
  });

  test('should handle invalid date inputs gracefully', () => {
    expect(isValidDate('')).toBe(false); // Empty string
    expect(isValidDate(null)).toBe(false); // Null value
    expect(isValidDate(undefined)).toBe(false); // Undefined value
    expect(isValidDate('2023-20-01')).toBe(false); // Invalid date format
  });
});

