import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// All available columns for export
const ALL_COLUMNS = {
    id: 'ID',
    category: 'Category',
    nominee_name: 'Nominee Name',
    gender: 'Gender',
    date_of_birth: 'Date of Birth',
    mobile_number: 'Mobile Number',
    email_id: 'Email',
    city_district: 'City/District',
    designation: 'Designation',
    organization: 'Organization',
    office_address: 'Office Address',
    years_in_org: 'Years in Organization',
    years_in_designation: 'Years in Designation',
    year_of_incorporation: 'Year of Incorporation',
    revenue: 'Revenue',
    website_url: 'Website URL',
    social_media_links: 'Social Media Links',
    sector: 'Sector',
    other_sector: 'Other Sector',
    initiative_title: 'Initiative Title',
    start_date: 'Start Date',
    end_date: 'End Date',
    innovation_description: 'Innovation Description',
    outcomes_achieved: 'Outcomes Achieved',
    execution_leadership: 'Execution Leadership',
    sustain_scale: 'Sustain & Scale',
    status: 'Status',
    created_at: 'Created At',
    updated_at: 'Updated At',
};

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // Get filter parameters
        const status = searchParams.get('status');
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const city = searchParams.get('city');
        const sector = searchParams.get('sector');
        const dateFrom = searchParams.get('dateFrom');
        const dateTo = searchParams.get('dateTo');

        // Get columns to export (comma-separated list or 'all')
        const columnsParam = searchParams.get('columns') || 'all';
        const columnOrder = columnsParam === 'all'
            ? Object.keys(ALL_COLUMNS)
            : columnsParam.split(',').filter(col => col in ALL_COLUMNS);

        if (columnOrder.length === 0) {
            return NextResponse.json(
                { error: 'No valid columns specified' },
                { status: 400 }
            );
        }

        // Build query conditions
        const conditions: string[] = [];
        const queryParams: any[] = [];

        if (status && status !== 'all') {
            conditions.push('status = ?');
            queryParams.push(status);
        }

        if (category && category !== 'all') {
            conditions.push('category = ?');
            queryParams.push(category);
        }

        if (search) {
            conditions.push('(nominee_name LIKE ? OR organization LIKE ? OR email_id LIKE ?)');
            const searchTerm = `%${search}%`;
            queryParams.push(searchTerm, searchTerm, searchTerm);
        }

        if (city && city !== 'all') {
            conditions.push('city_district = ?');
            queryParams.push(city);
        }

        if (sector && sector !== 'all') {
            conditions.push('sector = ?');
            queryParams.push(sector);
        }

        if (dateFrom) {
            conditions.push('DATE(created_at) >= ?');
            queryParams.push(dateFrom);
        }

        if (dateTo) {
            conditions.push('DATE(created_at) <= ?');
            queryParams.push(dateTo);
        }

        const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

        // Get nominations
        const nominationsQuery = `SELECT * FROM nominations ${whereClause} ORDER BY created_at DESC`;
        const nominations = await query<any[]>(nominationsQuery, queryParams);

        // Build CSV content
        const escapeCSV = (value: any): string => {
            if (value === null || value === undefined) return '';
            const str = String(value);
            // Escape quotes and wrap in quotes if contains comma, quote, or newline
            if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };

        // Create header row using custom labels
        const headers = columnOrder.map(col => ALL_COLUMNS[col as keyof typeof ALL_COLUMNS]);
        const csvRows = [headers.join(',')];

        // Add data rows
        for (const nomination of nominations) {
            const row = columnOrder.map(col => {
                let value = nomination[col];

                // Format dates
                if ((col === 'date_of_birth' || col === 'start_date' || col === 'end_date') && value) {
                    const d = new Date(value);
                    value = isNaN(d.getTime()) ? String(value) : d.toISOString().split('T')[0];
                } else if ((col === 'created_at' || col === 'updated_at') && value) {
                    const d = new Date(value);
                    value = isNaN(d.getTime()) ? String(value) : d.toISOString();
                }

                return escapeCSV(value);
            });
            csvRows.push(row.join(','));
        }

        const csvContent = csvRows.join('\n');

        // Return CSV file
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const filename = `nominations_export_${timestamp}.csv`;

        return new NextResponse(csvContent, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error('Export error:', error);
        return NextResponse.json(
            { error: 'Failed to export nominations' },
            { status: 500 }
        );
    }
}

// Return available columns for the UI
export async function POST(request: NextRequest) {
    try {
        // Also get unique values for filter dropdowns
        const categories = await query<any[]>('SELECT DISTINCT category FROM nominations ORDER BY category');
        const cities = await query<any[]>('SELECT DISTINCT city_district FROM nominations WHERE city_district IS NOT NULL ORDER BY city_district');
        const sectors = await query<any[]>('SELECT DISTINCT sector FROM nominations WHERE sector IS NOT NULL ORDER BY sector');

        return NextResponse.json({
            columns: ALL_COLUMNS,
            filters: {
                categories: categories.map(r => r.category),
                cities: cities.map(r => r.city_district),
                sectors: sectors.map(r => r.sector),
                statuses: ['pending', 'under_review', 'shortlisted', 'selected', 'rejected'],
            },
        });
    } catch (error) {
        console.error('Export metadata error:', error);
        return NextResponse.json(
            { error: 'Failed to get export metadata' },
            { status: 500 }
        );
    }
}
