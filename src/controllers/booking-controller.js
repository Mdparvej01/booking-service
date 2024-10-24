// const {} = 
const {BookingService}=require('../services')
const {SuccessResponse ,  ErrorResponse} = require('../utils/common')


async function createBooking(req,res) {
    console.log("req" , req.body.flightId, req.body.noOfSeats);
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




module.exports = {

    createBooking

    //hello my name is parvej ......
}