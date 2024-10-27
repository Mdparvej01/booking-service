// const {} = 
const {BookingService}=require('../services')
const {SuccessResponse ,  ErrorResponse} = require('../utils/common')


async function createBooking(req,res) {
    console.log("req=>>>>>>>>>>>>>>>>" , req.body.flightId, req.body.noOfSeats);

    try {
        
        const response = await BookingService.createBooking({
            flightId:req.body.flightId,
            userId:req.body.userId,
            noOfSeats:req.body.noOfSeats,
            
        })
        // console.log(response);

        return res
               .status(200)
               .json({
                success:true,
                response
               })



    } catch(error){

        return res
               .status(200)
               .json({
                success:false,
                error
               })

    }
}


async function makePayment(req,res) {
    console.log("payment   req=>>>>>>>>>>>>>>>>" , req.body.userId, req.body.totalCost);

    try {
        
        const response = await BookingService.makePayment({
            userId:req.body.userId,
            bookingId:req.body.bookingId,
            totalCost:req.body.totalCost,
            
        })
        // console.log(response);

        return res
               .status(200)
               .json({
                success:true,
                response
               })



    } catch(error){

        return res
               .status(200)
               .json({
                success:false,
                error
               })

    }
}



module.exports = {

    createBooking,
    makePayment

    //hello my name is parvej ......
}