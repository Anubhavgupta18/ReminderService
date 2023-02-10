const express = require('express');
const bodyParser = require('body-parser');
const { PORT, REMINDER_BINDING_KEY } = require('./config/serverConfig');
const { sendMail } = require('./services/emailing-service');
const { create } = require('./controllers/ticket-controller');
const jobs = require('./utils/jobs');
const { subscribeMessage,createChannel } = require('./utils/messageQueue');
const service = require('./services/emailing-service');
const createAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(PORT, () => {
        console.log(`Server started on PORT : ${PORT}`);
    })
    app.post('/api/v1/tickets', create);
    
    const channel = await createChannel();
    await subscribeMessage(channel, service, REMINDER_BINDING_KEY);
    //jobs();
    // sendMail(
    //     'anubhavgupta8769@gmail.com',
    //     'anubhavshivahre@gmail.com',
    //     'This is testing email',
    //     'Hello there! this is a email to check the service'
    // );

}

createAndStartServer();