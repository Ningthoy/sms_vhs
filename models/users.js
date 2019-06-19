var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var user = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String },
    name: { type: String },
    usertype: { type: Number },
    username: {type: String, required: true},
    lastLogin: {type: Date}
});
user.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
user.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', user);