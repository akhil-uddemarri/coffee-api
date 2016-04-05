var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': false}));

require('./api-routes')(app);

app.listen(config.port)
console.log('listening on PORT: ' + config.port);
