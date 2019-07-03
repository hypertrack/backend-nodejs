var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var cors = require('cors');

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

app.get('/', function (req, res) {
    console.log(JSON.stringify(req.headers));
    console.log(req.body);
    res.send('Hello HyperTrack');
});

app.post('/hypertrack', function (req, res) {
  console.log(JSON.stringify(req.headers));
  let webhookBody = JSON.parse(req.body);

  if(webhookBody) {
    webhookBody.forEach(data => {
      // notify client
      res.io.emit(data.type, data);

      switch (data.type) {
        case 'location':
          console.log('==== LOCATION UPDATE WEBHOOK ====');
          break;
        case 'activity':
          console.log('==== LOCATION UPDATE WEBHOOK ====');
          break;
        case 'health':
          console.log('==== HEALTH UPDATE WEBHOOK ====');
          break;
        case 'summary':
          console.log('==== SUMMARY UPDATE WEBHOOK ====');
          break;
        case 'trip':
          console.log('==== TRIP UPDATE WEBHOOK ====');
          break;
        default:
          console.log('==== UNKNOWN UPDATE WEBHOOK ====');
          break;
      }

      console.log(data);
    });
  }

  res.sendStatus(200);
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});