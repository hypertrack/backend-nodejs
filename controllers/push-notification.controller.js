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
  // continue only if all keys are set
  if (
    process.env.FCM_KEY !== "" &&
    process.env.APN_CERT !== "" &&
    process.env.APN_KEY_ID !== "" &&
    process.env.APN_TEAM_ID !== ""
  ) {
    if (res) {
      res.status(500).send({
        message: `Push notifications are not configured on the backend`
      });
    }

    return;
  }

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

      // store notification record
      PushNotification.create({ ids: device_id, payload })
        .then(() => {
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
        })
        .catch(err => {
          if (res) {
            return res.status(500).send({
              message: `Error creating push notification: ${err}`
            });
          }
          console.log(`Error creating push notification: ${err}`);
        });
    }
  });
};

exports.addOne = (req, res) => {
  this.sendNotification(req.body.ids, req.body.payload, res);
};
