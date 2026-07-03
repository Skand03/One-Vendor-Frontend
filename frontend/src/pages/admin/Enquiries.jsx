import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { supabase } from '../../services/supabaseClient';

const Enquiries = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockEnquiries = [
    {
      id: 1,
      name: 'Dr. Alistair Cook',
      company: 'St. James Grammar School',
      email: 'a.cook@stjames.edu',
      phone: '+44 7700 900077',
      category: 'SCHOOL SUPPLIES',
      message: 'Interested in bulk order of premium lab equipment for the new science block...',
      fullMessage: 'Dear One Vendor Team, we are currently expanding our senior science laboratory facilities and require a comprehensive quote for bulk purchase of microscopes, chemical storage units, and safety goggles. We would appreciate if you could review the attached requirements list and provide a competitive pricing structure. Looking forward to your response.',
      file: 'RFQ_STJ_2024.pdf',
      date: '24 Oct, 2023',
      status: 'New'
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      company: 'Horizon Tech Hub',
      email: 'sarah@horizon.co',
      phone: '+44 7700 900555',
      category: 'OFFICE TECH',
      message: 'We are looking to upgrade our main conference room suite with 4K panels...',
      fullMessage: 'We are looking to upgrade our main conference room suite with 4K panels, audio systems, and conference desk wiring. Please see the attached requirements catalog.',
      file: 'None',
      date: '23 Oct, 2023',
      status: 'Contacted'
    },
    {
      id: 3,
      name: 'Michael Vance',
      company: 'Vance Logistics Ltd',
      email: 'm.vance@logistics.net',
      phone: '+44 7700 900999',
      category: 'FURNITURE',
      message: 'Previous order #4456 was missing 2 ergonomic chairs. Please resolve...',
      fullMessage: 'Previous order #4456 was missing 2 ergonomic chairs. Please resolve this at the earliest as we have new team members onboarding next Monday.',
      file: 'Missing_Items.jpg',
      date: '20 Oct, 2023',
      status: 'Closed'
    }
  ];

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const { data, error } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped = data.map((item) => ({
            id: item.id,
            name: item.full_name,
            company: item.organization || 'Individual',
            email: item.email,
            phone: item.contact_number,
            category: item.category ? item.category.toUpperCase() : 'GENERAL',
            message: item.detailed_requirement ? item.detailed_requirement.slice(0, 80) + '...' : '',
            fullMessage: item.detailed_requirement,
            file: 'None',
            date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            }) : 'Just now',
            status: 'New'
          }));
          setEnquiries(mapped);
        } else {
          setEnquiries(mockEnquiries);
        }
      } catch (err) {
        console.error('Error fetching enquiries from Supabase:', err);
        setEnquiries(mockEnquiries);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const handleSelectEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowDrawer(true);
  };

  return (
    <>
      <AdminSidebar />

      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-surface dark:bg-surface-container-highest border-b border-secondary/30 flex justify-between items-center px-gutter z-40 shadow-sm">
        <div className="flex items-center w-1/2">
          <div className="relative w-full max-w-md group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors">search</span>
            <input className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-body-md focus:ring-1 focus:ring-secondary focus:bg-white transition-all" placeholder="Global search..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer hover:text-secondary transition-all">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
          </div>
          <span className="material-symbols-outlined text-primary cursor-pointer hover:text-secondary transition-all">help_outline</span>
          <div className="flex items-center gap-3 pl-6 border-l border-outline-variant/30">
            <div className="text-right">
              <p className="font-label-md text-label-md text-primary">Admin User</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Procurement Lead</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden border border-secondary/20">
              <img className="w-full h-full object-cover" alt="Admin headshot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgot0SqBSwqZ_fCTDvVjn1jn0uPySQlv92d0p7UtuvliPXDOA1gMK--XvNJu1CQfVCpGdmYlk6wNlzNJwwEneX6aP40ZhHlR60mhhL7xH11WF8nnfO3V3tiNXbkiParvz83vf4hsqECzxcX6QGCMZcY-rqmdwRuXocbGUyRAg7vjw9H_x41bp4Fbr1_4WaxdI0XfIc4zE3eWH2UKYhwUQMb0LXKyy1LKdIP1w5-cAnaRJPtBEl_rCNxkPfSmOrrD-d5KYQE9bfKWs"/>
            </div>
          </div>
        </div>
      </header>

      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-lg max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-md gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary">Enquiries</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Manage inbound requests from partner institutions.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-surface-container-high px-4 py-2 rounded-lg border-l-4 border-secondary flex flex-col">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Total Requests</span>
                <span className="font-headline-md text-primary">{loading ? '...' : enquiries.length}</span>
              </div>
              <div className="bg-primary-fixed px-4 py-2 rounded-lg border-l-4 border-primary flex flex-col">
                <span className="text-[10px] uppercase font-bold text-on-primary-fixed-variant tracking-wider">New Today</span>
                <span className="font-headline-md text-primary">{loading ? '...' : enquiries.filter(e => e.status === 'New').length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl custom-shadow p-4 mb-md flex flex-wrap items-center gap-4">
            <div className="flex-grow max-w-md relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full pl-10 pr-4 py-2.5 border border-outline-variant rounded-lg text-body-md focus:border-secondary focus:ring-0 transition-colors" placeholder="Search by name or company..." type="text"/>
            </div>
            <div className="relative">
              <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-bold text-secondary uppercase tracking-tighter">Status</label>
              <select className="pl-3 pr-8 py-2.5 border border-outline-variant rounded-lg text-body-md bg-transparent focus:border-secondary focus:ring-0 appearance-none min-w-[140px]">
                <option>All Enquiries</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Closed</option>
              </select>
            </div>
            <div className="relative">
              <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-bold text-secondary uppercase tracking-tighter">Date Range</label>
              <div className="flex items-center gap-2 pl-3 pr-3 py-2.5 border border-outline-variant rounded-lg text-body-md">
                <span className="material-symbols-outlined text-outline text-sm">calendar_today</span>
                <span>Oct 01 - Oct 31, 2023</span>
              </div>
            </div>
            <button className="ml-auto flex items-center gap-2 text-secondary font-label-md px-4 py-2 hover:bg-secondary-fixed/20 rounded-lg transition-colors">
              <span className="material-symbols-outlined">filter_list</span> Filters
            </button>
          </div>

          <div className="bg-white rounded-xl custom-shadow overflow-hidden border-t border-secondary/30">
            {loading ? (
              <div className="p-xl text-center text-primary font-bold">
                <span className="material-symbols-outlined animate-spin text-3xl">sync</span>
                <p className="mt-2">Loading enquiries...</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-primary font-label-md">
                    <th className="px-gutter py-4 font-semibold uppercase tracking-wider text-[11px]">Name / Company</th>
                    <th className="px-gutter py-4 font-semibold uppercase tracking-wider text-[11px]">Contact</th>
                    <th className="px-gutter py-4 font-semibold uppercase tracking-wider text-[11px]">Category</th>
                    <th className="px-gutter py-4 font-semibold uppercase tracking-wider text-[11px]">Message</th>
                    <th className="px-gutter py-4 font-semibold uppercase tracking-wider text-[11px]">File</th>
                    <th className="px-gutter py-4 font-semibold uppercase tracking-wider text-[11px]">Date</th>
                    <th className="px-gutter py-4 font-semibold uppercase tracking-wider text-[11px]">Status</th>
                    <th className="px-gutter py-4 font-semibold uppercase tracking-wider text-[11px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 font-body-md">
                  {enquiries.map((enquiry) => (
                    <tr 
                      key={enquiry.id} 
                      className="row-hover bg-primary-fixed-dim/5 transition-all cursor-pointer hover:bg-primary/[0.02]" 
                      onClick={() => handleSelectEnquiry(enquiry)}
                    >
                      <td className="px-gutter py-4">
                        <p className="font-bold text-primary">{enquiry.name}</p>
                        <p className="text-xs text-on-surface-variant">{enquiry.company}</p>
                      </td>
                      <td className="px-gutter py-4">
                        <p className="text-xs">{enquiry.email}</p>
                        <p className="text-xs text-on-surface-variant">{enquiry.phone}</p>
                      </td>
                      <td className="px-gutter py-4">
                        <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-1 rounded text-[10px] font-bold">{enquiry.category}</span>
                      </td>
                      <td className="px-gutter py-4">
                        <p className="truncate max-w-[150px] text-xs">{enquiry.message}</p>
                      </td>
                      <td className="px-gutter py-4">
                        <div className="flex items-center gap-1 text-primary hover:text-secondary transition-colors">
                          <span className="material-symbols-outlined text-lg">{enquiry.file !== 'None' ? 'description' : 'block'}</span>
                          <span className="text-[10px] font-medium">{enquiry.file}</span>
                        </div>
                      </td>
                      <td className="px-gutter py-4 text-xs whitespace-nowrap">{enquiry.date}</td>
                      <td className="px-gutter py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          enquiry.status === 'New' 
                            ? 'bg-blue-100 text-blue-800' 
                            : enquiry.status === 'Contacted'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            enquiry.status === 'New' 
                              ? 'bg-blue-500' 
                              : enquiry.status === 'Contacted'
                                ? 'bg-orange-500'
                                : 'bg-green-500'
                          }`}></span> 
                          {enquiry.status}
                        </span>
                      </td>
                      <td className="px-gutter py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1 hover:text-secondary" onClick={() => handleSelectEnquiry(enquiry)}><span className="material-symbols-outlined">visibility</span></button>
                          <button className="p-1 hover:text-green-600" onClick={() => alert(`Replying to ${enquiry.name} via Simulated Messenger`)}><span className="material-symbols-outlined">chat</span></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="px-gutter py-4 bg-surface-container-low flex justify-between items-center text-label-md">
              <span className="text-on-surface-variant">Showing 1-{enquiries.length} of {enquiries.length} entries</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center hover:bg-white"><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center">1</button>
                <button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center hover:bg-white"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedEnquiry && (
        <div className={`fixed right-0 top-0 h-screen w-[400px] bg-white shadow-2xl z-[60] transform transition-transform duration-300 border-l border-secondary/20 flex flex-col ${showDrawer ? 'translate-x-0' : 'translate-x-full'}`} id="side-drawer">
          <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
            <h3 className="font-headline-md text-primary">Enquiry Details</h3>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors" onClick={() => setShowDrawer(false)}>
              <span className="material-symbols-outlined text-outline">close</span>
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-xl font-bold">
                {selectedEnquiry.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-title-lg text-primary">{selectedEnquiry.name}</h4>
                <p className="text-body-md text-on-surface-variant">{selectedEnquiry.company}</p>
                <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-800">
                  {selectedEnquiry.status}
                </span>
              </div>
            </div>
            <div className="mb-8">
              <h5 className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">Message Body</h5>
              <div className="bg-surface-container-low p-4 rounded-lg">
                <p className="text-body-md leading-relaxed text-on-surface">
                  "{selectedEnquiry.fullMessage}"
                </p>
              </div>
            </div>
            <div className="mb-8">
              <h5 className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-3">Uploaded Document</h5>
              <div className="p-4 rounded-xl border border-outline-variant/30 bg-white flex items-center gap-4 group hover:border-secondary transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-body-md text-primary">{selectedEnquiry.file}</p>
                  <p className="text-[10px] text-on-surface-variant">Document File</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button className="text-xs text-secondary font-bold hover:underline" onClick={() => alert(`Downloading ${selectedEnquiry.file}`)}>Download</button>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h5 className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-3">Quick Meta</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10">
                  <p className="text-[10px] text-outline uppercase font-bold">Received On</p>
                  <p className="text-body-md font-medium">{selectedEnquiry.date}</p>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10">
                  <p className="text-[10px] text-outline uppercase font-bold">Category</p>
                  <p className="text-body-md font-medium">{selectedEnquiry.category}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-surface-container-high border-t border-outline-variant/20 grid grid-cols-2 gap-4">
            <button className="bg-white border border-primary text-primary py-3 rounded-lg font-label-md hover:bg-primary hover:text-white transition-all" onClick={() => alert('Marked as Closed!')}>
              Mark as Closed
            </button>
            <button className="bg-green-600 text-white py-3 rounded-lg font-label-md flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20" onClick={() => alert(`Starting WhatsApp Chat with ${selectedEnquiry.name}`)}>
              <span className="material-symbols-outlined text-base">chat</span> WhatsApp Reply
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Enquiries;
