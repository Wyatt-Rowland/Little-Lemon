// date.Utils.js

// Please keep all comments


// Key for local storage
const CACHE_KEY = "reservation_cache";

// Get cache from local storage
export const getCache = () => {
  const cache = localStorage.getItem(CACHE_KEY);
  return cache ? JSON.parse(cache) : {};
};

// Save cache to local storage
export const saveCache = (cache) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

// Add unavailable times to the cache
export const addUnavailableToCache = (day, month, year, time) => {
  const cache = getCache();
  const key = `${day}-${month}-${year}`;

  if (!cache[key]) {
    cache[key] = [];
  }

  if (!cache[key].includes(time)) {
    cache[key].push(time);
  }

  saveCache(cache);
};

// Get unavailable times from the cache for a specific date
export const getUnavailableFromCache = (day, month, year) => {
  const cache = getCache();
  const key = `${day}-${month}-${year}`;
  return cache[key] || [];
};



export const generateTimeSlots = (availableTimesMap, formData) => {
  if (!availableTimesMap || typeof availableTimesMap.get !== 'function') {
    console.warn("availableTimesMap is not initialized or invalid.");
    return [
      <option key="loading" value="" disabled>
        Loading...
      </option>,
    ];
  }

  if (!formData || !formData.day || !formData.month || !formData.year) {
    return [
      <option key="no-date" value="" disabled>
        Date
      </option>,
    ];
  }

  const key = `${formData.day}-${formData.month}-${formData.year}`;
  const availableTimes = availableTimesMap.get(key) || [];
  const currentTime = new Date();
  const isToday = 
    formData.year === currentTime.getFullYear().toString() &&
    formData.month === currentTime.toLocaleString("default", { month: "short" }) &&
    parseInt(formData.day) === currentTime.getDate();

  const filteredTimes = isToday
    ? availableTimes.filter((time) => {
        const [hour, minutePeriod] = time.split(/:| /);
        const hour24 = minutePeriod === "AM" 
          ? parseInt(hour) % 12 
          : (parseInt(hour) % 12) + 12;

        const timeDate = new Date();
        timeDate.setHours(hour24, 0, 0, 0);

        return timeDate.getTime() - currentTime.getTime() >= 2 * 60 * 60 * 1000; // 2 hours ahead
      })
    : availableTimes;

  const formattedCurrentTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const times = [
    <option key="placeholder" value="" disabled>
      {` ${formattedCurrentTime}`}
    </option>,
  ];

  times.push(
    ...filteredTimes.map((time) => (
      <option key={time} value={time}>
        {time}
      </option>
    ))
  );

  if (filteredTimes.length === 0) {
    times.push(
      <option key="no-slots" value="" disabled>
        None Available
      </option>
    );
  }

  return times;
};
  

  // Used in App.js to generate times that could be available.

  export const generateTimeAvailability = (startTime, endTime) => {
    const times = [];
    
    for (let hour = startTime; hour <= endTime; hour++) {
      const period = hour < 12 ? "AM" : "PM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  
      times.push(`${formattedHour}:00 ${period}`);
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
    // console.log("Generated Months:", months); // Debug: Ensure months include 2025

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
    // console.log("Generated Days for Month:", { selectedMonth, selectedYear, days }); // Debug

    return days;
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


      // Get unavailable times from cache
      const unavailableTimes = getUnavailableFromCache(day.toString(), month, year);

      const availableTimes = [
        ...generateTimeAvailability(10, 12, isToday), // Morning times
        ...generateTimeAvailability(16, 21, isToday), // Evening times
      ].filter((time) => !unavailableTimes.includes(time)); // Exclude cached unavailable times
      
    //   const availableTimes = isToday
    //   ? [
    //       ...generateTimeAvailability(10, 12, true), // Morning times for today
    //       ...generateTimeAvailability(16, 21, true), // Evening times for today
    //     ]
    //   : [
    //       ...generateTimeAvailability(10, 12, false), // Morning times for future dates
    //       ...generateTimeAvailability(16, 21, false), // Evening times for future dates
    //     ];

      allDates.push({
        day: day.toString(),
        month,
        year,
        times: availableTimes,
      });
    }
  });

  return allDates;
};

export const countUnavailableSlots = () => {
  const cache = getCache();
  return Object.values(cache).reduce((count, times) => count + times.length, 0);
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
  
    // console.log("Optimized Unavailable Dates:", unavailableDates);
    return unavailableDates;
  };
  
  


//   const availableTimes = isToday
//   ? [
//       ...generateTimeAvailability(10, 12, true), // Morning times for today
//       ...generateTimeAvailability(16, 21, true), // Evening times for today
//     ]
//   : [
//       ...generateTimeAvailability(10, 12, false), // Morning times for future dates
//       ...generateTimeAvailability(16, 21, false), // Evening times for future dates
//     ];

// // Exclude cached unavailable times
// const filteredTimes = availableTimes.filter((time) => !unavailableTimes.includes(time));
  


  
// This is for a fake API. Querying https://raw.githubusercontent.com/courseraap/capstone/main/api.js was just returning an undefined function. 
// const seededRandom = function (seed) {
//   var m = 2**35 - 31;
//   var a = 185852;
//   var s = seed % m;
//   return function () {
//       return (s = s * a % m) / m;
//   };
// }

// export const fetchAPI = function(date) {
//   let result = [];
//   let random = seededRandom(date.getDate());

//   for(let i = 11; i <= 23; i++) {
//       if(random() < 0.5) {
//           result.push(i + ':00');
//       }
//       if(random() < 0.5) {
//           result.push(i + ':30');
//       }
//   }
//   return result;
// };
// export const submitAPI = function(formData) {
//   return true;
// };