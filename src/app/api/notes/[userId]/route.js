import dbConnect from '@/lib/dbConnect';
import Note from '@/models/Note';

export async function GET(req, { params }) {
  const { userId } = params;
  await dbConnect();

  try {
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    return Response.json(notes);
  } catch (err) {
    return Response.json({ error: 'Could not fetch notes' }, { status: 500 });
  }
}
