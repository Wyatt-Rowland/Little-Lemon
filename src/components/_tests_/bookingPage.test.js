import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import BookingPage from "../BookingPage";


beforeEach(() => {
    // Mock current time to a fixed hour
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-01-01T06:00:00Z")); // Set to 10:00 AM UTC
  });
  
  afterEach(() => {
    jest.useRealTimers();
  });
  

test('renders the form progress section', () => {
    render(<BookingPage availableDates={[]} dispatch={jest.fn()} availableTimesMap={new Map()} />);
    
    expect(screen.getByText(/Form Progress/i)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  describe('validateCurrentStep', () => {
    let formData;
    let requiredFields;
    let setFormErrors;
  
    beforeEach(() => {
      formData = {
        guests: "",
        day: "1",
        month: "Jan",
        year: "2025",
        time: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        cardName: "",
        cardNumber: "",
        expDate: "",
        CVV: "",
      };
  
      requiredFields = {
        0: ["guests", "time"],
        1: ["firstName", "lastName", "phoneNumber", "email"],
        2: ["cardName", "cardNumber", "expDate", "CVV"],
      };
  
      setFormErrors = jest.fn(); // Mock setFormErrors
    });
  
    it('should validate step 0 (Reservation Info)', () => {
      const formPage = 0;
  
      const errors = {};
      requiredFields[formPage].forEach((field) => {
        if (!formData[field]) errors[field] = "This field is required.";
      });
  
      expect(Object.keys(errors)).toEqual(["guests", "time"]);
    });
  
    it('should validate step 1 (Personal Info)', () => {
      const formPage = 1;
  
      const errors = {};
      requiredFields[formPage].forEach((field) => {
        if (!formData[field]) errors[field] = "This field is required.";
      });
  
      expect(Object.keys(errors)).toEqual(["firstName", "lastName", "phoneNumber", "email"]);
    });
  
    it('should validate step 2 (Payment Info)', () => {
      const formPage = 2;
  
      const errors = {};
      requiredFields[formPage].forEach((field) => {
        if (!formData[field]) errors[field] = "This field is required.";
      });
  
      expect(Object.keys(errors)).toEqual(["cardName", "cardNumber", "expDate", "CVV"]);
    });
  });

  test('navigates between pages', () => {
    const mockAvailableDates = [
        {
          day: "1",
          month: "Jan",
          year: "2025",
          times: ["10:00 AM", "11:00 AM"],
        },
      ];
      
      const mockAvailableTimesMap = new Map([
        ["1-Jan-2025", ["10:00 AM", "11:00 AM"]],
      ]);
    render(<BookingPage availableDates={mockAvailableDates} dispatch={jest.fn()} availableTimesMap={mockAvailableTimesMap} />);
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    
    // Start at step 0
    expect(screen.getByText(/Reservation Information/i)).toBeInTheDocument();
    userEvent.selectOptions(screen.getByLabelText(/Guest Number\*/i), "2"); // Mock guest selection
    userEvent.selectOptions(screen.getByLabelText(/Time\*/i), "10:00 AM"); // Mock time selection
    
    // Move to step 1
    userEvent.click(nextButton);
    expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();
    userEvent.type(screen.getByLabelText(/First Name\*/i), "John"); // Mock name
    userEvent.type(screen.getByLabelText(/Last Name\*/i), "Doe"); // Mock last name
    userEvent.type(screen.getByLabelText(/Phone Number\*/i), "(870)356-3786"); // Mock number
    userEvent.type(screen.getByLabelText(/Email\*/i), "thisEmail@email.com"); // Mock email


    
    // Move to step 2
    userEvent.click(nextButton);
    expect(screen.getByText(/Payment Information/i)).toBeInTheDocument();
        // Fill valid data for all fields and click submit
        userEvent.type(screen.getByLabelText(/Name on Card\*/i), "John Doe");
        userEvent.type(screen.getByLabelText(/Card Number/i), "1234 5678 9012 3456");
        userEvent.type(screen.getByLabelText(/Expiration Date/i), "12/25");
        userEvent.type(screen.getByLabelText(/CVV/i), "123");
      
        userEvent.click(screen.getByText(/Submit/i));
  });

  test("submits the form when all fields are valid", () => {
    const mockDispatch = jest.fn();
  
    const mockAvailableDates = [
      { day: "1", month: "Jan", year: "2025", times: ["10:00 AM"] },
    ];
    const mockAvailableTimesMap = new Map([["1-Jan-2025", ["10:00 AM"]]]);
  
    render(
      <BookingPage
        availableDates={mockAvailableDates}
        dispatch={mockDispatch}
        availableTimesMap={mockAvailableTimesMap}
      />
    );

    const nextButton = screen.getByRole('button', { name: /Next/i });
  
    userEvent.selectOptions(screen.getByLabelText(/Guest Number\*/i), "2");
    userEvent.selectOptions(screen.getByLabelText(/Time\*/i), "10:00 AM");
    userEvent.click(nextButton);
    userEvent.type(screen.getByLabelText(/First Name\*/i), "John");
    userEvent.type(screen.getByLabelText(/Last Name\*/i), "Doe");
    userEvent.type(screen.getByLabelText(/Phone Number\*/i), "(870)356-3786");
    userEvent.type(screen.getByLabelText(/Email\*/i), "thisEmail@email.com");
    userEvent.click(nextButton);
    userEvent.type(screen.getByLabelText(/Name on Card\*/i), "John Doe");
    userEvent.type(screen.getByLabelText(/Card Number/i), "1234 5678 9012 3456");
    userEvent.type(screen.getByLabelText(/Expiration Date/i), "12/25");
    userEvent.type(screen.getByLabelText(/CVV/i), "123");
  
    userEvent.click(screen.getByText(/Submit/i));
  
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "book",
      payload: { day: "1", month: "Jan", year: "2025", time: "10:00 AM" },
    });
  });

