import React from 'react';

function BookingList({ bookings }) {
  return (
    <div>
      <h3>All Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <strong>{booking.userId}</strong>: {booking.startTime} → {booking.endTime}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingList;
