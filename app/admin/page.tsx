'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LogOut, FileText, Download, ExternalLink, Grid, List as ListIcon, ChevronLeft, ChevronRight, Search, X, Filter, FileDown, GripVertical } from 'lucide-react';

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

interface FilterOptions {
    categories: string[];
    cities: string[];
    sectors: string[];
    statuses: string[];
}

interface ColumnConfig {
    [key: string]: string;
}

function AdminDashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [nominations, setNominations] = useState<Nomination[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'preview'>('list');
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [downloadingId, setDownloadingId] = useState<number | null>(null);

    // Filter states
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [cityFilter, setCityFilter] = useState<string>('all');
    const [sectorFilter, setSectorFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [dateFrom, setDateFrom] = useState<string>('');
    const [dateTo, setDateTo] = useState<string>('');
    const [showFilters, setShowFilters] = useState(false);

    // Filter options from API
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        categories: [],
        cities: [],
        sectors: [],
        statuses: ['pending', 'under_review', 'shortlisted', 'selected', 'rejected'],
    });

    // CSV Export modal states
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportColumns, setExportColumns] = useState<ColumnConfig>({});
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
    const [exporting, setExporting] = useState(false);

    // Get page from URL or default to 1
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;

    // Fetch filter options on mount
    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                const res = await fetch('/api/nominations/export', { method: 'POST' });
                if (res.ok) {
                    const data = await res.json();
                    setFilterOptions(data.filters);
                    setExportColumns(data.columns);
                    // Default: select all columns
                    setSelectedColumns(Object.keys(data.columns));
                }
            } catch (error) {
                console.error('Failed to fetch filter options:', error);
            }
        };
        fetchFilterOptions();
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/check');
                if (!res.ok) {
                    router.push('/admin/login');
                } else {
                    fetchNominations(page);
                }
            } catch (error) {
                router.push('/admin/login');
            }
        };
        checkAuth();
    }, [router, page, statusFilter, categoryFilter, cityFilter, sectorFilter, searchQuery, dateFrom, dateTo]);

    const fetchNominations = async (currentPage: number) => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: limit.toString(),
                status: statusFilter,
            });

            if (categoryFilter !== 'all') params.set('category', categoryFilter);
            if (cityFilter !== 'all') params.set('city', cityFilter);
            if (sectorFilter !== 'all') params.set('sector', sectorFilter);
            if (searchQuery) params.set('search', searchQuery);
            if (dateFrom) params.set('dateFrom', dateFrom);
            if (dateTo) params.set('dateTo', dateTo);

            const res = await fetch(`/api/nominations?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setNominations(data.data);

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

    const clearFilters = () => {
        setStatusFilter('all');
        setCategoryFilter('all');
        setCityFilter('all');
        setSectorFilter('all');
        setSearchQuery('');
        setDateFrom('');
        setDateTo('');
        setPage(1);
    };

    const hasActiveFilters = () => {
        return statusFilter !== 'all' || categoryFilter !== 'all' || cityFilter !== 'all' ||
            sectorFilter !== 'all' || searchQuery || dateFrom || dateTo;
    };

    const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
        setPage(1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (pagination && page < pagination.totalPages!) setPage(page + 1);
    };

    // CSV Export functions
    const toggleColumn = (col: string) => {
        setSelectedColumns(prev =>
            prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
        );
    };

    const selectAllColumns = () => {
        setSelectedColumns(Object.keys(exportColumns));
    };

    const deselectAllColumns = () => {
        setSelectedColumns([]);
    };

    const moveColumn = (index: number, direction: 'up' | 'down') => {
        const newColumns = [...selectedColumns];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        if (swapIndex >= 0 && swapIndex < newColumns.length) {
            [newColumns[index], newColumns[swapIndex]] = [newColumns[swapIndex], newColumns[index]];
            setSelectedColumns(newColumns);
        }
    };

    const handleExportCSV = async () => {
        if (selectedColumns.length === 0) {
            alert('Please select at least one column to export.');
            return;
        }

        setExporting(true);
        try {
            const params = new URLSearchParams({
                columns: selectedColumns.join(','),
                status: statusFilter,
            });

            if (categoryFilter !== 'all') params.set('category', categoryFilter);
            if (cityFilter !== 'all') params.set('city', cityFilter);
            if (sectorFilter !== 'all') params.set('sector', sectorFilter);
            if (searchQuery) params.set('search', searchQuery);
            if (dateFrom) params.set('dateFrom', dateFrom);
            if (dateTo) params.set('dateTo', dateTo);

            const response = await fetch(`/api/nominations/export?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Export failed');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nominations_export_${new Date().toISOString().slice(0, 10)}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            setShowExportModal(false);
        } catch (error) {
            console.error('Export error:', error);
            alert('Failed to export CSV. Please try again.');
        } finally {
            setExporting(false);
        }
    };

    const handleDownloadPDF = async (nominationId: number, nomineeName: string) => {
        setDownloadingId(nominationId);
        try {
            const response = await fetch(`/api/nominations/${nominationId}/pdf`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to generate PDF');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nomination_${nominationId}_${nomineeName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download error:', error);
            alert(error instanceof Error ? error.message : 'Failed to download PDF. Please try again.');
        } finally {
            setDownloadingId(null);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-pink-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#C41E7F]"></div>
        </div>
    );

    return (
        <div className="p-8 bg-pink-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-[#C41E7F]">Admin Dashboard</h1>
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors border ${showFilters || hasActiveFilters() ? 'bg-[#C41E7F] text-white border-[#C41E7F]' : 'bg-white text-gray-700 border-pink-200 hover:border-[#C41E7F]'}`}
                        >
                            <Filter size={18} />
                            <span>Filters</span>
                            {hasActiveFilters() && <span className="bg-white text-[#C41E7F] text-xs px-1.5 py-0.5 rounded-full font-bold">!</span>}
                        </button>
                        <button
                            onClick={() => setShowExportModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                        >
                            <FileDown size={18} />
                            <span>Export CSV</span>
                        </button>
                        <div className="bg-white rounded-lg shadow-sm border border-pink-100 p-1 flex">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md flex items-center space-x-2 transition-colors ${viewMode === 'list' ? 'bg-[#C41E7F] text-white' : 'text-gray-600 hover:bg-pink-50'}`}
                                title="List View"
                            >
                                <ListIcon size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('preview')}
                                className={`p-2 rounded-md flex items-center space-x-2 transition-colors ${viewMode === 'preview' ? 'bg-[#C41E7F] text-white' : 'text-gray-600 hover:bg-pink-50'}`}
                                title="Preview View"
                            >
                                <Grid size={20} />
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

                {/* Filters Panel */}
                {showFilters && (
                    <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Filter Nominations</h2>
                            {hasActiveFilters() && (
                                <button onClick={clearFilters} className="text-sm text-[#C41E7F] hover:underline flex items-center gap-1">
                                    <X size={14} /> Clear All
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Search */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                                        placeholder="Name, org, or email..."
                                        className="w-full border border-pink-200 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:border-[#C41E7F]"
                                    />
                                    <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={handleStatusFilterChange}
                                    className="w-full border border-pink-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#C41E7F]"
                                >
                                    <option value="all">All Statuses</option>
                                    {filterOptions.statuses.map(s => (
                                        <option key={s} value={s}>{s.replace('_', ' ')}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                                    className="w-full border border-pink-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#C41E7F]"
                                >
                                    <option value="all">All Categories</option>
                                    {filterOptions.categories.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            {/* City/District */}
                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City/District</label>
                                <select
                                    value={cityFilter}
                                    onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}
                                    className="w-full border border-pink-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#C41E7F]"
                                >
                                    <option value="all">All Cities</option>
                                    {filterOptions.cities.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div> */}

                            {/* Sector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                                <select
                                    value={sectorFilter}
                                    onChange={(e) => { setSectorFilter(e.target.value); setPage(1); }}
                                    className="w-full border border-pink-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#C41E7F]"
                                >
                                    <option value="all">All Sectors</option>
                                    {filterOptions.sectors.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Results count */}
                        {pagination && (
                            <div className="mt-4 text-sm text-gray-600">
                                Showing {nominations.length} of {pagination.total} nominations
                                {hasActiveFilters() && ' (filtered)'}
                            </div>
                        )}
                    </div>
                )}

                {/* Export Modal */}
                {showExportModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-800">Export to CSV</h2>
                                <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto max-h-[60vh]">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-sm text-gray-600">
                                        Select columns to export and drag to reorder. The export will include the current filters.
                                    </p>
                                    <div className="flex gap-2">
                                        <button onClick={selectAllColumns} className="text-xs text-[#C41E7F] hover:underline">Select All</button>
                                        <span className="text-gray-300">|</span>
                                        <button onClick={deselectAllColumns} className="text-xs text-[#C41E7F] hover:underline">Deselect All</button>
                                    </div>
                                </div>

                                {/* Column selection with ordering */}
                                <div className="space-y-2">
                                    {selectedColumns.map((col, index) => (
                                        <div key={col} className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                                            <div className="flex flex-col gap-0.5">
                                                <button
                                                    onClick={() => moveColumn(index, 'up')}
                                                    disabled={index === 0}
                                                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                                >
                                                    <ChevronLeft size={14} className="rotate-90" />
                                                </button>
                                                <button
                                                    onClick={() => moveColumn(index, 'down')}
                                                    disabled={index === selectedColumns.length - 1}
                                                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                                >
                                                    <ChevronRight size={14} className="rotate-90" />
                                                </button>
                                            </div>
                                            <GripVertical size={16} className="text-gray-400" />
                                            <span className="flex-1 text-sm font-medium text-gray-700">{exportColumns[col]}</span>
                                            <button onClick={() => toggleColumn(col)} className="text-red-400 hover:text-red-600">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Unselected columns */}
                                {Object.keys(exportColumns).filter(col => !selectedColumns.includes(col)).length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500 mb-2">Available columns (click to add):</p>
                                        <div className="flex flex-wrap gap-2">
                                            {Object.keys(exportColumns)
                                                .filter(col => !selectedColumns.includes(col))
                                                .map(col => (
                                                    <button
                                                        key={col}
                                                        onClick={() => toggleColumn(col)}
                                                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                                                    >
                                                        + {exportColumns[col]}
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50">
                                <span className="text-sm text-gray-600">{selectedColumns.length} columns selected</span>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowExportModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleExportCSV}
                                        disabled={exporting || selectedColumns.length === 0}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {exporting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                Exporting...
                                            </>
                                        ) : (
                                            <>
                                                <Download size={18} />
                                                Export CSV
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`/admin/nominations/${nomination.id}`}
                                                    className="text-[#C41E7F] hover:text-[#B02A5A] font-medium hover:underline"
                                                >
                                                    View Details
                                                </Link>
                                                <button
                                                    onClick={() => handleDownloadPDF(nomination.id, nomination.nominee_name)}
                                                    disabled={downloadingId === nomination.id}
                                                    className="text-[#C41E7F] hover:text-[#B02A5A] flex items-center gap-1 text-xs border border-[#C41E7F] px-2 py-1 rounded hover:bg-pink-50 disabled:opacity-50 disabled:cursor-wait"
                                                    title="Download PDF"
                                                >
                                                    <Download size={12} className={downloadingId === nomination.id ? 'animate-pulse' : ''} />
                                                    {downloadingId === nomination.id ? '...' : 'PDF'}
                                                </button>
                                            </div>
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

                                <div className="mt-4 pt-4 border-t border-pink-100 flex gap-2">
                                    <Link
                                        href={`/admin/nominations/${nomination.id}`}
                                        className="flex-1 text-center bg-[#C41E7F] hover:bg-[#B02A5A] text-white font-medium py-2 rounded transition-colors"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleDownloadPDF(nomination.id, nomination.nominee_name)}
                                        disabled={downloadingId === nomination.id}
                                        className="flex items-center justify-center gap-1 px-3 py-2 border border-[#C41E7F] text-[#C41E7F] rounded hover:bg-pink-50 transition-colors disabled:opacity-50 disabled:cursor-wait"
                                        title="Download PDF"
                                    >
                                        <Download size={16} className={downloadingId === nomination.id ? 'animate-pulse' : ''} />
                                    </button>
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
