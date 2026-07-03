import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    name: 'Executive Mesh Chair',
    category: 'Office Furniture',
    description: 'High-performance mesh task chair with adjustable lumbar support, 4D armrests, and synchro-tilt mechanism for maximum corporate comfort.'
  });

  const productsData = [
    {
      id: 1,
      name: 'Executive Mesh Chair',
      sku: 'OFF-4421',
      category: 'Office',
      status: 'Active',
      description: 'High-performance mesh task chair with adjustable lumbar support, 4D armrests, and synchro-tilt mechanism for maximum corporate comfort.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNUqF63J2P_u0tWMiYpSmBGFhyFhmeNigoAF7LsT_VW9uQsvol97n2Hh843IsnRTDwNfvsxgOVWFwog25iaXn8phKMSzJrhVWGY3b-DGEax961ButDexlyzVxn1At-5MNvOB-q24TTRxWeKXjTOSSLTQV12EhKZhD4Ycss792OYqwa20qlu1iKmyGzMt7fHW17bzxf9A2tIJWSSXm4lS7jbU5RYKp9gaPlPK05NqRzTSDCfq_G8XXv5cqvKDMox0pTC7nCjJFkGFs'
    },
    {
      id: 2,
      name: 'Premium Stationery Kit',
      sku: 'SCH-9022',
      category: 'School',
      status: 'Inactive',
      description: 'Complete high-grade student essentials set with customizable stationery designs.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB539qM9pRlg3jdopmxns3pNDMU32i-bW-edFGYUkT_7fzcn4wubEHvIuBRhvLQPxJg6iYvzShI_zjvv168AFm8TAEhXOBPdNA-eGG77MV_K_m7Tyl8LzHQcugGQEW6KIq5wxpHXJWt5gSiQIbqIk8bCXCY6tHgyaUBHph590woL1BzMwCbF2QkIks5MksbM_WNhPKmA8FnGuL3_NxNe6kpU2D4_Q-pKeK22keAsEeQv2BP4c9JlTQwIjQ3HsWkv4gyosDYIicg75M'
    },
    {
      id: 3,
      name: 'Artisanal Coffee Station',
      sku: 'HOM-1105',
      category: 'Home',
      status: 'Active',
      description: 'Luxury office and commercial kitchen espresso machine.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsQ7twd-PjeiXxqwTZNvivlZMyQUPirSdCOCxv5v5V67YBNsIKK5qn79eYN52UKqkwaktUnknoY1JsFkgdUdOZnQvXQ37llu6nXMMSeYCQ3JsCysqoTfr6L4fIR-Ykg_RfzZJw2li9H-V7hOhohv7zEvKEcVzgQ9LjCjCtqAwbjAA5mh6RSSndkME6RRS9PVedFjDx2uA9ukDtnV_rDcwB-AD6d5khCbChREJEwjXDf-Uqc-1oZwutqPEhzzWC_P2N0OWxj30Qmpk'
    }
  ];

  const handleEditProduct = (prod) => {
    setSelectedProduct({
      name: prod.name,
      category: prod.category === 'Office' ? 'Office Furniture' : prod.category === 'School' ? 'School Supplies' : 'Home Essentials',
      description: prod.description
    });
    setShowModal(true);
  };

  return (
    <>
      <AdminSidebar />

      <main className="flex-grow ml-64 min-h-screen flex flex-col">
        <header className="bg-surface sticky top-0 z-30 border-b border-secondary/30 shadow-sm flex justify-between items-center px-lg h-20 w-full">
          <div className="flex items-center gap-md">
            <h2 className="font-title-lg text-title-lg text-primary font-bold">Manage Catalog</h2>
            <div className="relative hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-full w-64 focus:ring-1 focus:ring-secondary focus:border-secondary outline-none transition-all" placeholder="Search catalog..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-all">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-all">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
              <div className="text-right hidden sm:block">
                <p className="text-body-md font-bold text-primary">Admin User</p>
                <p className="text-label-md text-on-surface-variant">Procurement Lead</p>
              </div>
              <img className="w-10 h-10 rounded-full object-cover ring-2 ring-secondary/20" data-alt="Professional headshot of a corporate procurement executive, clean studio lighting, wearing a navy blue blazer, set against a soft grey background with high-end editorial lighting and sharp focus." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiLULq8cV54MqaS1hIgz8m2TXOz0K0xJAD05Z0w-MwJ6wzmdxXpnfUukCGw8a5U9UssUOYyURL9OHpeZv598QF2BV6xPnVs_MKUgphZ5HAdCsUeeWiLh3Yp4Joe8KCISe7HoR0TcFom7dSCbW_X9si9LOyEf-JdEyTO0zD0F8Ao2HKwyRnl8N_e5QjrNsJJT2BruYZqrv68bge4PszN4tfCs6HuAcwLJ0pemWc6GyZrX2ZuCwjLDf9cSqWQSGWjpkIA33InBTGSF8"/>
            </div>
          </div>
        </header>

        <section className="p-lg flex-grow">
          <div className="flex justify-between items-center mb-lg">
            <div>
              <h3 className="font-headline-lg text-headline-lg text-primary">Catalog Management</h3>
              <p className="text-body-lg text-on-surface-variant">Oversee and update your corporate inventory</p>
            </div>
            <button 
              className="bg-primary text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 premium-shadow hover:bg-primary/90 transition-all active:scale-95 border-b-2 border-secondary-fixed" 
              onClick={() => {
                setSelectedProduct({ name: '', category: 'Office Furniture', description: '' });
                setShowModal(true);
              }}
            >
              <span className="material-symbols-outlined">add_circle</span>
              + Add New Product
            </button>
          </div>

          <div className="bg-white rounded-xl premium-shadow overflow-hidden border border-outline-variant/20">
            <div className="p-md bg-surface-container-low/50 border-b border-outline-variant/20 flex justify-between items-center">
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-label-md">All Products</button>
                <button className="px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-label-md transition-colors">School</button>
                <button className="px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-label-md transition-colors">Office</button>
                <button className="px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-label-md transition-colors">Home</button>
              </div>
              <button className="flex items-center gap-2 text-primary font-bold text-label-md hover:underline">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Advanced Filters
              </button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-lowest text-on-surface-variant font-label-md border-b border-outline-variant/20">
                <tr>
                  <th className="px-md py-4 font-semibold uppercase tracking-wider text-[10px]">Image</th>
                  <th className="px-md py-4 font-semibold uppercase tracking-wider text-[10px]">Product Name</th>
                  <th className="px-md py-4 font-semibold uppercase tracking-wider text-[10px]">Category</th>
                  <th className="px-md py-4 font-semibold uppercase tracking-wider text-[10px]">Status</th>
                  <th className="px-md py-4 font-semibold uppercase tracking-wider text-[10px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {productsData.map((prod) => (
                  <tr key={prod.id} className="hover:bg-primary/5 transition-colors group cursor-pointer" onClick={() => handleEditProduct(prod)}>
                    <td className="px-md py-4">
                      <div className="w-12 h-12 bg-surface-container rounded-lg overflow-hidden border border-outline-variant/20">
                        <img className="w-full h-full object-cover" data-alt={prod.name} src={prod.image}/>
                      </div>
                    </td>
                    <td className="px-md py-4">
                      <p className="text-body-md font-bold text-primary">{prod.name}</p>
                      <p className="text-label-md text-on-surface-variant/70">SKU: {prod.sku}</p>
                    </td>
                    <td className="px-md py-4">
                      <span className={`px-3 py-1 border rounded-full text-[10px] font-bold uppercase tracking-tight ${
                        prod.category === 'Office' 
                          ? 'bg-surface-container-high text-primary border-primary/10' 
                          : prod.category === 'School'
                            ? 'bg-secondary-container/30 text-secondary border-secondary/10'
                            : 'bg-tertiary-fixed text-tertiary border-tertiary/10'
                      }`}>{prod.category}</span>
                    </td>
                    <td className="px-md py-4">
                      <div className="flex items-center">
                        <div className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                          prod.status === 'Active' ? 'bg-secondary-fixed' : 'bg-outline-variant'
                        }`}>
                          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            prod.status === 'Active' ? 'translate-x-5' : 'translate-x-0'
                          }`}></span>
                        </div>
                        <span className="ml-3 text-label-md text-on-surface-variant">{prod.status}</span>
                      </div>
                    </td>
                    <td className="px-md py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-all" onClick={() => handleEditProduct(prod)}>
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className="p-2 text-error hover:bg-error hover:text-white rounded-lg transition-all" onClick={() => alert(`Deleting ${prod.name}...`)}>
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-md flex justify-between items-center text-label-md text-on-surface-variant">
              <p>Showing 1-3 of 248 products</p>
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-primary hover:text-white transition-all">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant bg-primary text-white">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-primary hover:text-white transition-all">3</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-primary/40 backdrop-blur-sm ${showModal ? '' : 'hidden'}`} id="editModal">
        <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border-t-4 border-secondary relative transform transition-all">
          <div className="p-md flex justify-between items-center border-b border-outline-variant/20">
            <h4 className="font-headline-md text-headline-md text-primary">Edit Product Details</h4>
            <button className="text-outline hover:text-primary transition-colors" onClick={() => setShowModal(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="p-md space-y-6 max-h-[716px] overflow-y-auto custom-scrollbar">
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant block uppercase">Product Image</label>
              <div className="border-2 border-dashed border-outline-variant/50 rounded-xl p-lg flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group">
                <span className="material-symbols-outlined text-4xl text-outline group-hover:text-primary mb-2 transition-colors">cloud_upload</span>
                <p className="text-body-md text-outline font-semibold">Click to upload or drag and drop</p>
                <p className="text-label-md text-outline/60">PNG, JPG up to 10MB</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant block uppercase">Product Name</label>
                <input 
                  className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg focus:border-secondary-fixed-dim focus:ring-1 focus:ring-secondary-fixed-dim outline-none transition-all" 
                  type="text" 
                  value={selectedProduct.name}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant block uppercase">Category</label>
                <select 
                  className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg focus:border-secondary-fixed-dim focus:ring-1 focus:ring-secondary-fixed-dim outline-none transition-all appearance-none cursor-pointer"
                  value={selectedProduct.category}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                >
                  <option>Office Furniture</option>
                  <option>School Supplies</option>
                  <option>Home Essentials</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant block uppercase">Description</label>
                <textarea 
                  className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg focus:border-secondary-fixed-dim focus:ring-1 focus:ring-secondary-fixed-dim outline-none transition-all" 
                  rows="4"
                  value={selectedProduct.description}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="p-md bg-surface-container-low/50 border-t border-outline-variant/20 flex justify-end gap-4 rounded-b-xl">
            <button className="px-6 py-2 text-primary font-bold hover:bg-white rounded-lg transition-all" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="px-8 py-2 bg-secondary-container text-on-secondary-container font-bold rounded-lg premium-shadow hover:bg-secondary-fixed transition-all active:scale-95 border-b-2 border-secondary" onClick={() => { setShowModal(false); alert('Saved product changes successfully!'); }}>Save Changes</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
