require("dotenv").config();
const request = require("request");
const _ = require("lodash");

function updateAllDevices() {
  // get all devices using HyperTrack API
  const base64auth = Buffer.from(
    `${process.env.HT_ACCOUNT_ID}:${process.env.HT_SECRET_KEY}`
  ).toString("base64");
  const auth = `Basic ${base64auth}`;
  let options = {
    url: "https://v3.api.hypertrack.com/devices",
    headers: {
      Authorization: auth
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const devices = JSON.parse(body);
      let bulkOps = [];
      let upsertDoc = {};

      // update all devices in mongoDB
      var deviceCollection = require("../models/device.model");

      devices.forEach(device => {
        // known bug: devices without location exposed in API
        // filter out devices without a location
        if (_.get(device, "location.recorded_at", false)) {
          upsertDoc = {
            updateOne: {
              filter: { device_id: device["device_id"] },
              update: device,
              upsert: true,
              setDefaultsOnInsert: true
            }
          };
          bulkOps.push(upsertDoc);
        }
      });

      if (bulkOps.length > 0) {
        deviceCollection.bulkWrite(bulkOps);
      }
    }
  });
}

module.exports = { updateAllDevices };
