require('dotenv').config();

users = require('./users.js')

const config = {
    slackUrl:  process.env.SLACK_URL,
    user_id: process.env.ROHLIK_USER_ID,
    users: users
}

module.exports = config
