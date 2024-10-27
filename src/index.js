const express = require('express');
const amqplib  = require('amqplib')
require('dotenv').config();   
const {Queue} = require('./config')

//rabbit mq setup............

// async function connectQueue(){
//     try {

//         const connection = await amqplib.connect("amqp://localhost");
//         const channel = await connection.createChannel();
//         await channel.assertQueue("noti-queue");
//         await channel.sendToQueue("test-message" , Buffer.from ("this is a message") );
        
//     } catch(error) {

//        console.log(error);
//     }
// }

//rabbit mq setup............



const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
// app.use(dotenv.config());
const app = express();

// dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
// app.use('/bookingService/api', apiRoutes);
// app.use('/bookingService/api', apiRoutes);
app.use('/bookingService/api', apiRoutes);

app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    await  Queue.connectQueue();
    console.log("queue connected");
});
        