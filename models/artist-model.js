const mongoose = require('mongoose');
const Schema = mongoose.Schema

const artistSchema = new Schema({
    accountType: {
        type: String,
        enum: ["Musician", "Band"],
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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    musicURL: {
        type: String,
        required: true
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
