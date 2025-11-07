import { NextResponse } from 'next/server';
import { sql } from '../utils/sql';

export async function GET(req) {
  // For demo: get user by id from a query param ?user_id=...
  const url = new URL(req.url);
  const userId = url.searchParams.get('user_id') || null;
  if (!userId) {
    // stubbed demo profile
    return NextResponse.json({
      name: 'Demo Student',
      email: 'demo@edu.local',
      enrolledCount: 3,
      instructorCourseCount: 1,
      overallProgress: 42,
      recentActivity: ['Completed lesson 2', 'Submitted assignment 3']
    });
  }
  const q = SELECT id, name, email, role FROM auth_users WHERE id = $1;
  const { rows } = await sql.query(q, [userId]);
  if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(req) {
  const body = await req.json();
  if (!body || !body.id) return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  const fields = [];
  const values = [];
  let i = 1;
  if (body.name) { fields.push(name = $${i++}); values.push(body.name); }
  if (body.image_url) { fields.push(image_url = $${i++}); values.push(body.image_url); }
  values.push(body.id);
  const q = UPDATE auth_users SET ${fields.join(', ')} WHERE id = $${i} RETURNING id, name, email, image_url;
  const { rows } = await sql.query(q, values);
  return NextResponse.json(rows[0]);
}