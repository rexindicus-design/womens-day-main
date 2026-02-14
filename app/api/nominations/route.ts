import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');
        const offset = (page - 1) * limit;

        // Build query conditions
        let whereClause = '';
        const queryParams: any[] = [];

        if (status && status !== 'all') {
            whereClause = 'WHERE status = ?';
            queryParams.push(status);
        }

        // Get total count
        const countQuery = `SELECT COUNT(*) as total FROM nominations ${whereClause}`;
        const countResult = await query<any[]>(countQuery, queryParams);
        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        // Get paginated nominations
        const nominationsQuery = `SELECT * FROM nominations ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        queryParams.push(limit, offset);

        const nominations = await query<any[]>(nominationsQuery, queryParams);

        if (nominations.length === 0) {
            return NextResponse.json({
                data: [],
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages,
                },
            });
        }

        // Get attachments for these nominations
        const nominationIds = nominations.map((n) => n.id);
        const placeholders = nominationIds.map(() => '?').join(',');

        // We need to handle the case where placeholders might be empty if no nominations found, 
        // but we handled length === 0 above.

        // However, if we have nominations, we fetch attachments.
        // Note: If limit is large, this IN clause is fine.
        const attachments = await query<any[]>(
            `SELECT * FROM nomination_attachments WHERE nomination_id IN (${placeholders})`,
            nominationIds
        );

        // Merge attachments
        const nominationsWithAttachments = nominations.map((nomination) => {
            const nominationAttachments = attachments.filter(
                (att) => att.nomination_id === nomination.id
            );
            return {
                ...nomination,
                attachments: nominationAttachments,
            };
        });

        return NextResponse.json({
            data: nominationsWithAttachments,
            pagination: {
                total,
                page,
                limit,
                totalPages,
            },
        });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch nominations' },
            { status: 500 }
        );
    }
}
