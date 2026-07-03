import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const Dashboard = () => {
  useEffect(() => {
    try {
      // Simple search focus visual effect
        const searchInput = document.querySelector('input[type="text"]');
        const searchContainer = searchInput.parentElement;
        
        searchInput.addEventListener('focus', () => {
            searchContainer.classList.add('shadow-lg', 'scale-[1.02]');
        });
        
        searchInput.addEventListener('blur', () => {
            searchContainer.classList.remove('shadow-lg', 'scale-[1.02]');
        });

        // Dynamic Greeting (Optional micro-interaction)
        window.addEventListener('DOMContentLoaded', () => {
            const hour = new Date().getHours();
            const welcomeText = document.querySelector('main h2');
            let greeting = "Executive Overview";
            if (hour < 12) greeting = "Good Morning, Alex";
            else if (hour < 18) greeting = "Good Afternoon, Alex";
            else greeting = "Good Evening, Alex";
            welcomeText.textContent = greeting;
        });
    } catch (err) {
      console.error("Error running stitch micro-interactions:", err);
    }
  }, []);
  return (
    <>
      

<AdminSidebar />

<main className="flex-1 ml-64 min-h-screen relative overflow-y-auto bg-surface-dim">

<header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-surface flex justify-between items-center px-gutter border-b border-secondary/30 shadow-[0px_4px_20px_rgba(10,35,66,0.05)] z-40">
<div className="flex items-center gap-6 flex-1">
<div className="relative w-full max-w-md group focus-within:ring-1 focus-within:ring-secondary rounded-lg transition-all duration-200">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full bg-surface-container-low border-none rounded-lg pl-11 pr-4 py-2 font-body-md text-body-md focus:ring-0" placeholder="Search orders, clients, or enquiries..." type="text"/>
</div>
</div>
<div className="flex items-center gap-6">
<button className="relative text-on-surface-variant hover:text-secondary transition-colors">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
</button>
<div className="h-8 w-px bg-outline-variant"></div>
<div className="flex items-center gap-3">
<div className="text-right hidden sm:block">
<p className="font-label-md text-label-md font-bold text-primary">Alex Sterling</p>
<p className="font-label-md text-label-md text-on-surface-variant">Procurement Lead</p>
</div>
<img className="w-10 h-10 rounded-full border-2 border-secondary object-cover" data-alt="A professional headshot of a senior administrative lead in a modern corporate setting. The lighting is soft and high-key, emphasizing a clean and authoritative executive presence. He is wearing a dark navy tailored suit that contrasts against a blurred, light grey minimalist architectural background. The overall mood is reliable, sophisticated, and warm." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs4Kd3nQS4TJ9BGvRAXszpOJwhivTSKhUS6sWnlMNK-8FaN1JgD5J33mnLGi6YhssiOcrQVHB0gkJ0edGZI_W2xgnxvm0I0r-ZD0OAN7eRLQa33_eT-DZHMWHp4l1IssGIJyUqmBW1B2vr0lRm9VAWu6Q5J4zT7gSeCwi1mZI7bzhUQwIJZQmhtoNUoPMO1GPDUtnOYzV-RsH7iBPUx4D0WXDVqj7h3HjDEqQnaHC51pwSHEb0umLlG3KtaevfvrCTuhyvs6M6ECE"/>
</div>
</div>
</header>

<div className="pt-24 pb-12 px-gutter max-w-container-max mx-auto">

<div className="mb-lg flex justify-between items-end">
<div>
<h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Executive Overview</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Manage One Vendor Solutions ecosystem efficiently.</p>
</div>
<button className="bg-primary-container text-on-primary font-body-md text-body-md px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary transition-all duration-300 ambient-shadow border-b-2 border-secondary">
<span className="material-symbols-outlined text-[20px]">add</span>
                    Create New Booking
                </button>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-lg">

<div className="bg-surface-container-lowest p-gutter rounded-xl ambient-shadow gold-accent-border group hover:-translate-y-1 transition-transform duration-300">
<div className="flex justify-between items-start mb-4">
<div className="p-3 rounded-lg bg-surface-container-high text-primary">
<span className="material-symbols-outlined">question_answer</span>
</div>
<span className="text-secondary font-bold text-label-md bg-secondary/10 px-2 py-1 rounded">Month-to-date</span>
</div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Total Enquiries</p>
<h3 className="font-display-lg text-display-lg text-primary mt-1">2,450</h3>
<p className="text-on-secondary-container text-body-md mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span className="font-bold">+12%</span> vs last month
                    </p>
</div>

<div className="bg-surface-container-lowest p-gutter rounded-xl ambient-shadow gold-accent-border group hover:-translate-y-1 transition-transform duration-300">
<div className="flex justify-between items-start mb-4">
<div className="p-3 rounded-lg bg-secondary-container/20 text-secondary">
<span className="material-symbols-outlined">event_note</span>
</div>
<span className="text-primary font-bold text-label-md bg-primary-fixed/30 px-2 py-1 rounded">Attention Required</span>
</div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Pending Bookings</p>
<h3 className="font-display-lg text-display-lg text-primary mt-1">128</h3>
<p className="text-on-surface-variant text-body-md mt-2">Requires immediate vetting</p>
</div>

<div className="bg-surface-container-lowest p-gutter rounded-xl ambient-shadow gold-accent-border group hover:-translate-y-1 transition-transform duration-300">
<div className="flex justify-between items-start mb-4">
<div className="p-3 rounded-lg bg-surface-container-high text-primary">
<span className="material-symbols-outlined">trending_up</span>
</div>
</div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">New This Week</p>
<h3 className="font-display-lg text-display-lg text-secondary mt-1">+45</h3>
<div className="w-full bg-surface-variant h-1 rounded-full mt-4 overflow-hidden">
<div className="bg-secondary h-full w-[65%]"></div>
</div>
</div>

<div className="bg-surface-container-lowest p-gutter rounded-xl ambient-shadow gold-accent-border group hover:-translate-y-1 transition-transform duration-300">
<div className="flex justify-between items-start mb-4">
<div className="p-3 rounded-lg bg-primary-container text-surface">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>inventory_2</span>
</div>
</div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Total Products</p>
<h3 className="font-display-lg text-display-lg text-primary mt-1">12,000+</h3>
<p className="text-on-surface-variant text-body-md mt-2">Active SKUs in Catalog</p>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start">

<div className="lg:col-span-2 bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden">
<div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-white">
<h3 className="font-title-lg text-title-lg text-primary">Recent Enquiries</h3>
<button className="text-secondary font-label-md text-label-md hover:underline">Export CSV</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-dim/30">
<th className="px-6 py-4 font-label-md text-label-md text-primary uppercase tracking-wider">Client Name</th>
<th className="px-6 py-4 font-label-md text-label-md text-primary uppercase tracking-wider">Requirement</th>
<th className="px-6 py-4 font-label-md text-label-md text-primary uppercase tracking-wider text-center">Status</th>
<th className="px-6 py-4 font-label-md text-label-md text-primary uppercase tracking-wider">Date</th>
<th className="px-6 py-4 font-label-md text-label-md text-primary uppercase tracking-wider text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/20">
<tr className="hover:bg-primary/[0.02] transition-colors group">
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center text-on-secondary-container font-bold text-xs">JD</div>
<div>
<p className="font-body-md text-body-md font-bold text-primary">Jane Davenport</p>
<p className="text-[11px] text-on-surface-variant">St. Mary's Academy</p>
</div>
</div>
</td>
<td className="px-6 py-5 font-body-md text-body-md text-on-surface-variant">Bulk Stationery Supply</td>
<td className="px-6 py-5 text-center">
<span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold uppercase tracking-wide">New</span>
</td>
<td className="px-6 py-5 font-body-md text-body-md text-on-surface-variant">Oct 14, 2023</td>
<td className="px-6 py-5 text-right">
<button className="text-secondary font-label-md text-label-md font-bold hover:text-primary transition-colors">VIEW</button>
</td>
</tr>
<tr className="hover:bg-primary/[0.02] transition-colors group">
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary-fixed-dim/30 flex items-center justify-center text-primary font-bold text-xs">RK</div>
<div>
<p className="font-body-md text-body-md font-bold text-primary">Robert Kilgore</p>
<p className="text-[11px] text-on-surface-variant">Metropolis Tech</p>
</div>
</div>
</td>
<td className="px-6 py-5 font-body-md text-body-md text-on-surface-variant">IT Infrastructure Refresh</td>
<td className="px-6 py-5 text-center">
<span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant text-[11px] font-bold uppercase tracking-wide">In Progress</span>
</td>
<td className="px-6 py-5 font-body-md text-body-md text-on-surface-variant">Oct 12, 2023</td>
<td className="px-6 py-5 text-right">
<button className="text-secondary font-label-md text-label-md font-bold hover:text-primary transition-colors">VIEW</button>
</td>
</tr>
<tr className="hover:bg-primary/[0.02] transition-colors group">
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-xs">LM</div>
<div>
<p className="font-body-md text-body-md font-bold text-primary">Lydia Moore</p>
<p className="text-[11px] text-on-surface-variant">Greenfield Hospital</p>
</div>
</div>
</td>
<td className="px-6 py-5 font-body-md text-body-md text-on-surface-variant">Medical Grade Cleaners</td>
<td className="px-6 py-5 text-center">
<span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-bold uppercase tracking-wide">Completed</span>
</td>
<td className="px-6 py-5 font-body-md text-body-md text-on-surface-variant">Oct 10, 2023</td>
<td className="px-6 py-5 text-right">
<button className="text-secondary font-label-md text-label-md font-bold hover:text-primary transition-colors">VIEW</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="space-y-gutter">
<div className="bg-surface-container-lowest p-6 rounded-xl ambient-shadow">
<div className="flex justify-between items-center mb-6">
<h3 className="font-title-lg text-title-lg text-primary">Next Appointments</h3>
<span className="material-symbols-outlined text-secondary cursor-pointer hover:rotate-180 transition-transform duration-500">sync</span>
</div>
<div className="space-y-4">

<div className="group flex items-start gap-4 p-4 rounded-lg bg-surface-dim/20 border-l-4 border-secondary hover:bg-surface transition-colors cursor-pointer">
<div className="text-center min-w-[50px]">
<p className="text-[10px] uppercase font-bold text-on-surface-variant">OCT</p>
<p className="text-xl font-bold text-primary">15</p>
</div>
<div className="flex-1">
<p className="font-body-md text-body-md font-bold text-primary group-hover:text-secondary transition-colors">Sarah Jenkins</p>
<p className="text-xs text-on-surface-variant">Strategic Planning Call</p>
<p className="text-[11px] mt-2 flex items-center gap-1 text-on-secondary-container">
<span className="material-symbols-outlined text-[14px]">schedule</span> 10:30 AM (GMT)
                                    </p>
</div>
</div>

<div className="group flex items-start gap-4 p-4 rounded-lg bg-surface-dim/20 border-l-4 border-primary-container/20 hover:bg-surface transition-colors cursor-pointer">
<div className="text-center min-w-[50px]">
<p className="text-[10px] uppercase font-bold text-on-surface-variant">OCT</p>
<p className="text-xl font-bold text-primary">16</p>
</div>
<div className="flex-1">
<p className="font-body-md text-body-md font-bold text-primary group-hover:text-secondary transition-colors">Michael Wu</p>
<p className="text-xs text-on-surface-variant">Vendor Vetting Session</p>
<p className="text-[11px] mt-2 flex items-center gap-1 text-on-secondary-container">
<span className="material-symbols-outlined text-[14px]">schedule</span> 02:00 PM (GMT)
                                    </p>
</div>
</div>

<div className="group flex items-start gap-4 p-4 rounded-lg bg-surface-dim/20 border-l-4 border-primary-container/20 hover:bg-surface transition-colors cursor-pointer">
<div className="text-center min-w-[50px]">
<p className="text-[10px] uppercase font-bold text-on-surface-variant">OCT</p>
<p className="text-xl font-bold text-primary">18</p>
</div>
<div className="flex-1">
<p className="font-body-md text-body-md font-bold text-primary group-hover:text-secondary transition-colors">Elena Rodriguez</p>
<p className="text-xs text-on-surface-variant">Contract Review Meeting</p>
<p className="text-[11px] mt-2 flex items-center gap-1 text-on-secondary-container">
<span className="material-symbols-outlined text-[14px]">schedule</span> 11:15 AM (GMT)
                                    </p>
</div>
</div>
</div>
<button className="w-full mt-6 py-3 border-2 border-secondary/50 text-secondary font-bold text-label-md rounded-lg hover:bg-secondary hover:text-white transition-all duration-300">
                            VIEW CALENDAR
                        </button>
</div>

<div className="relative overflow-hidden rounded-xl bg-primary-container p-6 ambient-shadow text-on-primary">
<div className="relative z-10">
<h4 className="font-title-lg text-title-lg mb-2">Need Assistance?</h4>
<p className="font-body-md text-body-md text-on-primary-container mb-4">Direct line to procurement specialists available 24/7.</p>
<button className="bg-secondary text-primary font-bold text-label-md px-4 py-2 rounded-lg hover:scale-105 transition-transform">
                                Connect Now
                            </button>
</div>
<span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] text-on-primary-container/10 select-none">support_agent</span>
</div>
</div>
</div>
</div>

<footer className="px-gutter py-8 max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center text-on-surface-variant font-label-md text-label-md gap-4">
<p>© 2023 One Vendor Solutions | ProcureLink Enterprise Admin</p>
<div className="flex gap-6">
<a className="hover:text-secondary transition-colors" href="#">Privacy Policy</a>
<a className="hover:text-secondary transition-colors" href="#">Service Terms</a>
<a className="hover:text-secondary transition-colors" href="#">Help Center</a>
</div>
</footer>
</main>



    </>
  );
};

export default Dashboard;
