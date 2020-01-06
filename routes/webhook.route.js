module.exports = app => {
  const webhook = require("../controllers/webhook.controller");
  const trip = require("../controllers/trip.controller");
  const pushNotification = require("../controllers/push-notification.controller");
  const { completeTrip } = require("../common/trips");
  const _ = require("lodash");

  // Receive HyperTrack webhooks
  app.post("/hypertrack", async function(req, res) {
    /*
    * For Webhook verification, you should log the request body here
    * The reason is that the verification request is in XML, not JSON
    * You can comment this out after the verification is completed
    * Docs: https://docs.hypertrack.com/#guides-webhooks-setup-one-time-activation
    */
    // console.log(req.body);
    let webhookBody = JSON.parse(req.body);

    if (webhookBody) {
      for (let i = 0; i < webhookBody.length; i++) {
        let data = webhookBody[i];

        console.log(data);

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

              webhook.addTripStatus(data);

              if (_.get(data, "data.value", "") === "destination_arrival") {
                // complete trip, 2 minutes after arrival
                setTimeout(() => {
                  completeTrip(data.data.trip_id);
                }, 120000);

                // send push notification to device
                pushNotification.sendNotification(data.device_id, {
                  placeline: {
                    status: _.get(data, "data.value", ""),
                    trip: {
                      id: _.get(data, "data.trip_id"),
                      metadata: _.get(data, "data.trip_metadata", {})
                    }
                  }
                });
              }

              if (_.get(data, "data.value", "") === "geofence_enter") {
                // send push notification to device
                pushNotification.sendNotification(data.device_id, {
                  placeline: {
                    status: _.get(data, "data.value", ""),
                    trip: {
                      id: _.get(data, "data.trip_id"),
                      metadata: _.get(data, "data.trip_metadata", {})
                    },
                    geofence: {
                      metadata: _.get(data, "data.geofence_metadata")
                    }
                  }
                });
              }

              if (_.get(data, "data.value", "") === "created") {
                // get and store new trip
                trip.addWithId(data.data.trip_id);
              }

              if (_.get(data, "data.value", "") === "completed") {
                // update trip in MongoDB
                trip.updateTrip(data.data.trip_id, {
                  status: "completed",
                  summary: data.data.summary,
                  estimate: null,
                  completed_at: data.created_at
                });
              }
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
