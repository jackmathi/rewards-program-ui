import React from "react";
import { render, screen, act } from "@testing-library/react";
import CustomerTotalMonth from "../Components/TotalAmount";
import { usefetch } from "../Service/api";
import log from "loglevel";

// Mock usefetch function
jest.mock("../Service/api", () => ({
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
        { transId: 101, date: "2023-04-01", amount: 41.40000002},
        { transId: 102, date: "2024-06-18", amount: 60},
        { transId: 103, date: "2024-07-05", amount: 100},
        { transId: 104, date: "2024-07-10", amount: 120},
        { transId: 105, date: "2024-08-01", amount: 128},
      ],
    }, 
    {
      id: 2,
      customer: "Harish",
      transactions: [
        { transId: 201, date: "2024-06-01", amount: 213 },
        { transId: 202, date: "2024-06-12", amount: 11},
        { transId: 203, date: "2024-07-15", amount: 234},
        { transId: 204, date: "2024-07-01", amount: 197},
        { transId: 205, date: "2024-08-01", amount: 75},
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
    expect(screen.getByText("June 2024")).toBeInTheDocument();
    expect(screen.getByText("July 2024")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument(); 
    expect(screen.getByText("224")).toBeInTheDocument(); 
  });

  test("handles no customer data available", async () => {
    // Mock usefetch to return empty array
    usefetch.mockResolvedValue([]);

    await act(async () => {
      render(<CustomerTotalMonth />);
    });

  });

  test("handles data fetch error", async () => {
    // Mock usefetch to throw an error
    usefetch.mockRejectedValue(new Error("Fetch error"));

    await act(async () => {
      render(<CustomerTotalMonth />);
    });  

    // Check if data fetch error message is logged
    expect(log.error).toHaveBeenCalledWith("Custom hook Data fetch error!....");
    // error message is displayed to the user
  });
});
