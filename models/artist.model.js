const mongoose = require('mongoose');
const { userSchema } = require('./user.model');
const Schema = mongoose.Schema

const artistSchema = new Schema({
    userInfo: userSchema,
    artistType: {
        type: String,
        enum: ["MUSICIAN", "BAND"],
        required: true
    },
    artisticName: {
        type: String,
        required: true
    },
    musicURL: {
        type: String,
    },
    approve: {
        type: Boolean,
        default: false
    },

}, {
  timestamps: true
}
);

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist