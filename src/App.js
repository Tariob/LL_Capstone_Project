
import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Booking from './components/Booking';
import { Route, Routes, Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <Main />
    <Menu />
  </div>
);

const BookingPage = () => <Booking />;

const App = () => {
  console.log('App component rendered');
  return (
    <div>
      <Nav />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/booking">Booking</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
