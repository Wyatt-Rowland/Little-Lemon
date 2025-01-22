import React, {useState} from "react";
import { generateDaysForMonth, generateMonths, generateTimeSlots } from '../../utilities/dateUtils'

const ReservationInfo = ({ formData, setFormData, formErrors, availableDates, availableTimesMap, dispatch }) => {
  const today = new Date();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Update the year if the month changes
    if (name === "month") {
      const selectedYear = generateMonths().find((month) => month.name === value)?.year || today.getFullYear();
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        year: selectedYear, // Dynamically update the year
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


    return (
        <div className="reservation-info-grid">
              <div className="form-group">
                <label htmlFor="guests">Guest Number*</label>
                <select 
                  name="guests" 
                  id="guests" 
                  value={formData.guests} 
                  onChange={handleInputChange} 
                  className={`select ${formErrors.guests ? "input-error" : ""}`}
                >
                  <option>0</option>
                {[...Array(15)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                        ))}
                    </select>
                </div>
                    <div className="form-group">
                        <div className='date-time-container'>
                          <div className="date-time">
                            <label htmlFor="Day">Day</label>
                            <select
                              name="day"
                              id="day"
                              value={formData.day}
                              onChange={handleInputChange}
                              className="select"
                            >
                              {generateDaysForMonth(formData.month, formData.year).map((day) => (
                                <option key={day} value={day}>
                                  {day}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="date-time">
                            <label htmlFor="Month">Month</label>
                            <select
                              name="month"
                              id="month"
                              value={formData.month}
                              onChange={(e) => handleInputChange(e)}
                              className="select"
                            >
                              {generateMonths().map((monthInfo, index) => (
                                <option key={index} value={monthInfo.name}>
                                  {monthInfo.name} {monthInfo.year}
                                </option>
                              ))}
                            </select>

                            
                          </div>
                          <div className="date-time">
                            <label htmlFor="time">Time*</label>
                            <select name="time" id="time" value={formData.time} onChange={handleInputChange} className={`select ${formErrors.time ? "input-error" : ""}`}>
                              {generateTimeSlots(availableTimesMap, formData)}
                            </select>
                          </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Occasion">Occasion</label>
                        <select name="occasion" id="occasion" value={formData.occasion} onChange={handleInputChange} className="select">
                            <option value="Family Gathering">Family Gathering</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Date">Romantic Date</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="Occasion">Table Details</label>
                        <select name="tableDetails" id="table-details" value={formData.tableDetails} onChange={handleInputChange} className="select">
                            <option value="Table">Table</option>
                            <option value="Booth">Booth</option>
                            <option value="Outside Table">Outside Table</option>
                        </select>       
                    </div>
                    <div className="form-group">
                        <h4>All Reservations have a non-refundable $20 deposit</h4> 
                    </div>
                    <div className="form-group">
                        <h5>Fields marked with * are required</h5> 
                    </div>
                </div>
    );
}

export default ReservationInfo;


