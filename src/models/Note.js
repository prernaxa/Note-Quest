import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  content: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
