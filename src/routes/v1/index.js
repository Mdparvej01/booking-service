const express = require('express');

const { InfoController } = require('../../controllers');

const bookingRoutes = require('./booking-routes');
// const airplaneRoutes = require('./airplane-routes');
// const airportRoutes = require('./airport-routes');
// const flightRoutes = require('./flight-routes')

const router = express.Router();

router.use('/bookings' , bookingRoutes);
router.use('/bookings/payment' , bookingRoutes);

// router.use('/airplanes' , airplaneRoutes);
// router.use('/airport' , airportRoutes);
// router.use('/flights' , flightRoutes);



// router.get('/info', InfoController.info);



module.exports = router;