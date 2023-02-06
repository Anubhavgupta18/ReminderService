const sender = require('../config/emailConfig');
const ticketRepository = require('../repository/ticket-repository');

const repo = new ticketRepository();

const sendMail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    try {
        const response = sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const fetchPendingEmails = async (timestamp) => {
    try {
        const tickets = await repo.get({ status: 'PENDING' });
        return tickets;
    } catch (error) {
        throw error;
    }
}
const createNotification = async (data) => {
    try {
        const ticket = await repo.create(data);
        return ticket;
    } catch (error) {
        throw error;
    }
}
const updateTicket = async (ticketId,data) => {
    try {
        const ticket = await repo.update(ticketId,data);
        return ticket;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendMail,
    fetchPendingEmails,
    createNotification,
    updateTicket
}
