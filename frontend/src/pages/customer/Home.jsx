import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { setMetaTags } from '../../utils/seo';

const Home = () => {
  useEffect(() => {
    setMetaTags(
      'Home',
      'One Vendor Solutions is the leading B2B procurement partner for School, Office, and Home bulk essentials. We simplify supply chain management for schools and corporate offices.'
    );
    try {
      // Intersection Observer for Scroll Reveals
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Simple form validation micro-interaction
        const form = document.querySelector('form');
        if (form) {
          form.addEventListener('submit', (e) => {
              e.preventDefault();
              const btn = form.querySelector('button');
              btn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span> Sending...';
              setTimeout(() => {
                  btn.innerHTML = 'Enquiry Sent Successfully!';
                  btn.classList.replace('bg-gold-accent', 'bg-green-600');
                  btn.classList.add('text-white');
                  form.reset();
              }, 1500);
          });
        }
    } catch (err) {
      console.error("Error running stitch micro-interactions:", err);
    }
  }, []);
  return (
    <>
      

<Navbar transparent={true} />

<section className="h-screen w-full relative overflow-hidden flex items-center justify-center bg-black">
  {/* Background Video with Hardware Acceleration & Contrast Filters */}
  <video 
    autoPlay 
    loop 
    muted 
    playsInline 
    className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 pointer-events-none style-smooth-video"
    style={{
      transform: 'translate3d(0, 0, 0)',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      imageRendering: 'auto',
      willChange: 'transform',
      filter: 'contrast(1.08) brightness(1.02) saturate(1.02)'
    }}
  >
    <source src="/latest_video_latest.mp4" type="video/mp4" />
  </video>

  {/* Scroll Down Indicator */}
  <div 
    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer animate-bounce text-white/90 hover:text-white"
    onClick={() => {
      const exploreSec = document.getElementById('explore-categories');
      if (exploreSec) {
        exploreSec.scrollIntoView({ behavior: 'smooth' });
      }
    }}
  >
    <span className="text-[10px] uppercase tracking-widest font-bold font-label-md">Scroll Down</span>
    <span className="material-symbols-outlined text-2xl">keyboard_arrow_down</span>
  </div>
</section>

<section className="py-xl bg-surface" id="explore-categories">
<div className="max-w-container-max mx-auto px-gutter">
<div className="text-center mb-16 space-y-4">
<h2 className="font-headline-lg text-headline-lg text-primary">Explore Our Specialized Categories</h2>
<div className="w-24 h-1 bg-gold-accent mx-auto"></div>
<p className="text-on-surface-variant font-body-md max-w-2xl mx-auto">Tailored solutions for every environment, ensuring high-quality products delivered with corporate precision.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

<div className="group bg-white rounded-xl shadow-[0px_4px_20px_rgba(10,35,66,0.05)] border-t border-gold-accent/30 overflow-hidden transition-all hover:-translate-y-2">
<div className="h-56 relative overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A professional studio photograph of premium school uniforms and high-quality stationery kits organized neatly on a minimalist wooden table. Soft morning light enters from the side, emphasizing the textures of the fabric and the clean lines of the notebooks. The background is a blurred classroom setting in soft navy and cream tones, evoking a sophisticated educational atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS48L8GsJeSkMwEAsrfoqhWRz0BOFzOyQAGMWvRxDmcKwK2G85v09-yPWwcPjXtgbfqu5qVK3aO1LZ4S2VbzvPeMidV8jDzpQzblXAamM55_bkMds1za83nYuxgi0zXNXEcTneC0LBPWum36KcuzLyHmkT_dJBU37aYqypAVsYlWOCpaNiw5MWTUhDsqKQR49UtTi7SPonDywk5PPxPbG8Iluodxpijk8QaA-ml5t0a61-fQH5AFYAYEzzI62sdJZkKaGSOs9YRpI"/>
<div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
</div>
<div className="p-8 space-y-4">
<div className="flex items-center space-x-3 text-gold-accent">
<span className="material-symbols-outlined">school</span>
<h4 className="font-title-lg text-title-lg text-primary">School Essentials</h4>
</div>
<p className="text-on-surface-variant text-body-md">Uniforms, sports kits, high-grade stationery, and laboratory equipment curated for modern educational institutions.</p>
<Link to="/catalog" className="flex items-center space-x-2 text-gold-accent font-bold group-hover:translate-x-2 transition-transform">
<span>View Products</span>
<span className="material-symbols-outlined">arrow_forward</span>
</Link>
</div>
</div>

<div className="group bg-white rounded-xl shadow-[0px_4px_20px_rgba(10,35,66,0.05)] border-t border-gold-accent/30 overflow-hidden transition-all hover:-translate-y-2">
<div className="h-56 relative overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A high-end corporate setting showcasing luxury gifting items, branded notebooks, and modern IT hardware including a sleek laptop and ergonomic accessories. The lighting is crisp and professional, using cool white tones that reflect off polished glass surfaces. The color palette is dominated by deep navy and subtle gold accents, presenting a premium B2B corporate procurement aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2_iofRfzQj3tR2HUsJz4C-TAk5xOO8Hq5Gi1xoqAghzmNtWkdzHj9z0IWxH_wHX34ISgPu8rkS-9ACluUo5DyUA77CjAx2dDhmEifuNiHhMxGK77CetPPHpM2kerjaPDwyyVfpSa2_nseWEJ2ju3VGPX9qoXr0fH5yUTtDEy7ZBxyo1lLKIE7OXe1uTt_w1rg1my7U_-X1X0BAI1qUfo-zQKaejgpqCdQOYmFl2d3BfNiQwAk43LNxthXUn3m8-f7fWrMegeOf2g"/>
<div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
</div>
<div className="p-8 space-y-4">
<div className="flex items-center space-x-3 text-gold-accent">
<span className="material-symbols-outlined">corporate_fare</span>
<h4 className="font-title-lg text-title-lg text-primary">Office Requirements</h4>
</div>
<p className="text-on-surface-variant text-body-md">Corporate gifting, professional printing services, IT infrastructure support, and general pantry supplies for efficient workspaces.</p>
<Link to="/catalog" className="flex items-center space-x-2 text-gold-accent font-bold group-hover:translate-x-2 transition-transform">
<span>View Products</span>
<span className="material-symbols-outlined">arrow_forward</span>
</Link>
</div>
</div>

<div className="group bg-white rounded-xl shadow-[0px_4px_20px_rgba(10,35,66,0.05)] border-t border-gold-accent/30 overflow-hidden transition-all hover:-translate-y-2">
<div className="h-56 relative overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A minimalist and airy modern home interior featuring high-quality household utility products and daily essentials organized in a stylish pantry. The lighting is warm and natural, casting soft shadows through large windows. The overall look is clean, serene, and sophisticated, utilizing a palette of off-whites, light oaks, and navy textile accents for a premium home life feel." src="https://lh3.googleusercontent.com/aida-public/AB6AXuArlBWf6MEE55hLpe8vbkyZA1rKSslJHewXH1lqvAf_V8u_sy6d24zXQizpnd6C0bhGQvVg3sIeQoIKJ00qAHuLivj-eyjFngs5gUxSUGuglPsS44uw_MUKmFMLkqFcD8s9u09_rs8T-m_4jBCl6nGy_2aLdiETv_tvycW442jC2pKr7d2ZiP-56QCgTB_aRktLRMbqQkwT-Vy5Jsy9jtMtF7SqErB7Q9kTdrH8Vj6HnwNxmMmFQrwn845dcZThBlTKuPK0JZ7ImAI"/>
<div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
</div>
<div className="p-8 space-y-4">
<div className="flex items-center space-x-3 text-gold-accent">
<span className="material-symbols-outlined">home_repair_service</span>
<h4 className="font-title-lg text-title-lg text-primary">Home Essentials</h4>
</div>
<p className="text-on-surface-variant text-body-md">Daily utilities, maintenance supplies, and smart home essentials designed for comfort and modern residential longevity.</p>
<Link to="/catalog" className="flex items-center space-x-2 text-gold-accent font-bold group-hover:translate-x-2 transition-transform">
<span>View Products</span>
<span className="material-symbols-outlined">arrow_forward</span>
</Link>
</div>
</div>
</div>
</div>
</section>

<section className="py-xl bg-surface-container-low relative">
<div className="max-w-container-max mx-auto px-gutter">
<div className="flex flex-col lg:flex-row items-center gap-16">
<div className="lg:w-1/2 space-y-8">
<h2 className="font-headline-lg text-headline-lg text-primary leading-tight">Setting the Gold Standard in Procurement Services</h2>
<p className="text-on-surface-variant font-body-lg">We understand the complexities of bulk buying. Our platform is built to remove friction, reduce costs, and ensure quality across all your essential supplies.</p>
<div className="grid grid-cols-2 gap-6">
<div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-gold-accent">
<div className="w-12 h-12 bg-primary-container text-gold-accent rounded-full flex items-center justify-center mb-4">
<span className="material-symbols-outlined">inventory_2</span>
</div>
<h5 className="font-title-lg text-base text-primary mb-2">One Vendor</h5>
<p className="text-xs text-on-surface-variant">Consolidate your entire supply chain into one point of contact.</p>
</div>
<div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-gold-accent">
<div className="w-12 h-12 bg-primary-container text-gold-accent rounded-full flex items-center justify-center mb-4">
<span className="material-symbols-outlined">payments</span>
</div>
<h5 className="font-title-lg text-base text-primary mb-2">Bulk Pricing</h5>
<p className="text-xs text-on-surface-variant">Leverage our network for industry-leading wholesale discounts.</p>
</div>
<div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-gold-accent">
<div className="w-12 h-12 bg-primary-container text-gold-accent rounded-full flex items-center justify-center mb-4">
<span className="material-symbols-outlined">local_shipping</span>
</div>
<h5 className="font-title-lg text-base text-primary mb-2">Fast Delivery</h5>
<p className="text-xs text-on-surface-variant">Strategic logistics for predictable, timely fulfillment every time.</p>
</div>
<div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-gold-accent">
<div className="w-12 h-12 bg-primary-container text-gold-accent rounded-full flex items-center justify-center mb-4">
<span className="material-symbols-outlined">verified</span>
</div>
<h5 className="font-title-lg text-base text-primary mb-2">Trusted Choice</h5>
<p className="text-xs text-on-surface-variant">Preferred by top-tier schools and multinational corporations.</p>
</div>
</div>
</div>
<div className="lg:w-1/2 relative">
<div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
<img className="w-full h-[500px] object-cover" data-alt="A clean, wide-angle shot of a bright modern office logistics center with organized shelves and staff efficiently managing high-end product deliveries. The aesthetic is industrial yet very clean and high-tech, with a dominant navy and white color palette. A professional manager is seen looking over a digital tablet, symbolizing precision and transparency in procurement." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaYyw4_59Paignt3O7PULahEHf0bjXVVR0VEOM-oundg7AxaQA3FWLjec3E5O0jUmY4Obc6G5SLN3fuWZEOIAvESylB5wAYa3fo55WX5Cc89hGAsrZJXNgC8fF67ry3OwTD19dV5uLJf6kCg0p0XoztzpYSlqLwk2EawyxS9XkOaRyJz60468BN4skUnDbRZmtadRMQb0kkdbYlPDRLQKBTX-vm9zKWEVNnyoCmyAH3D1jYIuN-jQXpbHnG7bqhhWMS8eAe2gvdTk"/>
</div>
<div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold-accent/10 rounded-full blur-3xl"></div>
<div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
</div>
</div>
</div>
</section>

<Footer />


    </>
  );
};

export default Home;
