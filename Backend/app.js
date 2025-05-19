const express = require('express');
const cors = require('cors');
const bookingsRoutes = require('./routes/bookings');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/bookings', bookingsRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
