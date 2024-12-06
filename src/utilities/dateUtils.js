// date.Utils.js

// Please keep all comments


  // Get current time as the placeholder, then check the times map and provide available hours.  used in ReservationInfo.js
 export const generateTimeSlots = (availableTimesMap, formData) => {

    if (!formData || !formData.day || !formData.month || !formData.year) {
      return [
        <option key="no-date" value="" disabled>
          Date
        </option>,
      ];
    }
    const key = `${formData.day}-${formData.month}-${formData.year}`;
        console.log("Key for availableTimesMap lookup:", key);
        console.log("Available Times for Key:", availableTimesMap.get(key));
    const availableTimes = availableTimesMap.get(key) || [];
  
    const currentTime = new Date();
    const formattedCurrentTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  
    // Add the placeholder with the current time
    const times = [
      <option key="placeholder" value="" disabled>
        {formattedCurrentTime}
      </option>,
    ];
  
    // Render available times for the selected date
    times.push(
      ...availableTimes.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))
    );
  
    // If no available times, show "No available times"
    if (availableTimes.length === 0) {
      times.push(
        <option key="no-slots" value="" disabled>
          No available times for the selected day
        </option>
      );
    }
  
    return times;
  };
  

// Generate months for months available to reserve. Used in ReservationInfo.js
export const generateMonths = () => {
    const today = new Date();
    const months = [];
    const currentMonthIndex = today.getMonth();
    const currentYear = today.getFullYear();

    for (let i = 0; i < 4; i++) {
      const monthIndex = (currentMonthIndex + i) % 12;
      const year = currentYear + Math.floor((currentMonthIndex + i) / 12);

      months.push({
        name: new Date(year, monthIndex).toLocaleString("default", { month: "short" }),
        year: year.toString(),
      });
    }

    return months;
  };

  // Generate days in a month to be able to reserve. Used in ReservationInfo.js

  export const generateDaysForMonth = (selectedMonth, selectedYear) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to midnight

    if (!selectedMonth || !selectedYear) {
      console.warn("Invalid month or year:", { selectedMonth, selectedYear });
      return [];
    }

    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    const currentYear = today.getFullYear();

    const monthIndex = new Date(`${selectedMonth} 1, ${selectedYear}`).getMonth();
    const isCurrentMonthAndYear = monthIndex === currentMonth && selectedYear === currentYear;

    const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();

    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(selectedYear, monthIndex, day);
        date.setHours(0, 0, 0, 0); // Normalize the date

    // Skip past days
    if (date < today) continue;

    days.push(day);
    }

    return days;
  };
  
  

  // Used in App.js to generate times that could be available.

  export const generateTimeAvailability = (startTime, endTime, isToday = false) => {
    const times = [];
    const currentTime = new Date();
  
    for (let hour = startTime; hour <= endTime; hour++) {
      const period = hour < 12 ? "AM" : "PM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  
      // If it's today, filter out past times
      if (isToday) {
        const currentHour = currentTime.getHours();
        const isFutureHour = hour > currentHour;
  
        if (isFutureHour) {
          times.push(`${formattedHour}:00 ${period}`);
        } else if (hour === currentHour) {
          const currentMinutes = currentTime.getMinutes();
          times.push(`${formattedHour}:${currentMinutes < 30 ? "30" : "00"} ${period}`);
        }
      } else {
        // For future dates, include all time slots
        times.push(`${formattedHour}:00 ${period}`);
      }
    }
  
    return times;
  };
  // Used in App.js to generate days that could be available. 
 export const generateAvailability = (monthsAhead) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const months = Array.from({ length: monthsAhead }, (_, i) => {
      const date = new Date(today.getFullYear(), today.getMonth() + i);
      return { name: date.toLocaleString("default", { month: "short" }), year: date.getFullYear().toString() };
    });
  
    const allDates = [];
  
    months.forEach(({ name: month, year }) => {
      const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
      const maxDays = new Date(year, monthIndex + 1, 0).getDate();
  
    //   for (let day = 1; day <= maxDays; day++) {
    for (let day = 1; day <= maxDays; day++) {
        const date = new Date(`${month} ${day}, ${year}`);
        date.setHours(0, 0, 0, 0); // Normalize to midnight for accurate comparison

        // Skip dates that are in the past
        if (date < today) continue;
            
        const isToday =
          today.getDate() === day &&
          today.toLocaleString("default", { month: "short" }) === month &&
          today.getFullYear().toString() === year;
  
        allDates.push({
          day: day.toString(),
          month,
          year,
          times: generateTimeAvailability(8, 21, isToday), // Pass isToday flag
        });
      }
    });
  
    return allDates;
  };
  
  

  // Used in App.js to generate random times some day that are already booked. 
  export const generateUnavailableDates = (allDates, count) => {
    const unavailableDates = [];
    const totalDates = allDates.length;
  
    while (unavailableDates.length < count) {
      const randomIndex = Math.floor(Math.random() * totalDates); // Randomly pick a date
      const randomDate = allDates[randomIndex];
      const randomTime = randomDate.times[Math.floor(Math.random() * randomDate.times.length)]; // Randomly pick a time for that date
  
      // Check if the date already exists in the unavailableDates list
      const existingDate = unavailableDates.find(
        d => d.day === randomDate.day && d.month === randomDate.month && d.year === randomDate.year
      );
  
      if (existingDate) {
        // Add the randomTime if it's not already included
        if (!existingDate.times.includes(randomTime)) {
          existingDate.times.push(randomTime);
        }
      } else {
        // Add a new unavailable date with the randomTime
        unavailableDates.push({
          ...randomDate,
          times: [randomTime], // Initialize with the first unavailable time
        });
      }
    }
  
    return unavailableDates;
  };
  
  
  
  