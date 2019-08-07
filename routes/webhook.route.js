module.exports = app => {
  const webhook = require("../controllers/webhook.controller");

  // Receive HyperTrack webhooks
  app.post("/hypertrack", async function(req, res) {
    let webhookBody = JSON.parse(req.body);

    if (webhookBody) {
      for (let i = 0; i < webhookBody.length; i++) {
        let data = webhookBody[i];

        // TODO: Remove after v1 deprecation
        if (data.version === "2.0.0") {
          console.log(data);
          // notify client
          res.io.emit(data.type, data);

          switch (data.type) {
            case "location":
              console.log("==== LOCATION UPDATE");
              webhook.addLocation(data);
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
    }

    res.sendStatus(200);
  });
};
