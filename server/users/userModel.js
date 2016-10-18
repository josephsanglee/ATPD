var Promise = require('bluebird');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: {type: String, required: true }
});


UserSchema.methods.comparePasswords = function(enteredPassword, currentPassword) {
  bcrypt.compare(enteredPassword, currentPassword, function(err, res) {
    return new Promise(function(resolve, reject) {
      if (err) { return reject(err); }

      return resolve(res);
    });
  });
};

UserSchema.pre('save', function(next) {
  var user = this;

  //method on mongoose schemas
  //allows the server to do check the database
  //for a user without having to check password as well
  if(!user.isModified('password')) {
    next();
  }

  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) { return next(err); }

    user.password = hash;
    next();
  });
});








module.exports = mongoose.model('users', UserSchema);