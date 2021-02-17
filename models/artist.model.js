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
    spotifyURL: {
        type: String,
    },
    approve: {
        type: Boolean,
        default: false,
        required:true
    },
    genre: String,
    img: String,
    facebookPage: String,
    youtubeChannel: String,
    description: String
}, {
  timestamps: true
}
);

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist