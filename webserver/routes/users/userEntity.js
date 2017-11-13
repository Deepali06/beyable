let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt-nodejs');
let schema = new mongoose.Schema({
    id: String,
    fname: String,
    lname: String,
    email: String,
    password: String,
    loggedinStatus: Boolean,
    isEmailVerified: Boolean,
    verificationID: String,
});
schema.statics.generateHash = function(password) {
    // console.log('Inside generating hashing method');
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
schema.methods.validPassword = function(password) {
  console.log(password ,this.password,"from validPassword");
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('user', schema);
