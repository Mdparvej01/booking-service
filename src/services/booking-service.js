const axios = require('axios');

// const {AirplaneRepository} = require('../repositories');

// const Repository = new AirplaneRepository();



const {BookingRepository} = require('../repositories');
const bookingRepository = new BookingRepository();

const db = require('../models')
const {ServerConfig , Queue} =require('../config')
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error')


async function  createBooking(data) {

    console.log("inside create booking" , data);

    const transaction = await db.sequelize.transaction();

    try {

        const flight = await  axios.get(`http://localhost:3000/api/v1/flights/${data.flightId}`);

        const flightData = flight.data.flight;

        console.log("flightData---> " , flightData);

        if(data.noOfSeats > flightData.totalSeats) {
            throw new AppError('Not enough seats available..');
        }

        const totalBillingAmount = data.noOfSeats * flightData.price;


        await axios.patch(`http://localhost:3000/api/v1/flights/${data.flightId}/seats` , {
            seats:data.noOfSeats
        })

        const bookingPayload = {...data , totalCost:totalBillingAmount};

        console.log("payLoad-->" , bookingPayload);
        const booking = await  bookingRepository.create(bookingPayload , transaction);




        await transaction.commit();

        
        return booking;



        



    } catch(error) {

        await transaction.rollback();
        throw error;



    }





















    // return new Promise((resolve , reject) => {
            

    //     const result = db.sequelize.transaction (async function bookingImpl(transObj) {


    //             const flight = await  axios.get(`http://localhost:3000/api/v1/flights/${data.flightId}`);


    //            const flightResult=flight.data.flight ;

    //            console.log("flightResultTotalSeats=> " , flightResult);
               
    //            if(data.noOfSeats > flightResult.totalSeats) {
    //             reject( new AppError('Not enough seats available' , StatusCodes.BAD_REQUEST)); 
               
    //            }
               
    //        resolve(true);
                       
    //     } )

    //     // return true;






    // }
// )





}

async function makePayment(data) {
    // console.log("inside payMentmake -> " , data);
    const transaction = await db.sequelize.transaction();

    try {

        const bookingDetails = await bookingRepository.get(data.bookingId , transaction);
        console.log("bookingId->" , data.bookingId);
        console.log("bookingDetails->" ,bookingDetails );
        
       

        const bookingTime = new Date(bookingDetails.createdAt);
        const currentTime = new Date();

        // if(currentTime - bookingTime  > 300000) {
        //     await cancelBooking(data.bookingId);
        //     throw new AppError("Booking time exppired " , StatusCodes.BAD_REQUEST);
        // }


        // if(bookingDetails.totalCost != data.totalCost  ) {
        //     await cancelBooking(data.bookingId); 
        //     throw new AppError(" Ammount doesnt matched "  , StatusCodes.BAD_REQUEST);
        // }

        // if(bookingDetails.userId != data.userId  ) {
        //     await cancelBooking(data.bookingId); 
        //     throw new AppError(" UserId doesnt matched "  , StatusCodes.BAD_REQUEST);
        // }

        // console.log("booing Id---->" , data.bookingId);


        await bookingRepository.update(data.bookingId , {status:"BOOKED"} , transaction) ;



        
       await Queue.sendData({
            subject:'Flight Booked',
            recepientEmain:"storagempis@gmail.com"
,            text:`Booking done for booking ${data.bookingId} `,

        })



        await transaction.commit();


        // after successfull payment ....


           


        
        

    } catch(error) {
     await transaction.commit();
     throw error;
    }
}

async function cancelBooking(bookingId){
    const transaction = await db.sequelize.transaction();

    try {

        const bookingDetails = await bookingRepository.get(bookingId , transaction) ;

        console.log(bookingDetails);

        if(bookingDetails.status == 'CANCELLED') {
            await transaction.commit();
            return true;
        }

        await axios.patch(`http://localhost:3000/api/v1/flights/${data.flightId}/seats` , {
            seats:bookingDetails.noOfSeats,
            dec:0
        });

        await bookingRepository.update(bookingId , {status:'CANCELLED'} ,transaction);
        await transaction.commit();



    } catch(error) {
        await transaction.rollback();
        throw error;
    }
}



module.exports = {
    createBooking,
    makePayment
}