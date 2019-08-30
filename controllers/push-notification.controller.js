const PushService = require("node-pushnotifications");
const _ = require("lodash");

const PushNotification = require("../models/push-notification.model");
const pushInfo = require("../models/device-push-info.model");

// Init with push settings
const push = new PushService({
  gcm: {
    id: process.env.FCM_KEY
  },
  apn: {
    token: {
      key: process.env.APN_CERT,
      keyId: process.env.APN_KEY_ID,
      teamId: process.env.APN_TEAM_ID
    },
    production: true,
    isAlwaysUseFCM: true
  }
});

exports.sendNotification = (device_id, payload, res) => {
  // lookup device push first
  pushInfo.findOne({ device_id }).then(pushInfo => {
    if (pushInfo) {
      // set body and title based on status
      const status = _.get(payload, "placeline.status", "activity");
      let body = "🔥 A trip activity was recorded";
      let title = "Trip activity";

      if (status === "destination_arrival") {
        body = `🔥 You just entered the trip destination!`;
        title = "Trip arrival";
      }

      if (status === "geofence_enter") {
        body = `🔥 You just entered the trip geofence for ${_.get(
          payload,
          "placeline.geofence.metadata.label",
          "a place"
        )}`;
        title = "Trip geofence enter";
      }

      // send push notification
      push
        .send([pushInfo.push_token], {
          title, // REQUIRED for Android
          topic: pushInfo.app_name, // REQUIRED for iOS
          body,
          contentAvailable: true,
          custom: payload
        })
        .then(results => {
          if (results) {
            const responseText = `Push notification for id '${
              pushInfo.push_token
            }' and app '${pushInfo.app_name}' stored. Notification push ${
              _.get(results, "[0].success", 0) === 1 ? "succeded" : "failed"
            }`;

            if (res) {
              res.status(201).send({ message: responseText });
            }

            console.log(responseText);
          }
        });
    }
  });
};

exports.addOne = (req, res) => {
  const { ids, payload } = req.body;
  // store notification record
  PushNotification.create({ ids, payload })
    .then(() => {
      // send push notification
      this.sendNotification(ids, payload, res);
    })
    .catch(err => {
      return res.status(500).send({
        message: `Error creating push notification: ${err}`
      });
    });
};
