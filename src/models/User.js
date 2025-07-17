import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const xpHistorySchema = new mongoose.Schema(
  {
    amount: Number,
    action: String,
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  lastActiveDate: { type: Date, default: Date.now },
  dailyStreak: { type: Number, default: 0 },
  xpHistory: { type: [xpHistorySchema], default: [] } // 🆕 XP logs
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
