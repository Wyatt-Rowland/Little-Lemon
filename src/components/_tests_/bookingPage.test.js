import { render, screen } from "@testing-library/react";
import BookingPage from "../BookingPage";

test ('Renders form progress', () => {
    render(<BookingPage />);
    const progressHeading = screen.getByText(/Form Progress/i)
    const proressTracker = screen.getByRole('progressbar')
})