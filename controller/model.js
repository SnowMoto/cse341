const mongodb = require('../db/connect');
const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  users: [
    {
      user_id: String,
      username: String,
      email: String,
      password: String,
      state: String,
      dirtbike: String,
      riding_style: String,
      rider_level: String,
    },
  ],
});
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
