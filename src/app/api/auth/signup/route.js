import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req) {
  await dbConnect();
  const { name, email, password } = await req.json();

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ error: 'User already exists' }, { status: 400 });
    }

    const user = await User.create({ name, email, password });

    return Response.json({ userId: user._id });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Signup failed' }, { status: 500 });
  }
}
