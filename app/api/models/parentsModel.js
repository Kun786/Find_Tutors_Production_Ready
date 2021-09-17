const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
mongoose.pluralize(null);
const saltRounds = 10;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var parentsSchema = new Schema({
    name: { type: String, required: true },
    fname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    dob: {type: Date},
    gender: {type: String, required: true},
    language: { type: String, required: true },
    city: { type: String, required: true },
    pic: {type: String},
    password: { type: String, required: true },
    description: {type: String, required: true},
    address: { type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: Date
});
parentsSchema.plugin(mongooseUniqueValidator);
parentsSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});
var parentsModel = mongoose.model('Parents', parentsSchema);
module.exports = parentsModel;