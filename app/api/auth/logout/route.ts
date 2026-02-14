import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
    const cookie = serialize('admin_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0, // Expire immediately
        path: '/',
        sameSite: 'strict',
    });

    return NextResponse.json(
        { message: 'Logged out' },
        {
            status: 200,
            headers: {
                'Set-Cookie': cookie,
            },
        }
    );
}
