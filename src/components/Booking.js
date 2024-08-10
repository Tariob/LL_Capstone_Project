import React, { useState, useEffect } from 'react';

const BookingForm = ({ availableTimes, dispatch }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData((prevData) => ({ ...prevData, date: today }));
    dispatch({ type: 'update_times', date: today });
  }, [dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));

    if (id === 'date') {
      dispatch({ type: 'update_times', date: value });
    }

    validateField(id, value, formErrors);
  };

  const validateField = (id, value, errors) => {
    switch (id) {
      case 'date':
        errors.date = value ? '' : 'Date is required';
        break;
      case 'time':
        errors.time = value ? '' : 'Time is required';
        break;
      case 'guests':
        errors.guests = value < 1 ? 'At least 1 guest is required' : '';
        break;
      default:
        break;
    }

    setFormErrors(errors);
    setIsFormValid(Object.values(errors).every((error) => error === ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert('Please fill out all fields correctly.');
      return;
    }

    try {
      const response = await submitAPI(formData);
      if (response) {
        alert('Reservation successful!');
      } else {
        alert('Failed to make a reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Failed to make a reservation due to an error. Please try again.');
    }
  };

  return (
    <form style={{ display: 'grid', maxWidth: '200px', gap: '20px' }} onSubmit={handleSubmit}>
      <label htmlFor="date">Choose date</label>
      <input
        type="date"
        id="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      {formErrors.date && <span style={{ color: 'red' }}>{formErrors.date}</span>}

      <label htmlFor="time">Choose time</label>
      <select
        id="time"
        value={formData.time}
        onChange={handleChange}
        required
      >
        <option value="">Select a time</option>
        {availableTimes.map((time) => (
          <option key={time} value={time}>{time}</option>
        ))}
      </select>
      {formErrors.time && <span style={{ color: 'red' }}>{formErrors.time}</span>}

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        value={formData.guests}
        min="1"
        max="10"
        onChange={handleChange}
        required
      />
      {formErrors.guests && <span style={{ color: 'red' }}>{formErrors.guests}</span>}

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={formData.occasion}
        onChange={handleChange}
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <input
        type="submit"
        value="Make Your reservation"
        disabled={!isFormValid}
      />
    </form>
  );
};

export default BookingForm;

