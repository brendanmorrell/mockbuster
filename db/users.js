const mongoose = require('mongoose');
const uri = 'mongodb://firstuser:firstpassword1@ds125851.mlab.com:25851/solo-project';

mongoose
  .connect(uri)
  .then(() => console.log('connected to databse'))
  .catch(e => console.log(e));

const UserSchema = new mongoose.Schema({
  githubID: { type: String, required: true },
  githubInfo: Object,
  movies: Object,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
