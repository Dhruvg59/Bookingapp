import React, { useState } from 'react';

function BookingForm({ onSubmit }) {
  const [userId, setUserId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId || !startTime || !endTime) return;
    onSubmit({ userId, startTime, endTime });
    setUserId('');
    setStartTime('');
    setEndTime('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div>
        <label>User ID:</label><br />
        <input value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div>
        <label>Start Time (e.g. 2025-03-01T10:00:00Z):</label><br />
        <input value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </div>
      <div>
        <label>End Time (e.g. 2025-03-01T11:00:00Z):</label><br />
        <input value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Book</button>
    </form>
  );
}

export default BookingForm;
