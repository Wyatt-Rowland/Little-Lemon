import React, {useState} from "react";

const ReservationInfo = ({ formData, setFormData }) => {
  const today = new Date();
  const initialMonth = today.toLocaleString("default", { month: "short" });
  const initialYear = today.getFullYear();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const generateMonths = () => {
    const months = [];
    const currentMonthIndex = today.getMonth();
    const currentYear = today.getFullYear();

    for (let i = 0; i < 3; i++) {
      const monthIndex = (currentMonthIndex + i) % 12;
      const year = currentYear + Math.floor((currentMonthIndex + i) / 12);

      months.push({
        name: new Date(year, monthIndex).toLocaleString("default", { month: "short" }),
        year,
      });
    }

    return months;
  };

  const generateDaysForMonth = (selectedMonth, selectedYear) => {
    if (!selectedMonth || !selectedYear) {
      console.warn("Invalid month or year:", { selectedMonth, selectedYear });
      return [];
    }

    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const monthIndex = new Date(`${selectedMonth} 1, ${selectedYear}`).getMonth();
    const isCurrentMonth = monthIndex === currentMonth && selectedYear === today.getFullYear();

    const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();

    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      if (isCurrentMonth && day < currentDay) continue;
      days.push(day);
    }

    return days;
  };

  const generateTimeSlots = () => {
    const times = [];
    const startHour = 8; // 8:00 AM
    const endHour = 21; // 9:00 PM
  
    const selectedDate = new Date(`${formData.month} ${formData.day}, ${formData.year}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time from today
  
    const isToday = selectedDate.toDateString() === today.toDateString();
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 3); // Add 3 hours to the current time
    const currentHour = isToday ? currentTime.getHours() : startHour;
  
    for (let i = currentHour; i <= endHour; i++) {
      const period = i < 12 ? "AM" : "PM";
      const hour = i % 12 === 0 ? 12 : i % 12;
      const timeString = `${hour}:00 ${period}`;
      times.push(
        <option key={i} value={timeString}>
          {timeString}
        </option>
      );
    }
  
    if (times.length === 0) {
      times.push(
        <option key="no-slots" value="" disabled>
          No available times for the selected day
        </option>
      );
    }
  
    return times;
  };
  
  const months = generateMonths();
  const selectedYear = months.find((m) => m.name === formData.month)?.year || today.getFullYear();


    return (
        <div className="reservation-info-grid">
              <div className="form-group">
                <label htmlFor="Guest Number">Guest Number*</label>
                <select name="guests" id="guests" value={formData.guests} onChange={handleInputChange} className="select">
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
                            {/* <select name="day" id="day" value={formData.day} onChange={handleInputChange} className="select">
                              {[...Array(31)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select> */}
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
                            <label htmlFor="Time">Time*</label>
                            <select name="time" id="time" value={formData.time} onChange={handleInputChange} className="select">
                              <option>0:00</option>
                              {generateTimeSlots()}
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
