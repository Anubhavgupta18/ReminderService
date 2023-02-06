const cron = require('node-cron');
const { set } = require('../config/emailConfig');
const emailSerice = require('../services/emailing-service');
const sender = require('../config/emailConfig');
/**
 * every 5 minutes
 * we will just check is there any email which is to be sent 
 * by now and is PENDING
 */

const setupJobs = async () => {
    cron.schedule('*/2 * * * *', async () => {
        const response = await emailSerice.fetchPendingEmails();
        response.forEach((email) => {
            sender.sendMail({
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            }, async (err,data) => {
                if (err)
                {
                    console.log(err);
                }
                else
                {
                    await emailSerice.updateTicket(email.id, { status: 'SUCCESS' });
                    console.log(data);
                }
            })
        })
        console.log(response);
    })
}

module.exports = setupJobs;
