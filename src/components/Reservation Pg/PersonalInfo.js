import React, { useState } from "react";

const PersonalInfo = ({ formData, setFormData }) => {

    // Helper to format phone number
    const formatPhoneNumber = (phone) => {
      const cleanedPhone = phone.replace(/[^0-9]/g, ""); // Remove all non-numeric characters
      
      if (cleanedPhone.length === 10) {
        // Format 10-digit number as (111) 222-3333
        return `(${cleanedPhone.slice(0, 3)}) ${cleanedPhone.slice(3, 6)}-${cleanedPhone.slice(6)}`;
      } else if (cleanedPhone.length === 11) {
        // Format 11-digit number as +1 (222) 333-4444
        return `+${cleanedPhone[0]} (${cleanedPhone.slice(1, 4)}) ${cleanedPhone.slice(4, 7)}-${cleanedPhone.slice(7)}`;
      } else if (cleanedPhone.length === 12) {
        // Format 12-digit number as +11 (222) 333-4444
        return `+${cleanedPhone.slice(0, 2)} (${cleanedPhone.slice(2, 5)}) ${cleanedPhone.slice(5, 8)}-${cleanedPhone.slice(8)}`;
      }
      return phone; // Return as-is if not 10, 11, or 12 digits
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      // Format as user types
      const formattedPhone = formatPhoneNumber(value);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedPhone,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="personal-info-grid">
      <div className="form-group">
        <label htmlFor="firstName">First Name*</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Enter your first name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name*</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Enter your last name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number*</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="+1 (111) 222 3333"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <div className="contact-method">
          <label htmlFor="method">Preferred Contact Method</label>
          <select
            className="select"
            name="contactMethod"
            id="method"
            value={formData.contactMethod}
            onChange={handleInputChange}
          >
            <option value="phone">Phone</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
