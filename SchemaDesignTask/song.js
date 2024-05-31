const mongoose = require('mongoose')
const { Schema } = mongoose

const songSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: Schema.Types.ObjectId, ref: 'Album' },
  genre: { type: String },
  duration: { type: Number, required: true }, // duration in seconds
  releaseDate: { type: Date }
})

const Song = mongoose.model('Song', songSchema)
module.exports = Song
