import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm, { validateField } from './Booking';

test('date input should have required attribute', () => {
  render(<BookingForm availableTimes={[]} dispatch={() => {}} />);
  const dateInput = screen.getByLabelText(/choose date/i);
  expect(dateInput).toBeRequired();
});

test('time select should have required attribute', () => {
  render(<BookingForm availableTimes={[]} dispatch={() => {}} />);
  const timeSelect = screen.getByLabelText(/choose time/i);
  expect(timeSelect).toBeRequired();
});

test('guests input should have required, min, and max attributes', () => {
  render(<BookingForm availableTimes={[]} dispatch={() => {}} />);
  const guestsInput = screen.getByLabelText(/number of guests/i);
  expect(guestsInput).toBeRequired();
  expect(guestsInput).toHaveAttribute('min', '1');
  expect(guestsInput).toHaveAttribute('max', '10');
});

test('valid date input should pass validation', () => {
  const errors = {};
  validateField('date', '2023-10-01', errors);
  expect(errors.date).toBe('');
});

test('empty date input should fail validation', () => {
  const errors = {};
  validateField('date', '', errors);
  expect(errors.date).toBe('Date is required');
});

test('valid time input should pass validation', () => {
  const errors = {};
  validateField('time', '18:00', errors);
  expect(errors.time).toBe('');
});

test('empty time input should fail validation', () => {
  const errors = {};
  validateField('time', '', errors);
  expect(errors.time).toBe('Time is required');
});

test('valid guests input should pass validation', () => {
  const errors = {};
  validateField('guests', '2', errors);
  expect(errors.guests).toBe('');
});

test('invalid guests input should fail validation', () => {
  const errors = {};
  validateField('guests', '0', errors);
  expect(errors.guests).toBe('At least 1 guest is required');
});

test('form should be invalid if required fields are empty', () => {
  render(<BookingForm availableTimes={[]} dispatch={() => {}} />);
  const submitButton = screen.getByRole('button', { name: /make your reservation/i });
  const dateInput = screen.getByLabelText(/choose date/i);
  const timeSelect = screen.getByLabelText(/choose time/i);

  fireEvent.change(dateInput, { target: { value: '' } });
  fireEvent.change(timeSelect, { target: { value: '' } });

  expect(submitButton).toBeDisabled();
});
