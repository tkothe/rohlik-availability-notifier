require('dotenv').config();


const config = {
    slackUrl:  process.env.SLACK_URL,
    user_id: process.env.ROHLIK_USER_ID,
    users: process.env.USERS.split(":").map(u => { e = u.split("-") ; return { 'name' : e[0], 'address' : e[1]}}) 
}

module.exports = config
