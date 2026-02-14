import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-this';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');

    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
        jwt.verify(token.value, JWT_SECRET);
        return NextResponse.json({ authenticated: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
