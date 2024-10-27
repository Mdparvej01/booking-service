const {StatusCodes} = require('http-status-codes');

const {Booking} = require('../models');
const CrudRepository = require('./crud-repository');

class BookingRepository extends CrudRepository {
    constructor () {
        super(Booking);
    }


    // async create ({bookingPayload , transaction}) {
    //     const booking = await Booking.create({ });
    //     console.log("booking-> " , booking);
    //     return booking;
    // }

    // const booking = await Booking.create({ bookingPayload, transaction});





}

module.exports = BookingRepository ; 