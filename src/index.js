const express = require('express');
const {serverConfig,Logger} = require('./config');
const apiRoutes = require('./routes');
const amqplib = require('amqplib');
const {EmailService} = require('./services');

const mailSender = require('./config/email-config');

async function connectQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");
        channel.consume("noti-queue", async (data) => {
            console.log(`${Buffer.from(data.content)}`);
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            await EmailService.sendEmail("airlinenoti@gmail.com", object.recepientEmail, object.subject, object.text);
            channel.ack(data);
        })
    } catch(error) {
        console.log(error);
        throw(error);
        
    }
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api',apiRoutes);
app.listen(serverConfig.PORT,async ()=>{
    console.log(`Successfully started the server at port ${serverConfig.PORT}`);
    Logger.info('Successfully Started The Server','root',{});
    await connectQueue();
    console.log("Queue is up");
});