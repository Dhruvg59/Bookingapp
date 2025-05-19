const express = require('express');
const router = express.Router();
const bookings = require('../data/bookings');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
  res.json(bookings);
});

router.get('/:bookingId', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.bookingId);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  res.json(booking);
});

router.post('/', (req, res) => {
  const { userId, startTime, endTime } = req.body;
  if (!userId || !startTime || !endTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const start = new Date(startTime);
  const end = new Date(endTime);
  if (isNaN(start) || isNaN(end) || start >= end) {
    return res.status(400).json({ error: 'Invalid start or end time' });
  }

  const conflict = bookings.some(b =>
    start < new Date(b.endTime) && end > new Date(b.startTime)
  );

  if (conflict) {
    return res.status(409).json({ error: 'Booking time conflict' });
  }

  const newBooking = {
    id: uuidv4(),
    userId,
    startTime,
    endTime,
  };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

module.exports = router;
