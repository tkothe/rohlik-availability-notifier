const http = require('https');
const axios = require('axios').create({
    baseURL: 'https://www.rohlik.cz/services/frontend-service/timeslots-api/0',
    timeout: 10000,
});

config = require('./config.js')

var SlackWebhook = require('slack-webhook')

/*
 * finding the address ID is accomplished by sending HTTP POST to
 * https://www.rohlik.cz/services/frontend-service/delivery-address/check
 * with parameters
 *   streetWithNumber
 *   city
 *   isGeocodeResult: false
 *
 *   like this
 *   curl 'https://www.rohlik.cz/services/frontend-service/delivery-address/check' -XPOST -H 'Content-Type: application/json' --data-binary '{"streetWithNumber": "√öjezd 3", "city": "Praha", "isGeocodeResult": false}'
 *
 */

// TODO add error handling if SLACK_URL is not set
var slack = new SlackWebhook(config.slackUrl);

console.log("here we go...");
slack.send("I restarted and lost my memory...");

doIt = function() {
    config.users.forEach ( e => {
        axios.request({params : { userId: config.user_id, addressId: e.address}})
            .then(res => {
                f = res.data.data.firstDeliveryAvailableSinceMessage;
                if ( e.lastF != f) {
                    message =  new Date().toISOString() + " new slot for " + e.name + ": " + f;
                    slack.send(message);
                    console.log(message);
                    e.lastF = f;
                }
                else {
                    console.log(new Date().toISOString() + " no new slot for " + e.name)
                }
            })
            .catch(function (error) {
                console.log(error.message);
            });
    })
}

doIt();
setInterval (doIt, 30000)
