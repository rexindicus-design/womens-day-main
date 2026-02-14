import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Fetch nomination details
        const nominations = await query<any[]>('SELECT * FROM nominations WHERE id = ?', [id]);

        if (nominations.length === 0) {
            return NextResponse.json(
                { error: 'Nomination not found' },
                { status: 404 }
            );
        }

        const nomination = nominations[0];

        // Fetch attachments
        const attachments = await query<any[]>(
            'SELECT * FROM nomination_attachments WHERE nomination_id = ?',
            [id]
        );

        return NextResponse.json({
            ...nomination,
            attachments,
        });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch nomination details' },
            { status: 500 }
        );
    }

}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        const allowedStatuses = ['pending', 'under_review', 'shortlisted', 'selected', 'rejected'];

        if (!status || !allowedStatuses.includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status' },
                { status: 400 }
            );
        }

        await query(
            'UPDATE nominations SET status = ? WHERE id = ?',
            [status, id]
        );

        return NextResponse.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to update nomination status' },
            { status: 500 }
        );
    }
}
