import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  firstMember: {
    type: String,
    required: true,
  },
  secondMember: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
