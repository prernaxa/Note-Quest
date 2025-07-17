import dbConnect from '@/lib/dbConnect';
import Note from '@/models/Note';
import User from '@/models/User';
import { updateLevel } from '@/utils/xpUtils';

export async function POST(req) {
  const { noteId, userId } = await req.json();
  await dbConnect();

  try {
    // 1. Delete the note
    await Note.findByIdAndDelete(noteId);

    // 2. Fetch and update user XP
    const user = await User.findById(userId);
    const xpLost = 2;

    user.xp = Math.max(0, user.xp - xpLost);
    user.level = Math.floor(Math.sqrt(user.xp / 100)) + 1;
    updateLevel(user);

    // 3. Add XP loss history log
    user.xpHistory.push({
      amount: -xpLost,
      action: 'delete_note',
      timestamp: new Date(),
    });

    // 4. Save user
    await user.save();

    return Response.json(user);
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}
