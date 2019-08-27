module.exports = app => {
  const webhook = require("../controllers/webhook.controller");
  const trip = require("../controllers/trip.controller");
  const { completeTrip } = require("../common/trips");
  const _ = require("lodash");

  // Receive HyperTrack webhooks
  app.post("/hypertrack", async function(req, res) {
    let webhookBody = JSON.parse(req.body);

    if (webhookBody) {
      for (let i = 0; i < webhookBody.length; i++) {
        let data = webhookBody[i];

        console.log(data);
        // notify client

        // ignore other versions for now
        if (data.version === "2.0.0") {
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

              if (_.get(data, "data.value", "") === "destination_arrival") {
                // complete trip on arrival
                completeTrip(data.data.trip_id);
              }

              if (_.get(data, "data.value", "") === "created") {
                // get and store new trip
                trip.addWithId(data.data.trip_id);
              }

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
