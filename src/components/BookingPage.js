import React, { useState } from "react";
import ReservationInfo from './Reservation Pg/ReservationInfo';
import PersonalInfo from './Reservation Pg/PersonalInfo';
import PaymentInfo from './Reservation Pg/PaymentInfo';
import ReservationSuccessful from './Reservation Pg/ReservationSuccess';

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

  const requiredFields = {
    0: ["guests", "day", "month", "time"], // Required fields for ReservationInfo
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
  

  const validateCurrentStep = () => {
    const fieldsToValidate = requiredFields[formPage] || [];
    return fieldsToValidate.every((field) => formData[field].trim() !== "");
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

  const handleFormSubmit = () => {
    const { day, month, year, time } = formData;

    const key = `${day}-${month}-${year}`;
    const availableTimes = availableTimesMap.get(key) || [];

    if (!availableTimes.includes(time)) {
      alert("This date and time are no longer available. Please choose another slot.");
      return false; // Prevent further action
    }

    // Remove the selected slot from availableDates
    dispatch({ type: "book", payload: { day, month, year, time } });
  };

  const formTitles = ["Reservation Information", "Personal Information", "Payment Information", "!"];
  console.log(formData)

  const renderFormStep = () => {
    switch (formPage) {
      case 0:
        return <ReservationInfo formData={formData} setFormData={setFormData}                 
          availableDates={availableDates}
          availableTimesMap={availableTimesMap}
          dispatch={dispatch} />;
      case 1:
        return <PersonalInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <PaymentInfo formData={formData} setFormData={setFormData} />;
      case 3:
        return <ReservationSuccessful formData={formData} />;
      default:
        return <ReservationInfo formData={formData} setFormData={setFormData} availableDates={availableDates} />;
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
