const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: { type: Schema.Types.ObjectId, ref: 'UserPreferences' },
    playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }]
  })
  
  const User = mongoose.model('User', userSchema)
  module.exports = User
  