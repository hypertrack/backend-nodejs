const _ = require("lodash");

const Trip = require("../models/trip.model");
const { createTrip, getTrip } = require("../common/trips");

function path(a) {
  var list = [];
  (function(o, r) {
    r = r || "";
    if (typeof o != "object") {
      return true;
    }
    for (var c in o) {
      if (arguments.callee(o[c], r + "." + c)) {
        list.push(`${r.substring(1)}.${c}`);
      }
    }
    return false;
  })(a);
  return list;
}

// Create a new trip
exports.create = (req, res) => {
  createTrip(req.body, resp => {
    const newTrip = new Trip(resp);
    // store new trip in database
    newTrip.save(err => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(newTrip);
    });
  });
};

// Add an existing trip from trip creation webhook
exports.addWithId = tripId => {
  getTrip(tripId, resp => {
    const newTrip = new Trip(JSON.parse(resp));
    // store new trip in database
    newTrip.save();
  });
};

// Retrieve and return all trips from the database.
exports.findAll = (req, res) => {
  const { status, metadata } = req.query;
  let metadataObj = null,
    metaQuery = {};
  let filterObj = {};

  if (status) {
    filterObj.status = status;
  }

  if (metadata) {
    try {
      metadataObj = {
        metadata: JSON.parse(metadata)
      };
      metaQuery = path(metadataObj);

      // convert to query params for MongoDB
      for (let i = 0; i < metaQuery.length; i++) {
        const elem = metaQuery[i];
        filterObj[elem] = _.get(metadataObj, metaQuery[i]);
      }
    } catch (e) {
      metadataObj = {};
    }
  }

  Trip.find(filterObj)
    .then(trips => {
      res.send(trips);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving trips."
      });
    });
};

// Find all trips for a device by device_id
exports.findAllForDevice = (req, res) => {
  Trip.find({ device_id: req.params.device_id })
    .then(trip => {
      if (!trip) {
        return res.status(404).send({
          message: "Trips not found for device id " + req.params.device_id
        });
      }
      res.send(trip);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Trips not found for device id " + req.params.device_id
        });
      }
      return res.status(500).send({
        message: "Error retrieving trips for device id " + req.params.device_id
      });
    });
};

// Find a single trip with a trip_id
exports.findOne = (req, res) => {
  Trip.findOne({ trip_id: req.params.trip_id })
    .then(trip => {
      if (!trip) {
        return res.status(404).send({
          message: "Trip not found with id " + req.params.trip_id
        });
      }
      res.send(trip);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Trip not found with id " + req.params.trip_id
        });
      }
      return res.status(500).send({
        message: "Error retrieving trip with id " + req.params.trip_id
      });
    });
};

// Update a trip using trip_id (e.g. after complete)
exports.findOneAndUpdate = (req, res) => {
  updateTrip(req.params.trip_id, req.body, (trip, error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(trip);
    }
  });
};

exports.updateTrip = (trip_id, body, callback) => {
  Trip.findOneAndUpdate({ trip_id }, body)
    .then(trip => {
      if (callback) {
        callback(trip);
      }
    })
    .catch(err => {
      if (callback) {
        callback(null, {
          message: `Some error occurred while updating trip with id ${
            req.params.trip_id
          }. Reason: ${err.message}`
        });
      }
    });
};
