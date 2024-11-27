import React, {useState} from "react";

const ReservationInfo = ({ formData, setFormData }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateTimeSlots = () => {
    const times = [];
    const startHour = 8; // 8:00 am
    const endHour = 21; // 9:00 pm
  
    for (let i = startHour; i <= endHour; i++) {
      const period = i < 12 ? "am" : "pm";
      const hour = i % 12 === 0 ? 12 : i % 12;
      const timeString = `${hour}:00 ${period}`;
      times.push(
        <option key={i} value={i}>
          {timeString}
        </option>
      );
    }
  
    return times;
  };

    return (
        <div className="reservation-info-grid">
              <div className="form-group">
                <label htmlFor="Guest Number">Guest Numbers</label>
                <select name="guests" id="guests" value={formData.guests} onClick={handleInputChange} className="select">
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
                            <select name="day" id="day" value={formData.day} onClick={handleInputChange} className="select">
                              {[...Array(31)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="date-time">
                            <label htmlFor="Month">Month</label>
                            <select name="month" id="month" value={formData.month} onClick={handleInputChange} className="select">
                                <option value="Jan">January</option>
                                <option value="Feb">February</option>
                                <option value="Mar">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="Aug">August</option>                                
                                <option value="Sept">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                            </select>
                          </div>
                          <div className="date-time">
                            <label htmlFor="Time">Time</label>
                            <select name="time" id="time" value={formData.time} onClick={handleInputChange} className="select">
                              {generateTimeSlots()}
                            </select>
                          </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Occasion">Occasion</label>
                        <select name="occasion" id="occasion" value={formData.occasion} onClick={handleInputChange} className="select">
                            <option value="Birthday">Birthday</option>
                            <option value="Date">Romantic Date</option>
                            <option value="Family Gathering">Family Gathering</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="Occasion">Table Details</label>
                        <select name="table-details" id="table-details" value={formData.tableDetails} onClick={handleInputChange} className="select">
                            <option value="Table">Table</option>
                            <option value="Booth">Booth</option>
                            <option value="Outside Table">Outside Table</option>
                        </select>       
                    </div>
                    <div className="form-group">
                        <h4>All Reservations have a non-refundable deposit</h4> 
                    </div>
                </div>
    );
}

export default ReservationInfo;
