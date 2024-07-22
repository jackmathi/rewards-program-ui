import React from "react";
import { render, screen, act } from "@testing-library/react";
import CustomerTotalMonth from "../Components/TotalAmount";
import { usefetch } from "../Components/common/api";
import log from "loglevel";

// Mock usefetch function
jest.mock("../Components/common/api", () => ({
  usefetch: jest.fn(),
}));

// Mock loglevel functions
jest.mock("loglevel", () => ({
  warn: jest.fn(),
  error: jest.fn(),
}));

describe("CustomerTotalMonth", () => {
  // Sample mock data
  const mockData = [
    {
      id: 1,
      customer: "Harini",
      transactions: [
        { transId: 101, date: "2023-05-01", amount: 135.60000002, points: null },
        { transId: 102, date: "2024-05-18", amount: 102, points: null },
        { transId: 103, date: "2024-06-05", amount: 30.60000002, points: null },
        { transId: 104, date: "2024-06-10", amount: 79, points: null },
        { transId: 105, date: "2024-07-01", amount: 176, points: null },
      ],
    },
    {
      id: 2,
      customer: "Harish",
      transactions: [
        { transId: 201, date: "2024-05-01", amount: 213, points: null },
        { transId: 202, date: "2024-05-12", amount: 51, points: null },
        { transId: 203, date: "2024-06-15", amount: 234, points: null },
        { transId: 204, date: "2024-06-01", amount: 197.7525, points: null },
        { transId: 205, date: "2024-07-05", amount: 75, points: null },
      ],
    },
  ];

  beforeEach(() => {
    // Reset mock calls before each test
    usefetch.mockReset();
    log.warn.mockReset();
    log.error.mockReset();
  });

  test("renders customer data and monthly totals correctly", async () => {
    // Mock usefetch to return mockData
    usefetch.mockResolvedValue(mockData);

    await act(async () => {
      render(<CustomerTotalMonth />);
    });
  
    // Check if customer names are rendered
    expect(screen.getByText("Harini")).toBeInTheDocument();
    expect(screen.getByText("Harish")).toBeInTheDocument();

    // Check if monthly totals are rendered correctly
    expect(screen.getByText("May 2024")).toBeInTheDocument();
    expect(screen.getByText("June 2024")).toBeInTheDocument();
    expect(screen.getByText("102")).toBeInTheDocument(); 
    expect(screen.getByText("264")).toBeInTheDocument(); 
  });

  test("handles no customer data available", async () => {
    // Mock usefetch to return empty array
    usefetch.mockResolvedValue([]);

    await act(async () => {
      render(<CustomerTotalMonth />);
    });
  

    // Check if no customer data available message is rendered
    //expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test("handles data fetch error", async () => {
    // Mock usefetch to throw an error
    usefetch.mockRejectedValue(new Error("Fetch error"));

    await act(async () => {
      render(<CustomerTotalMonth />);
    });  

    // Check if data fetch error message is logged
    expect(log.error).toHaveBeenCalledWith("Custom hook Data fetch error!....");
    // You can also check if the error message is displayed to the user, if applicable
  });
});
