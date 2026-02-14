'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LogOut, FileText, Download, ExternalLink, Grid, List as ListIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface Attachment {
    id: number;
    document_name: string;
    file_url: string | null;
    link_url: string | null;
}

interface Nomination {
    id: number;
    nominee_name: string;
    category: string;
    status: string;
    created_at: string;
    attachments: Attachment[];
}

interface PaginationData {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
    totalPages?: number;
    currentPage?: number;
}

function AdminDashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [nominations, setNominations] = useState<Nomination[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'preview'>('list');
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Get page from URL or default to 1
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/check');
                if (!res.ok) {
                    router.push('/admin/login');
                } else {
                    fetchNominations(page, statusFilter);
                }
            } catch (error) {
                router.push('/admin/login');
            }
        };
        checkAuth();
    }, [router, page, statusFilter]);

    const fetchNominations = async (currentPage: number, status: string) => {
        try {
            setLoading(true);
            const offset = (currentPage - 1) * limit;
            const res = await fetch(`/api/nominations?page=${currentPage}&limit=${limit}&status=${status}`);
            if (res.ok) {
                const data = await res.json();
                setNominations(data.data);

                // Calculate total pages
                const total = data.pagination.total;
                const totalPages = Math.ceil(total / limit);

                setPagination({
                    ...data.pagination,
                    totalPages,
                    currentPage
                });
            }
        } catch (error) {
            console.error('Failed to fetch nominations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const setPage = (newPage: number) => {
        router.push(`/admin?page=${newPage}`);
    };

    const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
        setPage(1); // Reset to first page on filter change
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (pagination && page < pagination.totalPages!) setPage(page + 1);
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-pink-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#C41E7F]"></div>
        </div>
    );

    return (
        <div className="p-8 bg-pink-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-[#C41E7F]">Admin Dashboard</h1>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={handleStatusFilterChange}
                                className="appearance-none bg-white border border-pink-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-[#C41E7F]"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="under_review">Under Review</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="selected">Selected</option>
                                <option value="rejected">Rejected</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-pink-100 p-1 flex">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md flex items-center space-x-2 transition-colors ${viewMode === 'list' ? 'bg-[#C41E7F] text-white' : 'text-gray-600 hover:bg-pink-50'}`}
                                title="List View"
                            >
                                <ListIcon size={20} />
                                <span className="text-sm font-medium">List</span>
                            </button>
                            <button
                                onClick={() => setViewMode('preview')}
                                className={`p-2 rounded-md flex items-center space-x-2 transition-colors ${viewMode === 'preview' ? 'bg-[#C41E7F] text-white' : 'text-gray-600 hover:bg-pink-50'}`}
                                title="Preview View"
                            >
                                <Grid size={20} />
                                <span className="text-sm font-medium">Preview</span>
                            </button>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-[#C41E7F] hover:bg-[#B02A5A] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>

                {viewMode === 'list' ? (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100">
                        <table className="min-w-full">
                            <thead className="bg-[#C41E7F] text-white">
                                <tr>
                                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Nominee Name</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Category</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Attachments</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-pink-100">
                                {nominations.map((nomination) => (
                                    <tr key={nomination.id} className="hover:bg-pink-50 transition-colors">
                                        <td className="py-4 px-6 text-sm text-gray-700 font-medium">{nomination.nominee_name}</td>
                                        <td className="py-4 px-6 text-sm text-gray-700">{nomination.category}</td>
                                        <td className="py-4 px-6 text-sm text-gray-700">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${nomination.status === 'selected' ? 'bg-green-100 text-green-800' :
                                                nomination.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {nomination.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-700">
                                            <Link
                                                href={`/admin/nominations/${nomination.id}`}
                                                className="text-[#C41E7F] hover:text-[#B02A5A] font-medium hover:underline"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-700">
                                            <div className="flex flex-col space-y-1">
                                                {nomination.attachments && nomination.attachments.length > 0 ? (
                                                    nomination.attachments.map((att) => (
                                                        <a
                                                            key={att.id}
                                                            href={att.file_url || att.link_url || '#'}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[#C41E7F] hover:text-[#B02A5A] hover:underline flex items-center text-xs"
                                                        >
                                                            {att.link_url ? <ExternalLink size={12} className="mr-1" /> : <Download size={12} className="mr-1" />}
                                                            {att.document_name || 'View File'}
                                                        </a>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-400 italic text-xs">No attachments</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {nominations.map((nomination) => (
                            <div key={nomination.id} className="bg-white border border-pink-100 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#C41E7F]">{nomination.nominee_name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{nomination.category}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${nomination.status === 'selected' ? 'bg-green-100 text-green-800' :
                                        nomination.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {nomination.status}
                                    </span>
                                </div>
                                <div className="mb-4 text-xs text-gray-400">
                                    Submitted on: {new Date(nomination.created_at).toLocaleDateString()}
                                </div>

                                <div className="flex-grow">
                                    {nomination.attachments && nomination.attachments.length > 0 && (
                                        <div className="mb-4 space-y-2">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Attachments</p>
                                            <div className="space-y-2">
                                                {nomination.attachments.slice(0, 3).map((att) => {
                                                    const url = att.file_url || att.link_url || '';
                                                    const extension = url.split('.').pop()?.toLowerCase();
                                                    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');

                                                    return (
                                                        <div key={att.id} className="border border-pink-100 rounded p-2 bg-pink-50">
                                                            {isImage && url ? (
                                                                <div className="h-32 mb-2 bg-gray-200 rounded overflow-hidden">
                                                                    <img src={url} alt={att.document_name} className="w-full h-full object-cover" />
                                                                </div>
                                                            ) : null}
                                                            <a
                                                                href={url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-[#C41E7F] hover:text-[#B02A5A] hover:underline flex items-center text-sm truncate"
                                                                title={att.document_name}
                                                            >
                                                                {att.link_url ? <ExternalLink size={14} className="mr-2 flex-shrink-0" /> : <FileText size={14} className="mr-2 flex-shrink-0" />}
                                                                <span className="truncate">{att.document_name || 'View File'}</span>
                                                            </a>
                                                        </div>
                                                    )
                                                })}
                                                {nomination.attachments.length > 3 && (
                                                    <p className="text-xs text-gray-400 italic">+{nomination.attachments.length - 3} more attachments</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-pink-100">
                                    <Link
                                        href={`/admin/nominations/${nomination.id}`}
                                        className="block w-full text-center bg-[#C41E7F] hover:bg-[#B02A5A] text-white font-medium py-2 rounded transition-colors"
                                    >
                                        View Full Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                {pagination && pagination.totalPages! > 1 && (
                    <div className="flex justify-center items-center mt-8 space-x-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={page === 1}
                            className={`p-2 rounded-full border ${page === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-[#C41E7F] text-[#C41E7F] hover:bg-pink-50'}`}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <span className="text-gray-600 font-medium">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={page === pagination.totalPages}
                            className={`p-2 rounded-full border ${page === pagination.totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-[#C41E7F] text-[#C41E7F] hover:bg-pink-50'}`}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <AdminDashboardContent />
        </Suspense>
    );
}
