import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { updateStreakAndXP } from '@/lib/checkStreak';

export async function GET(req, { params }) {
  await dbConnect();
  const user = await User.findById(params.id);
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 });

  const updated = updateStreakAndXP(user);
  await updated.save();


  return Response.json(JSON.parse(JSON.stringify(updated))); // ✅ fixes Date serialization

}
