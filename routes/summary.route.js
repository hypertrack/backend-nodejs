module.exports = (app) => {
    const summaries = require('../controllers/summary.controller');

    // Retrieve all sumaries
    app.get('/summaries', summaries.findAll);

     // Add a new summary
     app.post('/summaries', summaries.addOne);

    // Retrieve all summaries for a device_id
    app.get('/summaries/:device_id', summaries.findAllByDeviceId);

    // Retrieve all summaries for a device_id
    app.get('/summaries/:device_id/last', summaries.findLastByDeviceId);
}