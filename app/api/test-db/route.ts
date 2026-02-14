import { NextResponse } from 'next/server';
import { testConnection, query } from '@/lib/db';

export async function GET() {
  try {
    // Test basic connection
    const connected = await testConnection();
    
    if (!connected) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        details: 'Could not connect to MySQL. Make sure XAMPP MySQL is running.'
      }, { status: 500 });
    }

    // Test query to nominations table
    const result = await query<{ count: number }[]>('SELECT COUNT(*) as count FROM nominations');
    
    return NextResponse.json({
      success: true,
      message: 'Database connected successfully!',
      nominationsCount: result[0]?.count || 0,
      database: 'womens_day_awards'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Database error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
