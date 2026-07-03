import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { setMetaTags } from '../../utils/seo';

const initialProducts = [
  {
    id: 1,
    name: 'Premium School Blazers',
    category: 'Uniforms',
    tag: 'Premium Tier',
    desc: 'Tailored from durable, high-GSM wool-blend fabric with reinforced stitching for longevity.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALZUVwHXovrdb2XW9-NLVvbY50s0jiHFpTzpL08S9Yoq_kZmMBTQZ2d5GVPJF0fASiai2yPoalcMAvCvOgbE_NlL-vhWAA_qMPEGW5vC5GRi2ihn28wFibDjeOkpNUVpaWTBnjc1R8Jb7AgHP7bwPtt4vUjjO9BrL_L2cMjyjucNthsAEoFSybmqImmU0-pu9TbTL37N5I-gIR0DsUxWGArI5k4X8DbcLp5L1P4B-bjZ60E8w-d1DgujwgeVPnzMK6Kj7SSmj9cKU'
  },
  {
    id: 2,
    name: 'Ergonomic Study Desks',
    category: 'Furniture',
    tag: 'In Stock',
    desc: 'Adjustable height desks designed to promote healthy posture in students of all ages.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwUnDAYsIKEjs8dVLmonati8pZxIJq-se-2U2tUVdtDSLtIt3v43j-dO8bPfBk0g7sI1khuRgVuXxQXa4LQ9u-RTs1Uw4ETn12uu2PJjqkRo90q0_QZpbj7_x-V5ELC9k4w-IR_PMRND19LJeIvwEtQ5V6FQkyqpYvVT238J7MNrkyYmtCb-pRMdqVVbRw3vi32973Dj271I-GnttQAj7BX_GOjwkTNSbyvAWNi10xOkMj_HJ_d2OMPdebRYxUSOVTItoq5rVbCEw'
  },
  {
    id: 3,
    name: 'Elite Stationery Kits',
    category: 'Stationery',
    tag: 'Best Seller',
    desc: 'Comprehensive school kits featuring high-grade paper and durable writing instruments.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgoKccdjLOIhjyo9IgiKN2DxdoIN_8kPc38uTciEMWPGZeBvch6oEPW-FZcUYFmhfQGR22-u2nQ7bDZWYZRmHeOjMs_LQ5C0xqdG3GDDLtOmAp23DXIf3tiUIMSba-YaSfV2exCocVp6xq9iPInLXb-iVG2KKIc2VRuLi0OoTIiiOIk3ljNUYMUAdOhcai0VJQzZBUfhiVj190zkU0v0pxtPrgCIh5mIEKbU4uLWW5xoxjE1Uy97w3bRb74ibjhsk7eaRga1gL4AQ'
  },
  {
    id: 4,
    name: 'Advanced Stem Library',
    category: 'Books',
    tag: 'Curated Collection',
    desc: 'Full curriculum textbook sets for K-12 STEM subjects with digital companion licenses.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnTw1Zt6U0JlyMp22qCDewbamz8l0Wg2niz0MWKf2_zRxtseRtIWWpm1R_ocBItF9EXvmHZXGNratBIwElMqvgauoOj2mwMNDyD9ojWuWAgMm46f8fAlOrzKyABp6XIPMzbKfBXSeEfLOsT-EQg13X76Ha9YwiuUZ7Ff-7Q5G42UdSK1u5Q5yxsqcBsIsXSqs85x7_klmb0PS9gBmXLywXDUs-mTtAOYTBz8UsdcGyOL7-7yh0fd1q-kadXhksG1Q6QtAlduo8Ef0'
  },
  {
    id: 5,
    name: 'Athletic Performance Gear',
    category: 'Sports Gear',
    tag: 'Durable Wear',
    desc: 'Moisture-wicking fabrics and high-durability sports kits for competitive school teams.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt_jNdyqSdwGIgXYX6uZQtCW6S69N7bDftbw22BUyodf0bLWhKAmaNKsO9kE26zbTiXkn6wabD_QvMc0BJ5zhEZZ2xJmteOwW4xYOpaaS1CW0yxkd-7anXpArlaazw6yudrrz5n5hyyfw7EUO0dhwg3-1wFwOw1IwwjAGuJz6j2xAkzyc7gSTTCeO-m1q-zUfqZdjxn6FJgZw9vnVydEuwx5-dSsS72z1O16scnOEkrIQ7Vi7UJMFFR3IYtxqV2nDb0rxahh4_sAM'
  },
  {
    id: 6,
    name: 'Classroom Storage Units',
    category: 'Furniture',
    tag: 'Modular Design',
    desc: 'Versatile, space-saving storage solutions with safety-lock mechanisms for schools.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbs54XdYI9x1oey1fYywldgOnA1a6qw5bhSF1y77e36Vc25hxx73ifrXxfQSXyIQmDMGZUS4g_VNlX2KUFqcfVAMLAY5awbihebt2gLkAk6kbdKJyACrjUM_ozz-ltZNADgJ4rQpbmeDn8SyHR6fIHYUi01T34h3vALtGJTuJZ2DGmVK06r6jiic2QIT0N4qvktc9232iYhzv9JZgxzJnXkaC2Zr7blSg-2SzLbIPJnog8n0Dg5hdUf7mb65vHsi5CkO3THBaXLLc'
  }
];

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoriesList = ['Uniforms', 'Books', 'Stationery', 'Furniture', 'Sports Gear'];

  useEffect(() => {
    setMetaTags(
      'Product Categories Catalog',
      'Browse our wholesale product catalog of School essentials, Office requirements, and Home bulk essentials. Find uniforms, books, stationery, desks, and more.'
    );
  }, []);

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredProducts = initialProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <main className="max-w-container-max mx-auto px-md lg:px-lg pt-32 pb-md">
        <div className="mb-lg">
          <nav className="flex items-center gap-xs text-on-surface-variant font-label-md mb-base">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <Link to="/catalog" className="hover:text-primary transition-colors">Catalog</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-primary font-semibold">School Essentials</span>
          </nav>
          <h1 className="text-display-lg font-display-lg text-primary-container">School Essentials</h1>
          <p className="text-body-lg text-on-surface-variant mt-xs max-w-2xl">
            Premium bulk supplies for educational institutions. Source high-quality uniforms, stationery, and furniture with expert procurement support.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-lg">
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/20 sticky top-32">
              <div className="mb-md">
                <h3 className="font-headline-md text-[18px] text-primary-container mb-xs">Catalog Filters</h3>
                <p className="text-label-md text-on-surface-variant mb-md">Browse by category</p>
                <div className="relative mb-md">
                  <input 
                    className="w-full bg-white border border-outline-variant/50 rounded-lg pl-10 pr-4 py-2 text-body-md focus:border-secondary-fixed-dim focus:ring-1 focus:ring-secondary-fixed-dim outline-none" 
                    placeholder="Search Products" 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]">search</span>
                </div>
              </div>

              <div className="space-y-md">
                <div>
                  <h4 className="font-label-md text-primary mb-sm uppercase tracking-wider">Sub-categories</h4>
                  <div className="space-y-sm">
                    {categoriesList.map(category => {
                      const isChecked = selectedCategories.includes(category);
                      return (
                        <label key={category} className="flex items-center gap-sm group cursor-pointer sidebar-item transition-transform">
                          <input 
                            className="rounded text-primary focus:ring-primary w-5 h-5 border-outline-variant" 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCategoryToggle(category)}
                          />
                          <span className={`text-body-md transition-colors ${isChecked ? 'text-primary font-semibold' : 'text-on-surface group-hover:text-primary'}`}>
                            {category}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="pt-md border-t border-outline-variant/30">
                  <Link to="/enquiry" className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-lg font-label-md hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-sm shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">request_quote</span>
                    Bulk Enquiry
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          <section className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
              {filteredProducts.map(product => (
                <div key={product.id} className="premium-card bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(10,35,66,0.05)] flex flex-col h-full border border-outline-variant/20 hover:border-secondary transition-all duration-300">
                  <div className="h-56 bg-surface-container-high relative group">
                    <img className="w-full h-full object-cover" src={product.image} alt={product.name}/>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-md flex flex-col flex-grow">
                    <div className="flex items-center gap-xs mb-xs">
                      <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{product.tag}</span>
                    </div>
                    <h3 className="text-title-lg font-title-lg text-primary-container mb-xs">{product.name}</h3>
                    <p className="text-body-md text-on-surface-variant mb-md flex-grow leading-relaxed">{product.desc}</p>
                    <Link to="/enquiry" className="w-full py-3 bg-white border-2 border-secondary-fixed-dim text-secondary font-bold rounded-lg hover:bg-secondary-fixed-dim/10 transition-all flex items-center justify-center gap-xs">
                      Enquiry for Bulk Price
                    </Link>
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="col-span-full py-xl text-center space-y-md">
                  <span className="material-symbols-outlined text-6xl text-outline-variant">search_off</span>
                  <h3 className="font-headline-md text-primary">No Products Found</h3>
                  <p className="text-body-md text-on-surface-variant max-w-sm mx-auto">
                    No items match your search "{searchQuery}" or selected category filters. Try resetting the filters.
                  </p>
                </div>
              )}
            </div>

            {filteredProducts.length > 0 && (
              <div className="mt-xl flex flex-col items-center gap-md">
                <div className="flex items-center gap-sm">
                  <span className="text-body-md text-on-surface-variant">Showing {filteredProducts.length} of {initialProducts.length} products</span>
                  <div className="h-1 w-48 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-secondary-fixed-dim" style={{ width: `${(filteredProducts.length / initialProducts.length) * 100}%` }}></div>
                  </div>
                </div>
                <button className="bg-primary text-white px-lg py-3 rounded-full font-label-md hover:bg-primary-container transition-all flex items-center gap-sm shadow-lg active:scale-95 group">
                  Load More Products
                  <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">keyboard_arrow_down</span>
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Catalog;
