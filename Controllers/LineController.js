const line = require('node-line-bot-api');
const config = require('../configs/line')
line.init({
    accessToken: config.accessToken,
    // (Optional) for webhook signature validation
    channelSecret: config.channelSecret
  });
module.exports = {
    signature: line.validator.validateSignature(),
    webhook : async (req, res) =>{
        await req.body.events.map(async (event) => {
            try {
              let replyMsg = 'Hello';
              // reply message
              await line.client
                .replyMessage({
                  replyToken: event.replyToken,
                  messages: replyMsg
                });
            }catch(err){
              await line.client
                .replyMessage({
                  replyToken: event.replyToken,
                  messages: 'Process error'
                });
            }
          });
            
          res.json({success: true});
    },
    

}