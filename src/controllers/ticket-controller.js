const ticketservice = require('../services/emailing-service');

const create = async(req, res) => {
    try {
        const ticket = await ticketservice.createNotification(req.body);
        return res.status(201).json({
            data: ticket,
            success: true,
            message: 'Created a ticket successfully',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to create a ticket',
            err:error
        });
    }
}

module.exports = {
    create
}