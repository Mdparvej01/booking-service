const axios = require('axios');


const {BookingRepository} = require('../repositories');
const db = require('../models')
const {ServerConfig} =require('../config')
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error')
async function   createBooking(data) {


    return new Promise((resolve , reject) => {
            

        const result = db.sequelize.transaction (async function bookingImpl(transObj) {


                const flight = await  axios.get(`http://localhost:3000/api/v1/flights/${data.flightId}`);


               const flightResult=flight.data.flight ;

               console.log("flightResultTotalSeats=> " , flightResult);
               
               if(data.noOfSeats > flightResult.totalSeats) {
                reject( new AppError('Not enough seats available' , StatusCodes.BAD_REQUEST)); 
               
               }
               
           resolve(true);
                       
        } )

        // return true;






    })





}



module.exports = {
    createBooking
}