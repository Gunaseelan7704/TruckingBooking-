import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

function App() {
    const [bookings, setBookings] = useState([]);
    const [formData, setFormData] = useState({
        truckType: '',
        pickupLocation: '',
        dropoffLocation: '',
        cargoDetails: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token,
                }
            };
            await axios.post('/api/bookings', formData, config);
            setFormData({
                truckType: '',
                pickupLocation: '',
                dropoffLocation: '',
                cargoDetails: ''
            });
            fetchBookings();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token,
                }
            };
            const res = await axios.get('/api/bookings', config);
            if (Array.isArray(res.data)) {
                setBookings(res.data);
            } else {
                setBookings([]);
            }
        } catch (error) {
            console.error(error);
            setBookings([]);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="app-container">
            <h1 className="heading">Truck Cargo Booking</h1>
            <div className="content">
                <form onSubmit={handleSubmit} className="booking-form">
                    <input
                        type="text"
                        placeholder="Truck Type"
                        value={formData.truckType}
                        onChange={e => setFormData({ ...formData, truckType: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Pickup Location"
                        value={formData.pickupLocation}
                        onChange={e => setFormData({ ...formData, pickupLocation: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Dropoff Location"
                        value={formData.dropoffLocation}
                        onChange={e => setFormData({ ...formData, dropoffLocation: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Cargo Details"
                        value={formData.cargoDetails}
                        onChange={e => setFormData({ ...formData, cargoDetails: e.target.value })}
                        required
                    />
                    <button type="submit" className="submit-btn">Book Now</button>
                </form>

                <div className="booking-history">
                    <h2 className="subheading">Booking History</h2>
                    <ul className="booking-list">
                        {Array.isArray(bookings) && bookings.length > 0 ? (
                            bookings.map(booking => (
                                <li key={booking._id} className="booking-item">
                                    {booking.truckType} - {booking.pickupLocation} to {booking.dropoffLocation}
                                </li>
                            ))
                        ) : (
                            <li className="no-booking">No bookings found</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
