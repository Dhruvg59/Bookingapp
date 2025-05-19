// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



import React, { useEffect, useState } from 'react';
import BookingForm from './BookingForm';
import BookingList from './BookingList';

function App() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:3001/bookings');
      const data = await res.json();
      setBookings(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch bookings');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleNewBooking = async (bookingData) => {
    try {
      const res = await fetch('http://localhost:3001/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (res.status === 201) {
        await fetchBookings();
      } else {
        const data = await res.json();
        setError(data.error || 'Booking failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Calendar Booking</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <BookingForm onSubmit={handleNewBooking} />
      <hr />
      <BookingList bookings={bookings} />
    </div>
  );
}

export default App;

