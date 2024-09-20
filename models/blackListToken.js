const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const blackListTokenSchema = new  Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});
blackListTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const  BlackListToken= mongoose.model('BlackListToken', blackListTokenSchema);
module.exports = BlackListToken;
