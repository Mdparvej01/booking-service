const amqplib  = require('amqplib')


let channel, connection;




//........................
async function connectQueue(){
    try {

         connection = await amqplib.connect("amqp://localhost");
         channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");
        await channel.sendToQueue("test-message" , Buffer.from ("this is a message") );
        
    } catch(error) {

       console.log(error);
    }
}

//rabbit mq setup............


async function sendData(data){
    try {
        await channel.sendToQueue("noti-queue" , Buffer.from(JSON.stringify(data)));
        

    } catch(error) {

         console.log(error);

    }
}


module.exports = {
    connectQueue,
    sendData

}