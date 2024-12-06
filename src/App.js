import React, {useReducer} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import './css/header.css'
import './css/main.css'
import './css/hero.css'
import './css/specials.css'
import './css/testimonials.css'
import './css/booking.css'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Construction from './components/Construction';
import BookingPage from './components/BookingPage';
import { generateUnavailableDates, generateAvailability, generateTimeAvailability } from "./utilities/dateUtils"

// Reducer for managing available dates
const availableTimesReducer = (state, action) => {
  switch (action.type) {
    case "initialize":
      return action.payload; // Initialize state with pre-generated dates and times

    case "add":
      return [...state, action.payload]; // Add a new date
    case "remove":
      return state.filter(
        (date) =>
          date.time !== action.payload.time ||
          date.day !== action.payload.day ||
          date.month !== action.payload.month ||
          date.year !== action.payload.year
      ); // Remove a specific date
    default:
      return state; // Return the unchanged state for unknown actions
  }
};





function App() {
  const [availableDates, dispatch] = useReducer(availableTimesReducer, []);

  // Initialize the available dates on load
  React.useEffect(() => {
    const allDates = generateAvailability(4); // Generate dates for 4 months
    const unavailableDates = generateUnavailableDates(allDates, 50); // Mark 50 slots as unavailable
  
    // Filter out unavailable times
    const finalDates = allDates.map((date) => {
      const unavailable = unavailableDates.find(
        (uDate) =>
          uDate.day === date.day &&
          uDate.month === date.month &&
          uDate.year === date.year
      );
  
      const filteredTimes = unavailable
        ? date.times.filter((time) => !unavailable.times.includes(time))
        : date.times;
  
      return { ...date, times: filteredTimes };
    });
  
    dispatch({ type: "initialize", payload: finalDates });
  }, []);

  React.useEffect(() => {
    console.log("Available Dates Initialized:", availableDates);
  }, [availableDates]);

  const availableTimesMap = React.useMemo(() => {
    const map = new Map();
    availableDates.forEach((date) => {
      const key = `${date.day}-${date.month}-${date.year}`;
      map.set(key, date.times);
    });
    console.log("AvailableTimesMap:", map);
    return map;
  }, [availableDates]);
  


  return (
    <Router>
      <div role='grid' className='grid-container'>
        <Header className='header' />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Little-Lemon" element={<Main />} />
          <Route path="/about" element={<Construction />} />
          <Route path="/menu" element={<Construction />} />
          <Route path="/reservations" element={
            <BookingPage
                availableDates={availableDates}
                availableTimesMap={availableTimesMap}
                dispatch={dispatch}
              />
            }
          />
          <Route path="/order-online" element={<Construction />} />
          <Route path="/login" element={<Construction />} />
        </Routes>
        <Footer className='footer' />
      </div>
    </Router>
  );
}

export default App;




