const routes = require('express').Router();
const EmailController = require('./Controllers/EmailController')
const LineController = require('./Controllers/LineController')
const FBController = require('./Controllers/FacebookController')

routes.post('/email', EmailController.send);
routes.post('/line/webhook', LineController.signature, LineController.webhook);
routes.get('/fb/webhook', FBController.webhook);
routes.post('/fb/webhook', FBController.posthook);

module.exports = routes;