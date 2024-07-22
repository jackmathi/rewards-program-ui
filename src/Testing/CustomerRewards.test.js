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
  // Wait for "Harish" to appear (using findByText for potential delays)
  const harishElement = await waitFor(() => screen.findByText(/Harish/i));

  expect(harishElement).toBeInTheDocument();
});
test("Fetch is called and displayed in the UI (clicks Harish and waits for totals)", async () => {
  render(<CustomerRewards />);

  // Wait for "Harish" to appear
  await screen.findByText(/Harish/i);
  const harishElement = screen.getByText(/Harish/i);
  userEvent.click(harishElement);
  // Wait for "totals" to appear 
  await screen.findByText(/totals/i);
});
