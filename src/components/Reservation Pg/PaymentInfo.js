import React, {useState} from "react";

const PaymentInfo = ({ formData, setFormData, formErrors }) => {
    const [formPage, setFormPage] = useState();

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "cardNumber") {
          // Remove non-numeric characters and add spaces every 4 digits
          let formattedValue = value.replace(/[^\d]/g, ""); // Remove non-numeric characters
          formattedValue = formattedValue.match(/.{1,4}/g)?.join(" ") || formattedValue; // Add spaces every 4 digits
          if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19); // Limit to 19 characters (16 digits + 3 spaces)
          setFormData((prev) => ({ ...prev, [name]: formattedValue }));
          return;
        }

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
        <fieldset className="payment-info-grid">
          <div className="form-group card-name-container">
            <label htmlFor="cardName">Name on Card*</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              className={formErrors.cardName ? "input-error" : ""}
              value={formData.cardName || ""}
              onChange={handleInputChange}
              placeholder="Name on Card"
              aria-invalid={!!formErrors.cardName}
              aria-describedby="cardNameError"
              aria-required="true"
              required
            />
            {formErrors.cardName && (
              <span id="cardNameError" className="error-message" role="alert">
                {formErrors.cardName}
              </span>
            )}
          </div>

          <div className="form-group cardNumber">
            <label htmlFor="cardNumber">Card Number*</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className={formErrors.cardNumber ? "input-error" : ""}
              value={formData.cardNumber || ""}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19" // For card number format
              inputMode="numeric" // Brings up numeric keyboard on mobile devices
              aria-invalid={!!formErrors.cardNumber}
              aria-describedby="cardNumberError"
              aria-required="true"
              required
            />
            {formErrors.cardNumber && (
              <span id="cardNumberError" className="error-message" role="alert">
                {formErrors.cardNumber}
              </span>
            )}            
          </div>

          <div className="form-group exp-date">
            <label htmlFor="expDate">Expiration Date*</label>
            <input
              type="text"
              id="expDate"
              name="expDate"
              className={formErrors.expDate ? "input-error" : ""}
              value={formData.expDate || ""}
              onChange={handleInputChange}
              placeholder="MM/YY"
              maxLength="5" // To ensure format matches "MM/YY"
              pattern="(0[1-9]|1[0-2])\/\d{2}" // Regex for valid MM/YY format
              title="Enter a valid expiration date in MM/YY format"
              aria-invalid={!!formErrors.expDate}
              aria-describedby="expDateError"              
              aria-required="true"
              required
            />
            {formErrors.expDate && (
              <span id="expDateError" className="error-message" role="alert">
                {formErrors.expDate}
              </span>
            )}
          </div>

          <div className="form-group cvv">
            <label htmlFor="CVV">CVV*</label>
            <input
              type="password" // Mask the CVV
              id="CVV"
              name="CVV"
              value={formData.CVV || ""}
              className={formErrors.CVV ? "input-error" : ""}
              onChange={handleInputChange}
              placeholder="XXX"
              maxLength="4" // Some cards like AmEx have 4 digits
              inputMode="numeric"
              aria-invalid={!!formErrors.CVV}
              aria-describedby="CVVError"
              aria-required="true"
              required
            />
            {formErrors.CVV && (
              <span id="CVVError" className="error-message" role="alert">
                {formErrors.CVV}
              </span>
            )}
          </div>
      </fieldset>
    );
}

export default PaymentInfo;
