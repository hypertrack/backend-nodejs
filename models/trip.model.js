var mongoose = require("mongoose");

// Trip schema
const TripSchema = new mongoose.Schema(
  {
    trip_id: {
      type: String,
      required: true
    },
    device_id: {
      type: String,
      required: true
    },
    started_at: {
      type: Date
    },
    completed_at: {
      type: Date
    },
    status: {
      type: String
    },
    views: {
      share_url: {
        type: String
      },
      embed_url: {
        type: String
      }
    },
    metadata: {
      type: Object
    },
    destination: {
      geometry: {
        type: {
          type: String
        },
        coordinates: {
          type: [Number]
        }
      },
      radius: {
        type: Number
      },
      scheduled_at: {
        type: Date
      }
    },
    geofences: [
      {
        geometry: {
          type: {
            type: String
          },
          coordinates: {
            type: [Number]
          }
        },
        radius: {
          type: Number
        },
        metadata: {
          type: Object
        }
      }
    ],
    estimate: {
      arrive_at: {
        type: Date
      },
      route: {
        distance: {
          type: Number
        },
        duration: {
          type: Number
        },
        remaining_duration: {
          type: Number
        },
        start_address: {
          type: String
        },
        end_address: {
          type: String
        },
        polyline: {
          type: {
            type: String
          },
          coordinates: {
            type: [[Number]]
          }
        }
      },
      reroutes_exceeded: {
        type: Boolean
      }
    },
    summary: {
      distance: {
        type: Number
      },
      steps: {
        type: Number
      },
      duration: {
        type: Number
      },
      start_address: {
        type: String
      },
      end_address: {
        type: String
      },
      start_datetime: {
        type: Date
      },
      end_datetime: {
        type: Date
      },
      segments: [
        {
          type: {
            type: String
          },
          distance: {
            type: Number
          },
          steps: {
            type: Number
          },
          start_datetime: {
            type: Date
          },
          end_datetime: {
            type: Date
          },
          polyline: {
            type: [[Number]]
          }
        }
      ]
    },
    updatedAt: {
      type: Date
    },
    createdAt: {
      type: Date
    }
  },
  {
    // enable timestamps
    timestamps: true,
    // set collection name
    collection: "Trip"
  }
);

// index trip_id
TripSchema.index(
  {
    trip_id: 1
  },
  { unique: true }
);

module.exports = mongoose.model("Trip", TripSchema);
