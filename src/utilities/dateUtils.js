// date.Utils.js

// Please keep all comments

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
  const isToday = formData.year === currentTime.getFullYear().toString() &&
                  formData.month === currentTime.toLocaleString("default", { month: "short" }) &&
                  parseInt(formData.day) === currentTime.getDate();

  // Filter times if it's today
  const filteredTimes = isToday
    ? availableTimes.filter((time) => {
        const [hour, minutePeriod] = time.split(/:| /);
        const hour24 = minutePeriod === "PM" && parseInt(hour) !== 12
          ? parseInt(hour) + 12
          : parseInt(hour) === 12 && minutePeriod === "AM"
          ? 0
          : parseInt(hour);

        const timeDate = new Date();
        timeDate.setHours(hour24, 0, 0, 0); // Set the time from the slot

        // Check if the time is at least 3 hours ahead of current time
        return timeDate.getTime() - currentTime.getTime() >= 3 * 60 * 60 * 1000;
      })
    : availableTimes;

  const formattedCurrentTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Add the placeholder with the current time
  const times = [
    <option key="placeholder" value="" disabled>
      {` ${formattedCurrentTime}`}
    </option>,
  ];

  // Render available times for the selected date
  times.push(
    ...filteredTimes.map((time) => (
      <option key={time} value={time}>
        {time}
      </option>
    ))
  );

  // If no available times, show "No available times"
  if (filteredTimes.length === 0) {
    times.push(
      <option key="no-slots" value="" disabled>
        None Available
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
    console.log("Generated Months:", months); // Debug: Ensure months include 2025

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
    console.log("Generated Days for Month:", { selectedMonth, selectedYear, days }); // Debug

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
      return { 
        name: date.toLocaleString("default", { month: "short" }), 
        year: date.getFullYear().toString() 
      };    });
  
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
    // Flatten all time slots into a single array for accurate randomization
    const allTimeSlots = allDates.flatMap((date) =>
      date.times.map((time) => ({
        ...date,
        times: [time], // Keep a single time per slot for this flattened structure
      }))
    );
  
    const totalTimeSlots = allTimeSlots.length;
  
    if (count > totalTimeSlots) {
      console.warn(`Count (${count}) exceeds total available time slots (${totalTimeSlots}). Adjusting to maximum possible.`);
      count = totalTimeSlots;
    }
  
    const unavailableSlotsSet = new Set(); // Track unavailable slots
    const unavailableDatesMap = new Map(); // Group unavailable slots by date
  
    while (unavailableSlotsSet.size < count) {
      const randomIndex = Math.floor(Math.random() * totalTimeSlots); // Randomly pick a time slot
      const randomSlot = allTimeSlots[randomIndex];
  
      const slotKey = `${randomSlot.day}-${randomSlot.month}-${randomSlot.year}-${randomSlot.times[0]}`; // Unique key for this slot
  
      if (!unavailableSlotsSet.has(slotKey)) {
        unavailableSlotsSet.add(slotKey);
  
        const dateKey = `${randomSlot.day}-${randomSlot.month}-${randomSlot.year}`;
        if (!unavailableDatesMap.has(dateKey)) {
          unavailableDatesMap.set(dateKey, { ...randomSlot, times: [] });
        }
  
        // Add the time to the corresponding date's unavailable list
        unavailableDatesMap.get(dateKey).times.push(randomSlot.times[0]);
      }
    }
  
    // Convert the map back to an array format
    const unavailableDates = Array.from(unavailableDatesMap.values());
  
    console.log("Optimized Unavailable Dates:", unavailableDates);
    return unavailableDates;
  };
  
  
  