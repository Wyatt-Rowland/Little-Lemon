import React, {useState} from "react";

const PaymentInfo = ({ formData, setFormData }) => {
    const [formPage, setFormPage] = useState();

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Mask for expiration date (MM/YY)
        if (name === "expDate") {
            let maskedValue = value.replace(/[^\d]/g, ""); // Remove non-numeric characters
            if (maskedValue.length > 2) {
            maskedValue = maskedValue.slice(0, 2) + "/" + maskedValue.slice(2, 4); // Add '/'
            }
            if (maskedValue.length > 5) maskedValue = maskedValue.slice(0, 5); // Limit to MM/YY
            setFormData((prev) => ({ ...prev, [name]: maskedValue }));
            return;
        }


        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    return (
        <div className="payment-info-grid">
        <div className="form-group card-name-container">
          <label htmlFor="cardName">Name on Card*</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={formData.cardName || ""}
            onChange={handleInputChange}
            placeholder="Name on Card"
            required
          />
        </div>
  
        <div className="form-group cardNumber">
          <label htmlFor="cardNumber">Card Number*</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber || ""}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
            maxLength="19" // For card number format
            inputMode="numeric" // Brings up numeric keyboard on mobile devices
            required
          />
        </div>
  
        <div className="form-group exp-date">
          <label htmlFor="expDate">Expiration Date*</label>
          <input
            type="text"
            id="expDate"
            name="expDate"
            value={formData.expDate || ""}
            onChange={handleInputChange}
            placeholder="MM/YY"
            maxLength="5" // To ensure format matches "MM/YY"
            pattern="(0[1-9]|1[0-2])\/\d{2}" // Regex for valid MM/YY format
            title="Enter a valid expiration date in MM/YY format"
            required
          />
        </div>
  
        <div className="form-group cvv">
          <label htmlFor="CVV">CVV*</label>
          <input
            type="password" // Mask the CVV
            id="CVV"
            name="CVV"
            value={formData.CVV || ""}
            onChange={handleInputChange}
            placeholder="XXX"
            maxLength="4" // Some cards like AmEx have 4 digits
            inputMode="numeric"
            required
          />
        </div>
      </div>
    );
}

export default PaymentInfo;
