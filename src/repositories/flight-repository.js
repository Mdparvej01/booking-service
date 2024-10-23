const CrudRepository = require('./crud-repository');
const {Flight} = require('../models');
const {Sequelize } = require('sequelize');
const db = require('../models')
class FlightRepository extends CrudRepository {
    constructor () {
         super(Flight);
    } 


    async getAllFlights(filter , sort){
         const response = await Flight.findAll({
              where:filter,  //passing filter obj
              order:sort,
         });

         return response;
    }



    async updateRemainingSeats(flightId , seats , dec=true){
     
     await db.sequelize.query(`Select * from Flights WHERE Flights.id = ${flightId } FOR UPDATE ; `);

       const flight =await Flight.findByPk(flightId);

        if( parseInt(dec) ){

            await flight.decrement('totalSeats' , {by:seats} );
            await flight.save();


        } else {

            await flight.increment('totalSeats' , {by:seats} );

        }

          return flight;
    }


}

module.exports = FlightRepository;