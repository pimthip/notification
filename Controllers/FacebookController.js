const config = require('../configs/facebook')
const axios = require('axios')
module.exports = {
    webhook : async (req, res) =>{   
        let VERIFY_TOKEN = config.verifyToken
    
        // Parse the query params
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
            
        // Checks if a token and mode is in the query string of the request
        if (mode && token) {
        
            // Checks the mode and token sent is correct
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
            
            } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);      
            }
        }
    },
    posthook: async (req, res) => {  
 
        let body = req.body;
      
        // Checks this is an event from a page subscription
        if (body.object === 'page') {
      
          // Iterates over each entry - there may be multiple if batched
          body.entry.forEach(async function(entry) {
      
            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
            if (webhook_event.message && webhook_event.message.text){
                let reply = webhook_event.message.text + ' ครับ'
                try {
                    await sendAPI(webhook_event.sender.id, reply)
                }
                catch (e){
                    console.log(e)
                }
            }
            
          });
      
          // Returns a '200 OK' response to all requests
          res.status(200).send('EVENT_RECEIVED');
        } else {
          // Returns a '404 Not Found' if event is not from a page subscription
          res.sendStatus(404);
        }
      
    }
}
async function sendAPI (id, message){
    let data = 
    {
        "recipient": {
            "id": id
        },
        "message": {
            "text": message
        }
    }
    await axios.post('https://graph.facebook.com/v4.0/me/messages?access_token=' + config.token,data);
}