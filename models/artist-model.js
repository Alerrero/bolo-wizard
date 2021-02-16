const mongoose = require('mongoose');
const Schema = mongoose.Schema

const artistSchema = new Schema({
    artistType: {
        type: String,
        enum: ["MUSICIAN", "BAND"],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    artisticName: {
        type: String,
        required: true
    },
    musicURL: {
        type: String,
    },
    role: {
        type: String,
        default: "ARTIST"
    }
}, {
  timestamps: true
}
);

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;