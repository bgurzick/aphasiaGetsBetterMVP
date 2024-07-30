
import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  currentCity: { type: String },
  hometown: { type: String },
  siblings: [{ type: String }],
  bestFriends: [{ type: String }]
});

const userProfile = mongoose.model('user_profile', userProfileSchema);


export default userProfile;
