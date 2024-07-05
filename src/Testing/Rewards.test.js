import { calculateMonthlyPoints, calculatePoints } from '../Components/rewards';

describe('calculatePoints function', () => {
  test('returns 0 for amount less than or equal to 50', () => {
    expect(calculatePoints(50)).toBe(0);
    expect(calculatePoints(20)).toBe(0);
  });

  test('returns amount minus 50 for amount between 50 and 100 (exclusive)', () => {
    expect(calculatePoints(70)).toBe(20);
    expect(calculatePoints(95)).toBe(45);
  });

  test('returns double the amount minus 150 for amount over 100', () => {
    expect(calculatePoints(120)).toBe(90);
    expect(calculatePoints(200)).toBe(250);
  });
});

describe('calculateMonthlyPoints', () => {
    test.each([
      [50, 'January', 0], // Below 50, no points for January
      [60, 'February', 10], // Between 50 and 100, 10 points for February
      [120, 'March', 90], // Above 100, 90 points for March
    ])('calculates points correctly for amount %i in %s', (amount, month, expectedPoints) => {
      const transactions = [{ amount, date: '2024-' + (new Date(month + ' 1, 2024').getMonth() + 1) + '-01' }];
      const result = calculateMonthlyPoints(transactions);
      expect(result[month]).toBe(expectedPoints);
    });
  });

