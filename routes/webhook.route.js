module.exports = (app) => {
    const webhook = require('../controllers/webhook.controller');

    // Receive all HyperTrack webhooks
    app.post('/hypertrack', async function (req, res) {
        let webhookBody = JSON.parse(req.body);

        if (webhookBody) {
            for (let i = 0; i < webhookBody.length; i++) {
                let data = webhookBody[i];

                // print data
                console.log(data);

                // notify client
                res.io.emit(data.type, data);

                switch (data.type) {
                    case 'location':
                        console.log('==== LOCATION UPDATE');
                        webhook.addLocation(data);
                        break;
                    case 'summary':
                        console.log('==== SUMMARY UPDATE');
                        webhook.addSummary(data);
                        break;
                    case 'activity':
                        console.log('==== ACTIVITY UPDATE');
                        break;
                    case 'health':
                        console.log('==== HEALTH UPDATE');
                        break;
                    case 'trip':
                        console.log('==== TRIP UPDATE');
                        break;
                    default:
                        break;
                }
            };
        }

        res.sendStatus(200);
    });
}