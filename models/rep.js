const { Schema, model } = require('mongoose');

const data = new Schema({
    userID: {
        type: String,
    },
    rep : {
        type: Number
    },
    cooldown : {
        type: String,
        default:"1"
    }
});

module.exports = model("rep", data);
