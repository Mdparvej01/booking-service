// const dotenv = require('dotenv');

require('dotenv').config();

module.exports = {
    ServerConfig: require('./server-config'),
    Logger: require('./logger-config'),
    FLIGHT_SERVICE:process.env.FLIGHT_SERVICE,
    Queue:require('./queue-config'),

}