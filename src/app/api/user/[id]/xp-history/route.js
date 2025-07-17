import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET(req, { params }) {
    console.log("Fetching XP history for:", params.id);
  await dbConnect();

  try {
    const user = await User.findById(params.id);
    if (!user) return Response.json({ error: 'User not found' }, { status: 404 });

    return Response.json(user.xpHistory || []);
  } catch (err) {
    return Response.json({ error: 'Failed to fetch XP history' }, { status: 500 });
  }
}
