import { NextResponse } from 'next/server';
import { sql } from '../utils/sql';

export async function GET(req) {
  const q = SELECT id, title, short_description, price, thumbnail_url, category FROM courses WHERE published = true ORDER BY created_at DESC LIMIT 100;
  const { rows } = await sql.query(q);
  return NextResponse.json({ courses: rows });
}

export async function POST(req) {
  // Very small example: expects JSON body with instructor_id, title, short_description
  const body = await req.json();
  if (!body || !body.title || !body.instructor_id) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const q = `
    INSERT INTO courses (title, short_description, instructor_id, price, published, created_at)
    VALUES ($1, $2, $3, $4, true, now())
    RETURNING id, title, short_description, price
  `;
  const values = [body.title, body.short_description || '', body.instructor_id, body.price || 0];
  const { rows } = await sql.query(q, values);
  return NextResponse.json({ course: rows[0] }, { status: 201 });
}