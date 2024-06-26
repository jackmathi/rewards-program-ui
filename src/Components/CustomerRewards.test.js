import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomerRewards, displayCustomerDetail, transactions } from './CustomerRewards'; 

describe('CustomerRewards component', () => {
  
    test('Calculate Reward points', () => {
        const result = CustomerRewards(2 * 20 + 1 * 50 );
        expect(result).toBe(90); 
      });

});
