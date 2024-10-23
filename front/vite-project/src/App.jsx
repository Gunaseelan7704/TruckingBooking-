import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            // Clear form after submission
            setFormData({
                truckType: '',
                pickupLocation: '',
                dropoffLocation: '',
                cargoDetails: ''
            });
            // Refresh bookings list after booking
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
            // Check if the response data is an array
            if (Array.isArray(res.data)) {
                setBookings(res.data);
            } else {
                setBookings([]); // Set as empty array if response is not an array
            }
        } catch (error) {
            console.error(error);
            setBookings([]); // Handle error by setting bookings as an empty array
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div>
            <h1>Truck Cargo Booking</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Truck Type" value={formData.truckType} onChange={e => setFormData({ ...formData, truckType: e.target.value })} required />
                <input type="text" placeholder="Pickup Location" value={formData.pickupLocation} onChange={e => setFormData({ ...formData, pickupLocation: e.target.value })} required />
                <input type="text" placeholder="Dropoff Location" value={formData.dropoffLocation} onChange={e => setFormData({ ...formData, dropoffLocation: e.target.value })} required />
                <textarea placeholder="Cargo Details" value={formData.cargoDetails} onChange={e => setFormData({ ...formData, cargoDetails: e.target.value })} required />
                <button type="submit">Book Now</button>
            </form>

            <h2>Booking History</h2>
            <ul>
                {/* Check if bookings is an array before mapping */}
                {Array.isArray(bookings) && bookings.length > 0 ? (
                    bookings.map(booking => (
                        <li key={booking._id}>
                            {booking.truckType} - {booking.pickupLocation} to {booking.dropoffLocation}
                        </li>
                    ))
                ) : (
                    <li>No bookings found</li>
                )}
            </ul>
        </div>
    );
}

export default App;
