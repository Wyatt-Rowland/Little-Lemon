import React from 'react';
import './App.css';
import './index.css';
import './header.css'
import './main.css'
import './hero.css'
import './specials.css'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div role='grid' className='grid-container'>
        <Header className='header' />
        <Main className='main'/>
        <Footer className='footer' />
      </div>
    </>
  );
}

export default App;
