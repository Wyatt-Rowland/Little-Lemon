// src/components/testing/headerTesting.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Header from '../Header';

test('Renders Nav Buttons', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // Check if the "Home" button exists
  const homeButton = screen.getByText(/Home/i); // Case-insensitive match
  const aboutButton = screen.getByText(/About/i); // Case-insensitive match
  const menuButton = screen.getByText(/Menu/i); // Case-insensitive match
  const reservationsButton = screen.getByText(/Reservations/i); // Case-insensitive match
  const orderButton = screen.getByText(/Order Online/i); // Case-insensitive match
  const loginButton = screen.getByText(/Login/i); // Case-insensitive match

  expect(homeButton).toBeInTheDocument();
});
