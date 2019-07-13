require('dotenv').config();
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var request = require('request');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(cors());

// add socket.io as middleware
app.use(function(req, res, next){
  res.io = io;
  next();
});

// setup Mongoose
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
mongoose.set('debug', true);
//TODO: Remove as soon as routes+controller are removed from this file
require('./models/device.model');

app.get('/', function (req, res) {
    console.log(JSON.stringify(req.headers));
    console.log(req.body);
    res.send('Hello HyperTrack');
});

// Require Device routes
require('./routes/device.route')(app);

app.get('/initialize-devices', function (req, res) {
  // get all devices from HyperTrack
  const base64auth = Buffer.from(`${process.env.HT_ACCOUNT_ID}:${process.env.HT_SECRET_KEY}`).toString('base64');
  const auth = `Basic ${base64auth}`;
  const options = {
    url: 'https://v3.api.hypertrack.com/live',
    headers: {
      'Authorization': auth
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const devices = JSON.parse(body);

      // update all devices in mongoDB
      var deviceCollection = mongoose.model('Device').collection;
      var batchUpdate = deviceCollection.initializeOrderedBulkOp();

      devices.forEach(device => {
        batchUpdate.insert(device);
      });

      batchUpdate.execute(function(err, result) {
        res.send(result ? result.getInsertedIds() : '[]' );
      });
    };
  });
});

app.post('/hypertrack', async function (req, res) {
  // console.log(JSON.stringify(req.headers));
  // only needed for validation - non-JSON body
  //console.log(JSON.stringify(req.body));

  let webhookBody = JSON.parse(req.body);

  if(webhookBody) {
    for (let i = 0; i < webhookBody.length; i++) {
      let data = webhookBody[i];

      // print data
      console.log(data);

      // notify client
      res.io.emit(data.type, data);

      switch (data.type) {
        case 'location':
          console.log('==== LOCATION UPDATE');
          data = await handleLocationUpdate(data, req);
          break;
        case 'activity':
          console.log('==== ACTIVITY UPDATE');
          break;
        case 'health':
          console.log('==== HEALTH UPDATE');
          break;
        case 'summary':
          console.log('==== SUMMARY UPDATE');
          data = await handleSummaryUpdate(data, req);
          break;
        case 'trip':
          console.log('==== TRIP UPDATE=');
          break;
        default:
          break;
      }
    };
  }

  res.sendStatus(200);
});

async function handleLocationUpdate(data) {
  // update device in DB
  return await mongoose.model('Device').findOneAndUpdate(
    // filter: by device_id
    { device_id: data.device_id },
    // update: location data
    {
      location: {
        data: data.data,
        recorded_at: data.recorded_at
      }
    },
    // callback
    function(err, res) {
    if (err) throw err;

    return res;
  });
};

async function handleSummaryUpdate(data) {
  // update device in DB
  return await mongoose.model('Device').findOneAndUpdate(
    // filter: by device_id
    { device_id: data.device_id },
    // update: summary data
    {
      summary: {
        data: data.data,
        recorded_at: data.recorded_at
      }
    },
    // callback
    function(err, res) {
    if (err) throw err;

    return res;
  });
};

http.listen(8080, function(){
  console.log('listening on *:8080');
});