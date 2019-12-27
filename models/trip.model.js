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
      },
      arrived_at: {
        type: Date
      },
      exited_at: {
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
        start_place: {
          type: String
        },
        end_place: {
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
      locations: {
        type: {
          type: String
        },
        coordinates: {
          type: [[String]]
        }
      },
      distance: {
        type: Number
      },
      duration: {
        type: Number
      },
      started_at: {
        type: Date
      },
      completed_at: {
        type: Date
      },
      device_id: {
        type: String
      },
      markers: [
        {
          type: {
            type: String
          },
          data: {
            value: {
              type: String
            },
            start: {
              recorded_at: {
                type: Date
              },
              location: {
                geometry: {
                  type: {
                    type: String
                  },
                  coordinates: {
                    type: [Number]
                  }
                },
                recorded_at: {
                  type: Date
                }
              }
            },
            end: {
              recorded_at: {
                type: Date
              },
              location: {
                geometry: {
                  type: {
                    type: String
                  },
                  coordinates: {
                    type: [Number]
                  }
                },
                recorded_at: {
                  type: Date
                }
              }
            },
            reason: {
              type: String
            },
            arrival: {
              location: {
                geometry: {
                  type: {
                    type: String
                  },
                  coordinates: {
                    type: [Number]
                  }
                },
                recorded_at: {
                  type: Date
                }
              }
            },
            geofence: {
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
            },
            route_to: {
              duration: {
                type: Number
              },
              distance: {
                type: Number
              },
              start_location: {
                geometry: {
                  type: {
                    type: String
                  },
                  coordinates: {
                    type: [Number]
                  }
                },
                recorded_at: {
                  type: Date
                }
              }
            },
            exit: {
              location: {
                geometry: {
                  type: {
                    type: String
                  },
                  coordinates: {
                    type: [Number]
                  }
                },
                recorded_at: {
                  type: Date
                },
                location: {
                  type: {
                    type: String
                  },
                  coordinates: {
                    type: [Number]
                  }
                }
              }
            },
            duration: {
              type: Number
            },
            recorded_at: {
              type: Date
            },
            metadata: {
              type: Object
            }
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
