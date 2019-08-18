const routes = require('express').Router();
const EmailController = require('./Controllers/EmailController')
const LineController = require('./Controllers/LineController')
const FBController = require('./Controllers/LineController')

routes.post('/email', EmailController.send);
routes.post('/line/webhook', LineController.signature, LineController.webhook);
routes.get('/fb/webhook', FBController.webhook);

module.exports = routes;