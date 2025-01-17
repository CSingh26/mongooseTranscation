const playlistSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
    createdAt: { type: Date, default: Date.now }
  })
  
  const Playlist = mongoose.model('Playlist', playlistSchema)
  module.exports = Playlist
  