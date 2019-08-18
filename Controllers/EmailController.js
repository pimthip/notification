const nodeoutlook = require('nodejs-nodemailer-outlook')
const config = require('../configs/email')

function sendEmail(to, subject, message, cc, bcc){
    return new Promise((resolve, reject) =>{
        nodeoutlook.sendEmail({
            auth: {
                user: config.email,
                pass: config.password
            }, from: config.email,
            to: to,
            subject: subject,
            html: message,
            cc: cc,
            bcc: bcc,
            onError: (e) => reject(e),
            onSuccess: (i) => resolve(i)
        });
    })
}
module.exports = {
    send : async (req, res) =>{
        if (req.body.to && req.body.subject && req.body.message){
            let response = await sendEmail(req.body.to, req.body.subject, req.body.message, req.body.cc, req.body.bcc)
            res.json({status : true, data: response})
        }
        else{
            res.status(400);
            res.json({status : 'false', message: 'Parameter Required'})
        }

        
        
    }
}
