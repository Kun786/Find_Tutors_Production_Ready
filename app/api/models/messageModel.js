const mongoose = require("mongoose");
mongoose.pluralize(null);
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    usrId: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});
var messageModel = mongoose.model('messages', messageSchema);
module.exports = messageModel;