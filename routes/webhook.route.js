module.exports = app => {
  const webhook = require("../controllers/webhook.controller");

  // Receive HyperTrack webhooks
  app.post("/hypertrack", async function(req, res) {
    let webhookBody = JSON.parse(req.body);

    // log request body
    console.log(webhookBody);

    if (webhookBody) {
      for (let i = 0; i < webhookBody.length; i++) {
        let data = webhookBody[i];

        // notify client
        res.io.emit(data.type, data);

        switch (data.type) {
          case "location":
            console.log("==== LOCATION UPDATE");
            webhook.addLocation(data);
            break;
          case "summary":
            console.log("==== SUMMARY UPDATE");
            webhook.addSummary(data);
            break;
          case "device_status":
            console.log("==== DEVICE UPDATE");
            webhook.addDeviceStatus(data);
            break;
          case "battery":
            console.log("==== BATTERY UPDATE");
            webhook.addBatteryStatus(data);
            break;
          case "trip":
            console.log("==== TRIP UPDATE");
            webhook.addTripStatus(data);
            break;
          default:
            break;
        }
      }
    }

    res.sendStatus(200);
  });
};
