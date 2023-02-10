const amqplib = require('amqplib');
const { MESSAGE_BROKER_URL,EXCHANGE_NAME } = require('../config/serverConfig');
const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();

        //assertExchange helps to set teh distribution among the queues
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    } catch (error) {
        throw error;
    }
}

const subscribeMessage = async (channel, service, binding_key) => {
    try {
        const appQueue = await channel.assertQueue('REMINDER_QUEUE');

        await channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);

        await channel.consume(appQueue.queue, msg => {
            console.log('Message received');
            console.log(msg.content.toString());
            const payload = JSON.parse(msg.content.toString());
            service.subscribeEvents(payload);
            channel.ack(msg);
        });
    } catch (error) {
        throw error;
    }
}

const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.assertQueue('REMINDER_QUEUE');
        await channel.pushlish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error;
    }
}
module.exports = {
    subscribeMessage,
    createChannel,
    publishMessage
}