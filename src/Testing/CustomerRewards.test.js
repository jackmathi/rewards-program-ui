import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomerRewards from "../Components/CustomerRewards";
import data from "../Components/common/CustomerData";

beforeEach(() => {
  global.fetch = jest.fn(() => {
    Promise.resolve({
      json: () => Promise.resolve({ data }),
    });
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test("renders CustomerRewards component correctly", () => {
  render(<CustomerRewards />);
});

test("Fetch is called and displayed in the UI", async () => {
  render(<CustomerRewards />);
  await waitFor(() => {
    expect(screen.getByText(/Harish/i)).toBeInTheDocument();
  });
});

test("After customer switch totals is displayed", async () => {
  render(<CustomerRewards />);
  await waitFor(async () => {
    expect(screen.getByText(/Harish/i)).toBeInTheDocument();
    const anchorElement = screen.getByText(/Harish/i);
    userEvent.click(anchorElement);
    await waitFor(() => {
      expect(screen.getByText(/totals/i)).toBeInTheDocument();
    });
  });
});
