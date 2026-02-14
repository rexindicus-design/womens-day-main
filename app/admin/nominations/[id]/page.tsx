'use client';
import { useEffect, useState, use } from 'react';
import { ArrowLeft, Download, FileText, ExternalLink } from 'lucide-react';
import Link from 'next/link';

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
    mobile_number: string;
    email_id: string;
    date_of_birth?: string;
    gender?: string;
    city_district: string;
    designation: string;
    organization: string;
    office_address?: string;
    years_in_org?: number;
    years_in_designation?: number;
    year_of_incorporation?: number;
    revenue?: string;
    website_url?: string;
    social_media_links?: string;
    sector: string;
    other_sector?: string;
    initiative_title: string;
    start_date: string;
    end_date: string;
    innovation_description: string;
    outcomes_achieved: string;
    execution_leadership: string;
    sustain_scale?: string;
    created_at: string;
    attachments: Attachment[];
}

export default function NominationDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [nomination, setNomination] = useState<Nomination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/nominations/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Nomination not found');
                return res.json();
            })
            .then((data) => {
                setNomination(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleStatusChange = async (newStatus: string) => {
        if (!nomination) return;
        setUpdating(true);
        try {
            const res = await fetch(`/api/nominations/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setNomination({ ...nomination, status: newStatus });
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error updating status');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-pink-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#C41E7F]"></div>
        </div>
    );
    if (error || !nomination) return <div className="p-8 text-center text-red-500">Error: {error || 'Nomination not found'}</div>;

    return (
        <div className="min-h-screen bg-pink-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/admin" className="text-gray-600 hover:text-[#C41E7F] flex items-center space-x-2 transition-colors">
                        <ArrowLeft size={20} />
                        <span>Back to Dashboard</span>
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100">
                    <div className="bg-gradient-to-r from-[#C41E7F] to-[#6B2D5B] p-6 text-white">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{nomination.nominee_name}</h1>
                            <p className="text-pink-100 text-lg opacity-90">{nomination.category}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 text-sm font-bold rounded-full uppercase tracking-wide bg-white shadow-sm ${nomination.status === 'selected' ? 'text-green-700' :
                                nomination.status === 'rejected' ? 'text-red-700' :
                                    'text-yellow-700'
                                }`}>
                                {nomination.status}
                            </span>
                            <div className="relative">
                                <select
                                    value={nomination.status}
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                    disabled={updating}
                                    className="appearance-none bg-white/20 hover:bg-white/30 text-white border border-white/50 py-1 px-3 pr-8 rounded text-sm focus:outline-none focus:bg-white/30 transition-colors cursor-pointer"
                                >
                                    <option value="pending" className="text-gray-800">Pending</option>
                                    <option value="under_review" className="text-gray-800">Under Review</option>
                                    <option value="shortlisted" className="text-gray-800">Shortlisted</option>
                                    <option value="selected" className="text-gray-800">Selected</option>
                                    <option value="rejected" className="text-gray-800">Rejected</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    {/* Personal Information */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-pink-100 pb-2 flex items-center">
                            <span className="bg-pink-100 text-[#C41E7F] text-xs px-2 py-1 rounded mr-2">01</span>
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem label="Mobile Number" value={nomination.mobile_number} />
                            <DetailItem label="Email Address" value={nomination.email_id} />
                            <DetailItem label="Date of Birth" value={nomination.date_of_birth ? new Date(nomination.date_of_birth).toLocaleDateString() : 'N/A'} />
                            <DetailItem label="Gender" value={nomination.gender} />
                            <DetailItem label="City/District" value={nomination.city_district} />
                        </div>
                    </section>

                    {/* Professional Information */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-pink-100 pb-2 flex items-center">
                            <span className="bg-pink-100 text-[#C41E7F] text-xs px-2 py-1 rounded mr-2">02</span>
                            Professional Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem label="Organization" value={nomination.organization} />
                            <DetailItem label="Designation" value={nomination.designation} />
                            <DetailItem label="Sector" value={nomination.sector} />
                            {nomination.other_sector && <DetailItem label="Other Sector" value={nomination.other_sector} />}
                            <DetailItem label="Years in Organization" value={nomination.years_in_org} />
                            <DetailItem label="Years in Designation" value={nomination.years_in_designation} />
                            <DetailItem label="Year of Incorporation" value={nomination.year_of_incorporation} />
                            <DetailItem label="Revenue" value={nomination.revenue} />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-gray-500 mb-1">Office Address</label>
                            <p className="text-gray-800 bg-pink-50 p-3 rounded-md border border-pink-100">{nomination.office_address || 'N/A'}</p>
                        </div>
                        {(nomination.website_url || nomination.social_media_links) && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DetailItem label="Website URL" value={nomination.website_url} isLink />
                                <DetailItem label="Social Media Links" value={nomination.social_media_links} isLink />
                            </div>
                        )}
                    </section>

                    {/* Nomination Details */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-pink-100 pb-2 flex items-center">
                            <span className="bg-pink-100 text-[#C41E7F] text-xs px-2 py-1 rounded mr-2">03</span>
                            Initiative & Impact
                        </h2>
                        <div className="mb-4">
                            <DetailItem label="Initiative Title" value={nomination.initiative_title} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            <DetailItem label="Start Date" value={nomination.start_date ? new Date(nomination.start_date).toLocaleDateString() : 'N/A'} />
                            <DetailItem label="End Date" value={nomination.end_date ? new Date(nomination.end_date).toLocaleDateString() : 'N/A'} />
                        </div>
                        <div className="space-y-6">
                            <RichDetailItem label="Innovation Description" value={nomination.innovation_description} />
                            <RichDetailItem label="Outcomes Achieved" value={nomination.outcomes_achieved} />
                            <RichDetailItem label="Execution & Leadership" value={nomination.execution_leadership} />
                            <RichDetailItem label="Sustainability & Scale" value={nomination.sustain_scale} />
                        </div>
                    </section>

                    {/* Attachments */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-pink-100 pb-2 flex items-center">
                            <span className="bg-pink-100 text-[#C41E7F] text-xs px-2 py-1 rounded mr-2">04</span>
                            Supporting Documents
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {nomination.attachments && nomination.attachments.length > 0 ? (
                                nomination.attachments.map((att) => {
                                    const url = att.file_url || att.link_url || '';
                                    const extension = url.split('.').pop()?.toLowerCase();
                                    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
                                    const isPdf = extension === 'pdf';

                                    return (
                                        <div key={att.id} className="border border-pink-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white hover:border-[#C41E7F]">
                                            <div className="p-3 bg-pink-50 border-b border-pink-100 flex justify-between items-center">
                                                <span className="font-medium text-gray-700 text-sm truncate pr-2" title={att.document_name}>{att.document_name || 'Document'}</span>
                                                <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#C41E7F] hover:text-[#B02A5A] text-xs font-semibold uppercase tracking-wider flex items-center">
                                                    {att.link_url ? <ExternalLink size={12} className="mr-1" /> : <Download size={12} className="mr-1" />}
                                                    {att.link_url ? 'Link' : 'Download'}
                                                </a>
                                            </div>
                                            <div className="h-32 bg-gray-50 flex items-center justify-center p-2">
                                                {isImage ? (
                                                    <img src={url} alt={att.document_name} className="max-h-full max-w-full object-contain" />
                                                ) : isPdf ? (
                                                    <div className="text-center text-gray-500">
                                                        <FileText size={32} className="mx-auto mb-1 text-red-500" />
                                                        <span className="text-xs">PDF Document</span>
                                                    </div>
                                                ) : (
                                                    <div className="text-center text-gray-500">
                                                        <FileText size={32} className="mx-auto mb-1" />
                                                        <span className="text-xs uppercase">{extension} File</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="col-span-full p-6 text-center text-gray-500 bg-pink-50 rounded-lg border border-dashed border-pink-300">
                                    No documents attached.
                                </div>
                            )}
                        </div>
                    </section>
                    <div className="text-right text-xs text-gray-400 mt-8 pt-4 border-t border-pink-100">
                        Nomination ID: {nomination.id} • Submitted on: {new Date(nomination.created_at).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ label, value, isLink }: { label: string, value?: string | number | null, isLink?: boolean }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">{label}</label>
            {isLink && value ? (
                <a href={value.toString()} target="_blank" rel="noopener noreferrer" className="text-[#C41E7F] hover:text-[#B02A5A] hover:underline break-words">
                    {value}
                </a>
            ) : (
                <div className="text-gray-800 font-medium break-words">{value || 'N/A'}</div>
            )}
        </div>
    );
}

function RichDetailItem({ label, value }: { label: string, value?: string | null }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-500 mb-2">{label}</label>
            <div className="bg-pink-50 p-4 rounded-lg border border-pink-100 text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
                {value || 'No details provided.'}
            </div>
        </div>
    );
}
