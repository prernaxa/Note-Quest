import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { updateLevel } from '@/utils/xpUtils';

export async function POST(req) {
  await dbConnect();
  const { userId } = await req.json();

  const user = await User.findById(userId);
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 });

  user.xp += 5;
  user.lastActiveDate = new Date();
  updateLevel(user);
  await user.save();

  return Response.json(user);
}
