import React, {useState} from "react";
import ReservationInfo from './Reservation Pg/ReservationInfo.js'
import PersonalInfo from './Reservation Pg/PersonalInfo.js'
import PaymentInfo from './Reservation Pg/PaymentInfo.js'
import ReservationSuccessful from './Reservation Pg/ReservationSuccess.js'



const BookingPage = () => {
  const [formPage, setFormPage] = useState(0);

  // Centralized form state
  const [formData, setFormData] = useState({
    guests: "",
    day: "",
    month: "",
    time: "",
    occasion: "",
    tableDetails: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const totalInputs = Object.keys(formData).length; // Total inputs for progress calculation
  const completedInputs = Object.values(formData).filter((value) => value.trim() !== "").length;
  const progressPercent = Math.min((completedInputs / totalInputs) * 100, 100);

  const handleNext = () => {
    setFormPage((prevPage) => prevPage + 1);
  };

  const handleBack = () => {
    setFormPage((prevPage) => Math.max(prevPage - 1, 0)); // Prevent going below 0
  };


  // Titles for each page
  const formTitles = ["Reservation Information", "Personal Information", "Payment Information", "Reservation Successful!"]; // Add more titles as needed


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
                      <div class="wrap-circles">
                        <div class="circle"
                          style={{
                            backgroundImage: `conic-gradient(#B5838D ${progressPercent}%, #FFCDB2 0%)`,
                          }}>
                          <div className="inner">{Math.round(progressPercent)}%</div>
                        </div>
                      </div>
                </div>

                <h3>{formTitles[formPage]}</h3>
                <form className="form-inputs">
                {renderFormStep()}                    
                  </form>
                  <div className="flex-center buttons">
                    <button 
                      className="back-btn"
                      onClick={handleBack} 
                      disabled={formPage === 0} // Disable if on the first page
                    
                    >Back</button>
                    <button
                      onClick={handleNext} 
                      disabled={formPage === formTitles.length - 1} // Adjust for the last page
                    >Next</button>                    
                  </div>

            </div>
        </div>
    );
}

export default BookingPage;
