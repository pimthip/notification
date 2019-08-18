const express = require('express')
const app = express()
const routes = require('./routes');
const config = require('./configs')
const bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');

    // Middleware 

    next();
});

app.use('/', routes) 


app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))