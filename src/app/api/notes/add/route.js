import dbConnect from '@/lib/dbConnect';
import Note from '@/models/Note';
import User from '@/models/User';
import { updateLevel } from '@/utils/xpUtils';

export async function POST(req) {
  const { title, content, userId } = await req.json();
  await dbConnect();

  try {
    // 1. Create the note
    await Note.create({ title, content, userId });

    // 2. Fetch and update user XP
    const user = await User.findById(userId);
    const xpEarned = 10;

    user.xp += xpEarned;
    user.level = Math.floor(Math.sqrt(user.xp / 100)) + 1;
    updateLevel(user); // if you have more logic inside

    // 3. Add XP history log
    user.xpHistory.push({
      amount: xpEarned,
      action: 'create_note',
      timestamp: new Date(),
    });

    // 4. Save the updated user
    await user.save();

    return Response.json(user);
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Failed to add note' }, { status: 500 });
  }
}
