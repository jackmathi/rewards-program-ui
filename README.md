# Rewards Program UI
## Overview
This rewards program allows customers to earn points based on their purchases. The points are calculated as follows:

For every dollar spent over $100 in a transaction, the customer receives 2 points.
For every dollar spent between $50 and $100 in a transaction, the customer receives 1 point.

## Example Calculation
Suppose a customer makes a purchase of $120. Here’s how we calculate the points:

Amount spent over $100: $120 - $100 = $20
Points for this portion: 2 points/dollar × $20 = 40 points
Amount spent between $50 and $100: $100 - $50 = $50
Points for this portion: 1 point/dollar × $50 = 50 points
Total points earned: 40 points + 50 points = 90 points


# We have developed three menus as per client requirements:

## 1. **Customer List**
   - **Component Name:** CustomerRewards
   - Displays a list of customers  name with tab functionality.
   - Shows the total amount spent by each customer and calculates their reward points.

## 2. **Customer Reward Points**
   - **Component Name:** RewardsReport
   - Calculates reward points monthly and provides a total summary.
   - Also computes reward points on a per-user basis.

## 3. **Customer Total Amount**
   - **Component Name:** TotalMonth
   - Calculates and displays the total amount spent by users monthly.
   - Provides a breakdown of total amounts spent per user.

## We utilized the following React libraries for development:
- Testing-library
- loglevel for logging purposes
- React Router
- Toast Library (Error and success messages will be clearly displayed in the user interface.)
