import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const Bookings = () => {
  const [view, setView] = useState('list');

  useEffect(() => {
    try {
      // Search bar interaction
      const searchInput = document.querySelector('input[type="text"]');
      if (searchInput) {
        searchInput.addEventListener('focus', () => {
          searchInput.parentElement.classList.add('scale-[1.02]');
        });
        searchInput.addEventListener('blur', () => {
          searchInput.parentElement.classList.remove('scale-[1.02]');
        });
      }
    } catch (err) {
      console.error("Error running stitch micro-interactions:", err);
    }
  }, []);

  return (
    <>
      <AdminSidebar />

      <header className="h-16 w-full sticky top-0 z-30 bg-surface dark:bg-surface-container text-primary dark:text-primary-fixed border-b border-secondary/30 shadow-sm flex justify-between items-center px-lg ml-64 max-w-[calc(100%-16rem)]">
        <div className="flex items-center gap-lg flex-1">
          <h2 className="font-headline-md text-headline-md text-primary whitespace-nowrap">Admin Console</h2>
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-10 pr-4 focus:border-secondary focus:ring-0 text-body-md transition-all" placeholder="Search orders, clients, slots..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <nav className="hidden md:flex items-center gap-md mr-md">
            <a className="text-on-surface-variant font-label-md text-label-md hover:text-secondary transition-transform scale-95" href="#">Reports</a>
            <a className="text-on-surface-variant font-label-md text-label-md hover:text-secondary transition-transform scale-95" href="#">Analytics</a>
          </nav>
          <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-secondary"><span className="material-symbols-outlined">notifications</span></button>
          <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-secondary"><span className="material-symbols-outlined">apps</span></button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary/30">
            <img className="w-full h-full object-cover" data-alt="Professional studio portrait of a corporate administrator in business attire, clean white background, soft professional lighting, sharp focus, navy blue and gold color accents in wardrobe, minimalist B2B dashboard vibe." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_5lXvxxOPLPh2IsUx0KA0k5ZuMHy04-lFpMu48BpiwDAzi6Umvr8OrZ6rCe_OY0nlrg0AyDbeMYz0eUZEeCTY4X_PmJ8Ptg2BGjxqHQLSepKhrg2P8Mr32SZ27jPnjhWPuemEuTPSmX6_uWqMVqgmucB5iJ9zNai10a95VSLvpViGRBcbkkJPOO-scyT1kQgKUrFuoVZox7ClF0CppSgTqYOMs0yKiONO_sWTelKIDrar588rtO5Zc32MxhcNSUIFodSYH4kMxt0"/>
          </div>
        </div>
      </header>

      <main className="ml-64 p-lg">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-lg gap-md">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-primary">Slot Bookings</h1>
              <p className="text-on-surface-variant mt-1">Manage and monitor customer service schedules</p>
            </div>
            <div className="flex items-center gap-md">
              <div className="bg-surface-container-high p-1 rounded-xl flex gap-1">
                <button 
                  className={`px-6 py-2 rounded-lg font-title-lg text-sm flex items-center gap-2 transition-all ${
                    view === 'list' 
                      ? 'bg-primary text-white font-bold' 
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                  onClick={() => setView('list')}
                >
                  <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
                  List View
                </button>
                <button 
                  className={`px-6 py-2 rounded-lg font-title-lg text-sm flex items-center gap-2 transition-all ${
                    view === 'calendar' 
                      ? 'bg-primary text-white font-bold' 
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                  onClick={() => setView('calendar')}
                >
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  Calendar View
                </button>
              </div>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:opacity-90 shadow-lg border-b-2 border-secondary-fixed transition-all active:scale-95">
                <span className="material-symbols-outlined">event_available</span>
                Book New Slot
              </button>
            </div>
          </div>

          <div className={view === 'list' ? "space-y-md" : "hidden"} id="listViewContent">
            <div className="bg-white rounded-xl custom-shadow overflow-hidden border-t-4 border-secondary">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-primary border-b border-outline-variant">
                      <th className="p-md font-bold text-label-md uppercase tracking-wider">Customer Name</th>
                      <th className="p-md font-bold text-label-md uppercase tracking-wider">Phone</th>
                      <th className="p-md font-bold text-label-md uppercase tracking-wider">Date</th>
                      <th className="p-md font-bold text-label-md uppercase tracking-wider">Time Slot</th>
                      <th className="p-md font-bold text-label-md uppercase tracking-wider">Status</th>
                      <th className="p-md font-bold text-label-md uppercase tracking-wider text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    <tr className="hover:bg-primary/5 transition-colors group">
                      <td className="p-md">
                        <div className="flex items-center gap-sm">
                          <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-primary font-bold text-xs">JD</div>
                          <span className="font-title-lg text-body-lg">Jonathan Davis</span>
                        </div>
                      </td>
                      <td className="p-md text-on-surface-variant font-body-md">+1 (555) 012-3456</td>
                      <td className="p-md text-on-surface-variant font-body-md">Oct 24, 2023</td>
                      <td className="p-md">
                        <span className="bg-surface-container-highest px-3 py-1 rounded-full text-primary font-bold text-xs">09:00 AM - 10:30 AM</span>
                      </td>
                      <td className="p-md">
                        <span className="flex items-center gap-1.5 text-xs font-bold px-2 py-1 bg-green-100 text-green-800 rounded-lg w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                          Confirmed
                        </span>
                      </td>
                      <td className="p-md">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary/10 rounded-lg transition-all" title="Reschedule"><span className="material-symbols-outlined">edit_calendar</span></button>
                          <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-all" title="Cancel"><span className="material-symbols-outlined">cancel</span></button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-primary/5 transition-colors group">
                      <td className="p-md">
                        <div className="flex items-center gap-sm">
                          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-xs">SW</div>
                          <span className="font-title-lg text-body-lg">Sarah Williams</span>
                        </div>
                      </td>
                      <td className="p-md text-on-surface-variant font-body-md">+1 (555) 987-6543</td>
                      <td className="p-md text-on-surface-variant font-body-md">Oct 24, 2023</td>
                      <td className="p-md">
                        <span className="bg-surface-container-highest px-3 py-1 rounded-full text-primary font-bold text-xs">11:00 AM - 12:30 PM</span>
                      </td>
                      <td className="p-md">
                        <span className="flex items-center gap-1.5 text-xs font-bold px-2 py-1 bg-orange-100 text-orange-800 rounded-lg w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                          Pending
                        </span>
                      </td>
                      <td className="p-md">
                        <div className="flex items-center justify-center gap-2">
                          <button className="px-3 py-1 bg-primary text-white text-xs font-bold rounded hover:opacity-90">Confirm</button>
                          <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-all"><span className="material-symbols-outlined">close</span></button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-primary/5 transition-colors group">
                      <td className="p-md">
                        <div className="flex items-center gap-sm">
                          <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-primary font-bold text-xs">MR</div>
                          <span className="font-title-lg text-body-lg">Marcus Rodriguez</span>
                        </div>
                      </td>
                      <td className="p-md text-on-surface-variant font-body-md">+1 (555) 246-8101</td>
                      <td className="p-md text-on-surface-variant font-body-md">Oct 23, 2023</td>
                      <td className="p-md">
                        <span className="bg-surface-container-highest px-3 py-1 rounded-full text-primary font-bold text-xs">02:30 PM - 04:00 PM</span>
                      </td>
                      <td className="p-md">
                        <span className="flex items-center gap-1.5 text-xs font-bold px-2 py-1 bg-blue-100 text-blue-800 rounded-lg w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                          Completed
                        </span>
                      </td>
                      <td className="p-md">
                        <div className="flex items-center justify-center gap-2 opacity-50">
                          <button className="text-xs font-bold text-on-surface-variant" disabled>Archived</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-primary/5 transition-colors group">
                      <td className="p-md">
                        <div className="flex items-center gap-sm">
                          <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-primary font-bold text-xs">EL</div>
                          <span className="font-title-lg text-body-lg">Emily Lawson</span>
                        </div>
                      </td>
                      <td className="p-md text-on-surface-variant font-body-md">+1 (555) 333-4444</td>
                      <td className="p-md text-on-surface-variant font-body-md">Oct 25, 2023</td>
                      <td className="p-md">
                        <span className="bg-surface-container-highest px-3 py-1 rounded-full text-primary font-bold text-xs">10:00 AM - 11:30 AM</span>
                      </td>
                      <td className="p-md">
                        <span className="flex items-center gap-1.5 text-xs font-bold px-2 py-1 bg-green-100 text-green-800 rounded-lg w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                          Confirmed
                        </span>
                      </td>
                      <td className="p-md">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary/10 rounded-lg transition-all"><span className="material-symbols-outlined">edit_calendar</span></button>
                          <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-all"><span className="material-symbols-outlined">cancel</span></button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-md bg-surface-container-lowest flex items-center justify-between border-t border-outline-variant/30">
                <span className="text-sm text-on-surface-variant">Showing 4 of 24 active bookings</span>
                <div className="flex gap-2">
                  <button className="p-2 rounded hover:bg-surface-container border border-outline-variant text-primary disabled:opacity-30" disabled>
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="p-2 rounded hover:bg-surface-container border border-outline-variant text-primary">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={view === 'calendar' ? "animate-in fade-in duration-300" : "hidden"} id="calendarViewContent">
            <div className="bg-white rounded-xl custom-shadow overflow-hidden border-t-4 border-secondary p-md">
              <div className="flex items-center justify-between mb-md">
                <div className="flex items-center gap-md">
                  <h3 className="font-headline-md text-primary">October 2023</h3>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-surface-container rounded transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
                    <button className="p-1 hover:bg-surface-container rounded transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span> Confirmed
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant">
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span> Pending
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-px bg-outline-variant/20 rounded-lg overflow-hidden border border-outline-variant/20">
                <div className="bg-surface-container-low p-3 text-center font-bold text-label-md text-primary">SUN</div>
                <div className="bg-surface-container-low p-3 text-center font-bold text-label-md text-primary">MON</div>
                <div className="bg-surface-container-low p-3 text-center font-bold text-label-md text-primary">TUE</div>
                <div className="bg-surface-container-low p-3 text-center font-bold text-label-md text-primary">WED</div>
                <div className="bg-surface-container-low p-3 text-center font-bold text-label-md text-primary">THU</div>
                <div className="bg-surface-container-low p-3 text-center font-bold text-label-md text-primary">FRI</div>
                <div className="bg-surface-container-low p-3 text-center font-bold text-label-md text-primary">SAT</div>

                <div className="bg-white h-32 p-2 opacity-30 bg-surface-container"></div>
                <div className="bg-white h-32 p-2 opacity-30 bg-surface-container"></div>
                <div className="bg-white h-32 p-2 relative group hover:bg-primary/5 transition-colors">
                  <span className="text-xs font-bold text-on-surface-variant">1</span>
                </div>
                <div className="bg-white h-32 p-2 relative group hover:bg-primary/5 transition-colors">
                  <span className="text-xs font-bold text-on-surface-variant">2</span>
                </div>
                <div className="bg-white h-32 p-2 relative group hover:bg-primary/5 transition-colors">
                  <span className="text-xs font-bold text-on-surface-variant">3</span>
                </div>
                <div className="bg-white h-32 p-2 relative group hover:bg-primary/5 transition-colors">
                  <span className="text-xs font-bold text-on-surface-variant">4</span>
                  <div className="mt-2 space-y-1">
                    <div className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded font-bold truncate">Confirmed (2)</div>
                  </div>
                </div>
                <div className="bg-white h-32 p-2 relative group hover:bg-primary/5 transition-colors">
                  <span className="text-xs font-bold text-on-surface-variant">5</span>
                </div>

                <div className="bg-white h-32 p-2 relative group hover:bg-primary/5 transition-colors">
                  <span className="text-xs font-bold text-on-surface-variant">6</span>
                </div>
                <div className="bg-white h-32 p-2 relative group hover:bg-primary/5 transition-colors">
                  <span className="text-xs font-bold text-on-surface-variant">7</span>
                </div>
                <div className="bg-white h-32 p-2 relative group hover:bg-primary/5 transition-colors">
                  <span className="text-xs font-bold text-on-surface-variant">8</span>
                </div>
                <div className="bg-white h-32 p-2 relative group hover:bg-primary/5 transition-colors">
                  <span className="text-xs font-bold text-on-surface-variant">9</span>
                </div>
                <div className="bg-white h-32 p-2 relative group hover:bg-primary/5 transition-colors border-2 border-secondary/50">
                  <span className="text-xs font-bold text-secondary">10 (Today)</span>
                  <div className="mt-2 space-y-1">
                    <div className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded font-bold truncate">Davis (09:00)</div>
                    <div className="bg-orange-100 text-orange-800 text-[10px] px-1.5 py-0.5 rounded font-bold truncate">Williams (11:00)</div>
                    <div className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold">+2 more</div>
                  </div>
                </div>
                <div className="bg-white h-32 p-2 relative group hover:bg-primary/5 transition-colors">
                  <span className="text-xs font-bold text-on-surface-variant">11</span>
                </div>
                <div className="bg-white h-32 p-2 relative group hover:bg-primary/5 transition-colors">
                  <span className="text-xs font-bold text-on-surface-variant">12</span>
                </div>

                <div className="bg-white h-32 p-2 flex flex-col justify-center items-center opacity-40 italic text-xs">...Rest of Month...</div>
                <div className="bg-white h-32 p-2"></div>
                <div className="bg-white h-32 p-2"></div>
                <div className="bg-white h-32 p-2"></div>
                <div className="bg-white h-32 p-2"></div>
                <div className="bg-white h-32 p-2"></div>
                <div className="bg-white h-32 p-2"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-md mt-lg">
            <div className="bg-white p-md rounded-xl custom-shadow border-l-4 border-secondary flex flex-col justify-between">
              <span className="text-on-surface-variant text-label-md font-bold uppercase">Today's Capacity</span>
              <div className="flex items-end justify-between mt-2">
                <span className="text-headline-md font-bold text-primary">85%</span>
                <span className="text-xs text-green-600 font-bold flex items-center"><span className="material-symbols-outlined text-sm">trending_up</span> +12%</span>
              </div>
              <div className="w-full bg-surface-container h-1.5 rounded-full mt-4">
                <div className="bg-secondary h-full rounded-full" style={{width: "85%"}}></div>
              </div>
            </div>
            <div className="bg-white p-md rounded-xl custom-shadow border-l-4 border-primary flex flex-col justify-between">
              <span className="text-on-surface-variant text-label-md font-bold uppercase">Pending Confirmations</span>
              <div className="flex items-end justify-between mt-2">
                <span className="text-headline-md font-bold text-primary">12</span>
                <span className="material-symbols-outlined text-primary-fixed-dim">pending_actions</span>
              </div>
              <p className="text-[10px] text-on-surface-variant mt-4 font-medium italic">Requires urgent attention</p>
            </div>
            <div className="bg-white p-md rounded-xl custom-shadow border-l-4 border-green-500 flex flex-col justify-between">
              <span className="text-on-surface-variant text-label-md font-bold uppercase">Avg. Session Time</span>
              <div className="flex items-end justify-between mt-2">
                <span className="text-headline-md font-bold text-primary">64 min</span>
                <span className="material-symbols-outlined text-green-300">timer</span>
              </div>
              <p className="text-[10px] text-on-surface-variant mt-4 font-medium italic">Optimal range 60-90m</p>
            </div>
            <div className="bg-primary p-md rounded-xl custom-shadow border-l-4 border-secondary-fixed flex flex-col justify-between text-white overflow-hidden relative">
              <div className="relative z-10">
                <span className="text-secondary-fixed text-label-md font-bold uppercase">System Health</span>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-headline-md font-bold">Stable</span>
                  <span className="material-symbols-outlined text-secondary-fixed">bolt</span>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <span className="material-symbols-outlined text-8xl">verified_user</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 border-2 border-secondary-fixed">
        <span className="material-symbols-outlined">add</span>
      </button>
    </>
  );
};

export default Bookings;
