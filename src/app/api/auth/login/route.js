import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { updateStreakAndXP } from '@/lib/checkStreak'; // ✅ Correct path

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // ✅ Update streak and XP
    updateStreakAndXP(user);
    await user.save();

    return Response.json({ userId: user._id });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}
