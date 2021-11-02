const { Schema, model } = require('mongoose');

const data = new Schema({
    userID: {
        type: String,
    },
    coins: {
        type: Number,
        default:0
    },
    cooldown : {
        type: String,
        default:"1"
    }
});

module.exports = model("Coins", data);
