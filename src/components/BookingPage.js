import React, { useState } from "react";
import ReservationInfo from './Reservation Pg/ReservationInfo';
import PersonalInfo from './Reservation Pg/PersonalInfo';
import PaymentInfo from './Reservation Pg/PaymentInfo';
import ReservationSuccessful from './Reservation Pg/ReservationSuccess';
import { addUnavailableToCache, getUnavailableFromCache } from "../utilities/dateUtils";

const BookingPage = ({ availableDates, dispatch, availableTimesMap }) => {
  const [formPage, setFormPage] = useState(0);

  const today = new Date();
  const initialMonth = today.toLocaleString("default", { month: "short" });
  const initialYear = today.getFullYear().toString();

  const [formData, setFormData] = useState({
    guests: "",
    day: today.getDate().toString(),
    month: initialMonth,
    year: initialYear,
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

  const [formErrors, setFormErrors] = useState({}); // Track errors


  const requiredFields = {
    0: ["guests", "time"], // Required fields for ReservationInfo
    1: ["firstName", "lastName", "phoneNumber", "email"], // PersonalInfo
    2: ["cardName", "cardNumber", "expDate", "CVV"], // PaymentInfo
  };
  
    // Calculate progress percentage dynamically
    const calculateProgressPercent = () => {
      const totalRequiredFields = Object.values(requiredFields).flat();
      const filledFields = totalRequiredFields.filter(
        (field) => formData[field] && formData[field].trim() !== ""
      ).length;
  
      return Math.round((filledFields / totalRequiredFields.length) * 100);
    };
  
    const progressPercent = calculateProgressPercent();
  

    // Helper to validate phone number
const isValidPhoneNumber = (phone) => {
  // Allow digits, (), spaces, and one +
  const cleanedPhone = phone.replace(/[^0-9+]/g, ""); // Remove invalid characters
  const digitCount = cleanedPhone.replace(/\D/g, "").length; // Count digits
  
  return (
    digitCount === 10 || digitCount === 11 || digitCount === 12
  ) && /^[+]?[\d\s()\-]*$/.test(phone); // Check valid characters and optional +
};

const validateCurrentStep = () => {
  const fieldsToValidate = requiredFields[formPage] || [];
  const errors = {};

  // Check if fields are filled
  fieldsToValidate.forEach((field) => {
    if (!formData[field] || formData[field].trim() === "") {
      errors[field] = "This field is required.";
    }
  });

  // Page-specific validations
  switch (formPage) {
    case 0: // Reservation Info
      if (
        !formData.guests ||
        isNaN(formData.guests) ||
        parseInt(formData.guests) <= 0
      ) {
        errors.guests = "Please enter a valid guest number.";
      }
      if (!formData.time) {
        errors.time = "Please select a valid time.";
      }
      break;
    case 1: // Personal Info
      if (!isValidPhoneNumber(formData.phoneNumber)) {
        errors.phoneNumber = "Invalid phone number format.";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Invalid email address.";
      }
      if (!formData.firstName.trim()) {
        errors.firstName = "First name is required.";
      }
      if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required.";
      }
      break;
    case 2: // Payment Info
      if (!formData.cardName.trim()) {
        errors.cardName = "Name on card is required.";
      }
      if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(formData.cardNumber)) {
        errors.cardNumber = "Invalid card number format.";
      }
      if (!/^\d{2}\/\d{2}$/.test(formData.expDate)) {
        errors.expDate = "Invalid expiration date format.";
      }
      if (!/^\d{3,4}$/.test(formData.CVV)) {
        errors.CVV = "Invalid CVV.";
      }
      break;
    default:
      break;
  }

  setFormErrors(errors); // Update errors state

  return Object.keys(errors).length === 0; // Return true if no errors
};

  const handleNext = () => {
    if (formPage === formTitles.length - 2) {
      if (progressPercent === 100 && validateCurrentStep()) {
        handleFormSubmit();
        setFormPage((prevPage) => prevPage + 1);
      } else {
        alert("Please fill in all required fields before proceeding.");
      }
    } else if (validateCurrentStep()) {
      setFormPage((prevPage) => prevPage + 1);
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  };

  const handleBack = () => {
    setFormPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNewReservation = (day, month, year, time) => {
    // Add the new reservation to the cache
    addUnavailableToCache(day, month, year, time);
  
    // Update the availableDates state
    const updatedDates = availableDates.map((date) => {
      if (date.day === day && date.month === month && date.year === year) {
        const updatedTimes = date.times.filter((t) => t !== time);
        return { ...date, times: updatedTimes }; // Always return a new object
      }
      return date;
    });
  
    dispatch({ type: "initialize", payload: [...updatedDates] }); // Ensure a new array
  };

  const handleFormSubmit = () => {
    const { day, month, year, time } = formData;
  
    const key = `${day}-${month}-${year}`;
    const availableTimes = availableTimesMap.get(key) || [];
  
    if (!availableTimes.includes(time)) {
      alert("This date and time are no longer available. Please choose another slot.");
      return false; // Prevent further action
    }
  
    // Add the selected time to the cache
    addUnavailableToCache(day, month, year, time);

    // Update the availableDates state by calling handleNewReservation
    handleNewReservation(day, month, year, time);

  
    // Remove the selected slot from availableDates
    dispatch({ type: "book", payload: { day, month, year, time } });
  };

  const handleMakeAnotherReservation = () => {
    setFormPage(0); // Reset to the first page
    setFormData({
      guests: "",
      day: today.getDate().toString(),
      month: initialMonth,
      year: initialYear,
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
      contactMethod: "",
    });
  };
  

  const formTitles = ["Reservation Information", "Personal Information", "Payment Information", "!"];
  // console.log(formData)

  const renderFormStep = () => {
    // Include cached unavailable times in availableTimesMap
    const updatedAvailableDates = (availableDates || []).map((date) => { //Added [] to make sure that I don't get an error for availableDates being undefined
    const unavailableTimes = getUnavailableFromCache(date.day, date.month, date.year);
    const filteredTimes = date.times.filter((time) => !unavailableTimes.includes(time));
    return { ...date, times: filteredTimes };
    });
    switch (formPage) {
      case 0:
        return <ReservationInfo formData={formData} setFormData={setFormData}                 
          availableDates={updatedAvailableDates} // Use updated availableDates
          availableTimesMap={availableTimesMap}
          formErrors={formErrors}
          dispatch={dispatch} />;
      case 1:
        return <PersonalInfo formData={formData}  setFormData={setFormData} formErrors={formErrors}/>;
      case 2:
        return <PaymentInfo formData={formData} setFormData={setFormData} formErrors={formErrors}/>;
      case 3:
        return <ReservationSuccessful formData={formData} formErrors={formErrors}/>;
      default:
        return <ReservationInfo formData={formData}  setFormData={setFormData} formErrors={formErrors} availableDates={updatedAvailableDates} />;
    }
  };


    return (
        <div className="reservation-container">
            <div className="reservation-form">
                <h3>Form Progress</h3>
                <div className="dashboard">
                    <div
                      className="circle"
                      role="progressbar"
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
                  {formPage < formTitles.length - 1 ? (
                      <>
                        <button
                          className="back-btn"
                          onClick={handleBack}
                          disabled={formPage === 0}
                        >
                          Back
                        </button>
                        <button
                          className="next-btn"
                          onClick={handleNext}
                          disabled={formPage === formTitles.length - 1}
                        >
                          {formPage === formTitles.length - 2 ? "Submit" : "Next"}
                        </button>
                      </>
                    ) : (
                      <button
                        className="make-another-btn"
                        onClick={handleMakeAnotherReservation}
                      >
                        Make Another Reservation
                      </button>
                    )}                   
                </div>
            </div>
        </div>
    );
}

export default BookingPage;



// const validateCurrentStep = () => {
//   const fieldsToValidate = requiredFields[formPage] || [];

//   // Check if fields are filled
//   const areFieldsValid = fieldsToValidate.every(
//     (field) => formData[field] && formData[field].trim() !== ""
//   );

//   if (!areFieldsValid) {
//     alert("Please fill in all required fields.");
//     return false;
//   }

//   // Page specific validations
//   switch (formPage) {
//     case 0: // Reservation Info
//       const isGuestNumberValid = 
//           formData.guests && 
//           !isNaN(formData.guests) &&
//           parseInt(formData.guests) > 0;

//       if (!isGuestNumberValid) {
//         alert("Please enter a valid guest number.")
//         return false;
//       }
//       if (!formData.time) {
//         alert("Please select a valid time.")
//         return false;
//       }
//       break;
//     case 1: // Personal Info
//       const isPhoneValid = isValidPhoneNumber(formData.phoneNumber);
//       const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

//       if (!isPhoneValid) {
//         alert("Please enter a valid phone number.");
//         return false;
//       }

//       if (!isEmailValid) {
//         alert("Please enter a valid email address.");
//         return false;
//       }

//       if (
//         !formData.firstName.trim() ||
//         !formData.lastName.trim()
//       ) {
//         alert("Please provide your first and last name.");
//         return false;
//       }
//       break;
//     case 2: // Payment Info
//       const isCardNumberValid = /^\d{4} \d{4} \d{4} \d{4}$/.test(formData.cardNumber);
//       const isExpDateValid = /^\d{2}\/\d{2}$/.test(formData.expDate); // MM/YY format
//       const isCVVValid = /^\d{3}$/.test(formData.CVV);

//       if (!isCVVValid || !isCardNumberValid || !isExpDateValid) {
//         alert("Please enter a valid card.")
//         return false;
//       }
//       break;
//   }
//   return true; // All Validations passed
// };