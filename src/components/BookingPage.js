import React, {useState, useEffect} from "react";
import ReservationInfo from './Reservation Pg/ReservationInfo.js'
import PersonalInfo from './Reservation Pg/PersonalInfo.js'
import PaymentInfo from './Reservation Pg/PaymentInfo.js'
import ReservationSuccessful from './Reservation Pg/ReservationSuccess.js'


// Utility function to generate random reservations
const generateFakeReservations = (count) => {
  const today = new Date();

  // Generate an array of the next 3 months (current month + 2 more months)
  const months = Array.from({ length: 4 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() + i);
    return {
      name: date.toLocaleString("default", { month: "short" }), // Short month name
      year: date.getFullYear().toString(), // Corresponding year
    };
  });

  const times = [
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
    "8:00 PM", "9:00 PM"
  ];

  const fakeReservations = [];

  while (fakeReservations.length < count) {
    // Randomly pick a month and its corresponding year
    const { name: month, year } = months[Math.floor(Math.random() * months.length)];
    
    // Calculate the maximum number of days in the selected month
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    const maxDays = new Date(year, monthIndex + 1, 0).getDate();

    // Generate a random day
    const day = Math.floor(Math.random() * maxDays) + 1;

    // Check if the date is in the future
    const selectedDate = new Date(`${month} ${day}, ${year}`);
    if (selectedDate >= today) {
      // Randomly pick a time
      const time = times[Math.floor(Math.random() * times.length)];

      // Add the reservation to the list
      fakeReservations.push({ day: day.toString(), month, year, time });
    }
  }

  return fakeReservations;
};



const BookingPage = ({ unavailableDates, setUnavailableDates}) => {
  const [formPage, setFormPage] = useState(0);

  const today = new Date();
  const initialMonth = today.toLocaleString("default", { month: "short" }); // Short month format
  const initialYear = today.getFullYear().toString(); // Convert to string

  const [formData, setFormData] = useState({
    guests: "",
    day: today.getDate().toString(), // Convert to string
    month: initialMonth, // Short month name
    year: initialYear, // Current year
    time: "",
    occasion: "",
    tableDetails: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    CVV: "",
    contactMethod: ""
  });

    // Generate fake reservations on mount
    useEffect(() => {
      const fakeReservations = generateFakeReservations(450); // Generate 10 fake reservations
      setUnavailableDates(fakeReservations);
    }, []);

    console.log(unavailableDates)


  const requiredFields = {
    0: ["guests", "day", "month", "time"], // Required fields for ReservationInfo
    1: ["firstName", "lastName", "phoneNumber", "email"], // PersonalInfo
    2: ["cardName", "cardNumber", "expDate", "CVV"], // PaymentInfo
  };
  

  const excludedKeys = ["month", "tableDetails", "day", "year", "occasion", "contactMethod"];


  const validKeys = Object.keys(formData).filter((key) => !excludedKeys.includes(key));

  const totalInputs = validKeys.length; // Count only keys not excluded
  
  const completedInputs = validKeys.filter((key) => {
    const value = formData[key];
    return typeof value === "string" && value.trim() !== "";
  }).length;
  
  const progressPercent = Math.min((completedInputs / totalInputs) * 100, 100);

  const validateCurrentStep = () => {
    const fieldsToValidate = requiredFields[formPage] || [];
    return fieldsToValidate.every((field) => {
      const value = formData[field];
      return typeof value === "string" && value.trim() !== ""; // Ensure field is not empty
    });
  };
  


  const handleNext = () => {
    if (formPage === formTitles.length - 2) { 
      // If on the second-to-last page
      if (progressPercent === 100 && validateCurrentStep()) {
        handleFormSubmit(); // Submit the form on the last page
        setFormPage((prevPage) => prevPage + 1); // Navigate to success page
      } else {
        alert("Please fill in all required fields before proceeding.");
      }
    } else if (validateCurrentStep()) {
      // If not on the final step, proceed to the next step
      setFormPage((prevPage) => prevPage + 1);
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  };
  
  const handleBack = () => {
    setFormPage((prevPage) => Math.max(prevPage - 1, 0)); // Prevent going below 0
  };

  const handleFormSubmit = () => {
    const { day, month, year, time } = formData;
  
    // Check if the date and time are already reserved
    const isUnavailable = unavailableDates.some(
      (date) =>
        date.day === day &&
        date.month === month &&
        date.year === year &&
        date.time === time
    );
  
    if (isUnavailable) {
      alert("This date and time are already reserved. Please choose another slot.");
      return;
    }
  
    // Add the new reservation to the unavailableDates array
    setUnavailableDates((prevDates) => [
      ...prevDates,
      { day, month, year, time },
    ]);
  
  };


  // Titles for each page
  const formTitles = ["Reservation Information", "Personal Information", "Payment Information", "!"]; // Add more titles as needed


  const renderFormStep = () => {
    switch (formPage) {
      case 0:
        return <ReservationInfo 
          formData={formData}
           setFormData={setFormData}
           unavailableDates={unavailableDates}
           setUnavailableDates={setUnavailableDates}
         />;
      case 1:
        return <PersonalInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <PaymentInfo formData={formData} setFormData={setFormData} />;
      case 3:
        return <ReservationSuccessful formData={formData} setFormData={setFormData} />;
      default:
        return <ReservationInfo formData={formData} setFormData={setFormData} />;
    }
  };

    return (
        <div className="reservation-container">
            <div className="reservation-form">
                <h3>Form Progress</h3>
                <div class="dashboard">
                    <div
                      className="circle"
                      style={{
                        backgroundImage:
                          formPage === formTitles.length - 1
                            ? `conic-gradient(#4CAF50 100%, #DFF0D8 0%)` // Green color for success
                            : `conic-gradient(#B5838D ${progressPercent}%, #FFCDB2 0%)`,
                        transform: formPage === formTitles.length - 1 ? "scale(2)" : "scale(1)", // Scale up on success page
                        transition: "transform 0.3s ease, background-image 0.3s ease", // Smooth transition
                      }}
                    >
                    <div className="inner">{Math.round(progressPercent)}%</div>
                  </div>
                </div>

                <h3>{formTitles[formPage]}</h3>
                <form className="form-inputs">
                {renderFormStep()}                    
                  </form>
                  <div className="flex-center buttons">
                    <button 
                      className={`back-btn ${progressPercent === 100 ? "shrink-btn" : ""}`}
                      onClick={handleBack}
                      disabled={formPage === 0 || formPage === 3} // Adjust for the last page
                    >Back</button>
                    <button
                      className={`next-btn ${progressPercent === 100 ? "glow-button" : ""}`}
                      onClick={handleNext}
                      disabled={formPage === formTitles.length - 1} 
                    >  
                      {formPage === formTitles.length - 2 ? "Submit" : "Next"}
                    </button>                    
                  </div>

            </div>
        </div>
    );
}

export default BookingPage;
