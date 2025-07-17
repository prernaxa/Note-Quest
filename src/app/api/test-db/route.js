import dbConnect from '@/lib/dbConnect';

export async function GET() {
  try {
    await dbConnect();
    return Response.json({ message: 'MongoDB connected successfully!' });
  } catch (err) {
    console.error(err);
    return Response.json({ message: 'Connection failed' }, { status: 500 });
  }
}
