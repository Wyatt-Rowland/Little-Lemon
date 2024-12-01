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

function App() {
  const [unavailableDates, setUnavailableDates] = useReducer([]);

  return (
    <Router>
      <div role='grid' className='grid-container'>
        <Header className='header' />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<Construction />} />
          <Route path="/menu" element={<Construction />} />
          <Route path="/reservations" element={
            <BookingPage
            unavailableDates={unavailableDates}
            setUnavailableDates={setUnavailableDates}
              />} />
          <Route path="/order-online" element={<Construction />} />
          <Route path="/login" element={<Construction />} />
        </Routes>
        <Footer className='footer' />
      </div>
    </Router>
  );
}

export default App;




