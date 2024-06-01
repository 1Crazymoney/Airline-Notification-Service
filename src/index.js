const express = require('express');
const {serverConfig,Logger} = require('./config');
const apiRoutes = require('./routes');

const mailSender = require('./config/email-config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api',apiRoutes);
app.listen(serverConfig.PORT,async ()=>{
    console.log(`Successfully started the server at port ${serverConfig.PORT}`);
    Logger.info('Successfully Started The Server','root',{});
   try {
    const response = await mailSender.sendMail({
        from: serverConfig.GMAIL_EMAIL,
        to:'ashutosh5463@outlook.com',
        subject: 'Is the service working?',
        text: 'Yes! Service is up and working fine'
    });
    console.log(response);
   } catch (error) {
    console.log(error);
    
   }
});