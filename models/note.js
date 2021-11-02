const { Schema, model } = require('mongoose');

const data = new Schema({
    userID: {
        type: String,
    },
    note : {
        type: String
    },
});

module.exports = model("note", data);
