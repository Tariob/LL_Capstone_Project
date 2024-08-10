import React, { useReducer, useEffect } from 'react';
import BookingForm from './Booking';

const fetchAvailableTimes = async (date) => {
  try {
    const times = await fetchAPI(date);
    return times;
  } catch (error) {
    console.error('Error fetching available times:', error);
    return [];
  }
};

const initializeTimes = async () => {
  const today = new Date().toISOString().split('T')[0];
  return await fetchAvailableTimes(today);
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'update_times':
      return action.times; // Ensure this returns the new times array
    default:
      return state;
  }
};

const BookingPage = () => {
  const [availableTimes, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const loadTimes = async () => {
      const times = await initializeTimes();
      dispatch({ type: 'update_times', times });
    };
    loadTimes();
  }, []);

  return (
    <div>
      <h1>Book a Table</h1>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </div>
  );
};

export default BookingPage;
