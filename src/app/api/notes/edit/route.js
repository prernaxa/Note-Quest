import dbConnect from '@/lib/dbConnect';
import Note from '@/models/Note';
import User from '@/models/User';
import { updateLevel } from '@/utils/xpUtils';

export async function POST(req) {
  const { _id, title, content, userId } = await req.json();
  await dbConnect();

  try {
    // 1. Update the note content
    await Note.findByIdAndUpdate(_id, { title, content });

    // 2. Update user XP and level
    const user = await User.findById(userId);
    const xpEarned = 3;

    user.xp += xpEarned;
    user.level = Math.floor(Math.sqrt(user.xp / 100)) + 1;
    updateLevel(user);

    // 3. Log XP gain in history
    user.xpHistory.push({
      amount: xpEarned,
      action: 'edit_note',
      timestamp: new Date(),
    });

    // 4. Save user
    await user.save();

    return Response.json(user);
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Failed to edit note' }, { status: 500 });
  }
}
