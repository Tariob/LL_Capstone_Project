import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Booking from "./Booking";
import ConfirmedBooking from "./ConfirmedBooking";
import Header from "./Header";

// Define fetchAPI function
const fetchAPI = function(date) {
    let result = [];
    // Placeholder logic
    for(let i = 17; i <= 23; i++) {
        result.push(i + ':00');
        result.push(i + ':30');
    }
    return result;
};

const Main = () => {
    const initialState = { availableTimes: fetchAPI(new Date()) }; // Initialize state using fetchAPI
    const [state, dispatch] = useReducer(updateTimes, initialState);

    function updateTimes(state, date) {
        return { availableTimes: fetchAPI(new Date(date)) };
    }

    function submitForm(formData) {
        // Placeholder logic for form submission
        console.log("Form submitted with data:", formData);
    }

    return (
        <Router>
            <main className="main">
                <Routes>
                    <Route path="/" element={<Header />} />
                    <Route path="/booking" element={<Booking availableTimes={state} dispatch={dispatch} submitForm={submitForm} />} />
                    <Route path="/confirmed" element={<ConfirmedBooking />} />
                </Routes>
            </main>
        </Router>
    );
}

export default Main;
