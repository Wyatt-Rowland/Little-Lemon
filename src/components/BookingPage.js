import React, {useState} from "react";
import ReservationInfo from './Reservation Pg/ReservationInfo.js'
import PersonalInfo from './Reservation Pg/PersonalInfo.js'
import PaymentInfo from './Reservation Pg/PaymentInfo.js'
import ReservationSuccessful from './Reservation Pg/ReservationSuccess.js'



const BookingPage = () => {
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

  const excludedKeys = ["month", "tableDetails", "day", "year", "occasion", "contactMethod"];


  const validKeys = Object.keys(formData).filter((key) => !excludedKeys.includes(key));

  const totalInputs = validKeys.length; // Count only keys not excluded
  
  const completedInputs = validKeys.filter((key) => {
    const value = formData[key];
    return typeof value === "string" && value.trim() !== "";
  }).length;
  
  const progressPercent = Math.min((completedInputs / totalInputs) * 100, 100);

  console.log(completedInputs, totalInputs)


  const handleNext = () => {
    setFormPage((prevPage) => prevPage + 1);
  };

  const handleBack = () => {
    setFormPage((prevPage) => Math.max(prevPage - 1, 0)); // Prevent going below 0
  };


  // Titles for each page
  const formTitles = ["Reservation Information", "Personal Information", "Payment Information", "!"]; // Add more titles as needed


  const renderFormStep = () => {
    switch (formPage) {
      case 0:
        return <ReservationInfo formData={formData} setFormData={setFormData} />;
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
                      onClick={handleNext}
                      disabled={formPage === 0} // Adjust for the last page
                    >Back</button>
                    <button
                      className={`next-btn ${progressPercent === 100 ? "glow-button" : ""}`}
                      onClick={handleNext}
                      disabled={formPage === formTitles.length - 1} // Adjust for the last page
                    >Next</button>                    
                  </div>

            </div>
        </div>
    );
}

export default BookingPage;
