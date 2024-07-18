import React from "react";
import { render, screen } from "@testing-library/react";
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
      id: 2,
      customer: "Harini",
      transactions: [
        { transId: 201, date: "2024-03-01", amount: 80, points: null },
        { transId: 202, date: "2024-01-18", amount: 102, points: null },
        { transId: 203, date: "2024-02-08", amount: 30, points: null },
        { transId: 204, date: "2024-03-06", amount: 79, points: null },
        { transId: 205, date: "2024-01-01", amount: 176, points: null },
      ],
    },
    {
      id: 2,
      customer: "Harish",
      transactions: [
        { transId: 401, date: "2024-02-01", amount: 213, points: null },
        { transId: 402, date: "2024-03-12", amount: 51, points: null },
        { transId: 403, date: "2024-01-15", amount: 234, points: null },
        { transId: 404, date: "2024-03-01", amount: 197, points: null },
        { transId: 405, date: "2024-02-05", amount: 75, points: null },
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

    await `act`(async () => {
      render(<CustomerTotalMonth />);
    });

    // Check if customer names are rendered
    expect(screen.getByText("Mathivanan")).toBeInTheDocument();
    expect(screen.getByText("Harini")).toBeInTheDocument();

    // Check if monthly totals are rendered correctly
    expect(screen.getByText("January")).toBeInTheDocument();
    expect(screen.getByText("February")).toBeInTheDocument();
    expect(screen.getByText("657")).toBeInTheDocument(); // Total for January
    expect(screen.getByText("467")).toBeInTheDocument(); // Total for February
  });

  test("handles no customer data available", async () => {
    // Mock usefetch to return empty array
    usefetch.mockResolvedValue([]);

    await `act`(async () => {
      render(<CustomerTotalMonth />);
    });

    // Check if no customer data available message is rendered
    //expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test("handles data fetch error", async () => {
    // Mock usefetch to throw an error
    usefetch.mockRejectedValue(new Error("Fetch error"));

    await `act`(async () => {
      render(<CustomerTotalMonth />);
    });

    // Check if data fetch error message is logged
    expect(log.error).toHaveBeenCalledWith("Custom hook Data fetch error!....");
    // You can also check if the error message is displayed to the user, if applicable
  });
});
