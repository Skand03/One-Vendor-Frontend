import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { setMetaTags } from '../../utils/seo';

const AboutUs = () => {
  useEffect(() => {
    setMetaTags(
      'About Us',
      'Learn about One Vendor Solutions, our founder Ujjwal Pandey, and how we are redefining B2B procurement and supply chains for modern corporate and education sectors.'
    );
    try {
      // Simple counter animation for stats
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stats = entry.target.querySelectorAll('.text-4xl');
                    stats.forEach(stat => {
                        const target = parseInt(stat.innerText);
                        let count = 0;
                        const duration = 2000;
                        const step = target / (duration / 16);
                        
                        const update = () => {
                            count += step;
                            if (count < target) {
                                stat.innerText = Math.floor(count) + (stat.innerText.includes('+') ? '+' : '');
                                requestAnimationFrame(update);
                            } else {
                                stat.innerText = target + (stat.innerText.includes('+') ? '+' : '');
                            }
                        };
                        update();
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.bg-primary-container').forEach(section => observer.observe(section));
    } catch (err) {
      console.error("Error running stitch micro-interactions:", err);
    }
  }, []);
  return (
    <>
      

<Navbar />
<main>

<section className="relative h-[614px] min-h-[500px] flex items-center overflow-hidden">
<div className="absolute inset-0 z-0">
<div className="w-full h-full bg-cover bg-center" data-alt="A wide-angle, high-end photograph of a modern corporate headquarters interior with floor-to-ceiling glass windows, minimalist white desks, and subtle gold architectural accents. The lighting is bright and airy, reflecting a professional light-mode aesthetic. The composition emphasizes clean lines and expansive space, conveying a sense of corporate authority and transparency. Deep navy blue tones are present in the structural elements, balanced by soft, warm sunlight." style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUg3a2FPCo7dKVPncMCtPA9_3UqIq3WbA_RywnCqM0cmjjMVHs_SyGH6CBeHvTsSYKy74FUz0rJ1GYrkcm1YnyKMCxmuB8oz7gOU3fo9za2wNSPGoLsC-yQiP1IDLw68dE46PDsIOHhcSA_WsegoFN8HcyRvLer6oInhCRkxVVteJfmUhLPMrEsRggf4bYWnlJv5ExkInNbHyqqqjAN8a4syhVt-8RXm2KDbRbgF__x54CCwvOLOTVS5zps_hrMoSlwk8cT-fYnu4')"}}></div>
<div className="absolute inset-0 hero-overlay"></div>
</div>
<div className="relative z-10 max-w-container-max mx-auto px-gutter w-full">
<div className="max-w-2xl">
<span className="text-secondary font-poppins font-bold tracking-widest uppercase text-sm mb-4 block">About Us</span>
<h1 className="font-poppins font-extrabold text-white text-5xl md:text-6xl leading-tight mb-6">
                        Our Story: Redefining <span className="text-secondary-fixed">B2B Procurement</span>
</h1>
<p className="text-white/80 font-body-lg text-lg max-w-lg mb-base">
                        Bridging the gap between complex industrial supply chains and modern corporate efficiency with a single, unified platform.
                    </p>
</div>
</div>
</section>

<section className="bg-primary-container py-lg">
<div className="max-w-container-max mx-auto px-gutter grid grid-cols-2 md:grid-cols-4 gap-md text-center">
<div className="space-y-2">
<div className="text-secondary-fixed font-poppins font-bold text-4xl">10+</div>
<div className="text-on-primary-container font-label-md uppercase tracking-wider">Years of Experience</div>
</div>
<div className="space-y-2">
<div className="text-secondary-fixed font-poppins font-bold text-4xl">5000+</div>
<div className="text-on-primary-container font-label-md uppercase tracking-wider">Clients Served</div>
</div>
<div className="space-y-2">
<div className="text-secondary-fixed font-poppins font-bold text-4xl">15+</div>
<div className="text-on-primary-container font-label-md uppercase tracking-wider">Categories Covered</div>
</div>
<div className="space-y-2">
<div className="text-secondary-fixed font-poppins font-bold text-4xl">50+</div>
<div className="text-on-primary-container font-label-md uppercase tracking-wider">Cities Covered</div>
</div>
</div>
</section>

<section className="py-xl bg-surface">
<div className="max-w-container-max mx-auto px-gutter">
<div className="grid md:grid-cols-2 gap-lg">

<div className="bg-surface-container-lowest p-xl rounded-xl navy-shadow border-t-2 border-secondary relative group overflow-hidden transition-all hover:-translate-y-1">
<div className="mb-md bg-surface-container-low w-16 h-16 rounded-full flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[32px]">rocket_launch</span>
</div>
<h3 className="font-poppins font-bold text-2xl text-primary mb-md">Our Mission</h3>
<p className="font-body-lg text-on-surface-variant leading-relaxed">
                            To provide seamless, high-quality procurement solutions for educational and corporate sectors, eliminating operational friction through technology-driven logistics.
                        </p>
<div className="absolute top-0 right-0 p-lg opacity-5 text-primary scale-[4]">
<span className="material-symbols-outlined text-[120px]">rocket_launch</span>
</div>
</div>

<div className="bg-surface-container-lowest p-xl rounded-xl navy-shadow border-t-2 border-secondary relative group overflow-hidden transition-all hover:-translate-y-1">
<div className="mb-md bg-surface-container-low w-16 h-16 rounded-full flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[32px]">visibility</span>
</div>
<h3 className="font-poppins font-bold text-2xl text-primary mb-md">Our Vision</h3>
<p className="font-body-lg text-on-surface-variant leading-relaxed">
                            To be the global leader in unified vendor management, setting the gold standard for trust, transparency, and transactional ease in the B2B marketplace.
                        </p>
<div className="absolute top-0 right-0 p-lg opacity-5 text-primary scale-[4]">
<span className="material-symbols-outlined text-[120px]">visibility</span>
</div>
</div>
</div>
</div>
</section>

<section className="py-xl bg-surface-container-lowest overflow-hidden">
<div className="max-w-container-max mx-auto px-gutter">
<div className="flex flex-col lg:flex-row items-center gap-xl">

<div className="w-full lg:w-1/2 relative">
<div className="aspect-square rounded-2xl overflow-hidden navy-shadow">
<img className="w-full h-full object-cover" data-alt="A professional, high-resolution portrait of Ujjwal Pandey, a visionary CEO, wearing a sharp navy blue business suit. He is standing in a brightly lit, modern executive office with architectural gold accents in the background. The lighting is soft and flattering, emphasizing a trustworthy and confident expression. The overall style is clean, premium, and corporate, reflecting a modern B2B leadership aesthetic with a minimalist color palette of whites and deep blues." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAa7w0l6C97FiVoRRXzjZqbiXYbz4Rkpt5hapUJLmXfxhswjxnS7WjGkzt8fG3b6ruq9KU5x3E4FA5s6IVg2IB9Qwh4xIhnDuf7MP5-k49tKrEdMMLOF6Qwf1-3-zzOjRn2KbBoP0KNYtrY0NWYZU8QNJ8Irmo1bvLPJFBQWku5wOvU3Uh285KfgWmK2UWVASbF1CkLKLHN30Dw20_efYbEAltrudL0v_PsUXvADWuWlCfT1xxz-m_Xo9kfEczbEJRtt87Pd_9hDA"/>
</div>
<div className="absolute -bottom-6 -right-6 bg-primary p-md rounded-xl text-on-primary navy-shadow hidden md:block">
<div className="font-poppins font-bold text-xl">Ujjwal Pandey</div>
<div className="text-secondary-fixed font-label-md">CEO &amp; Founder</div>
</div>
</div>

<div className="w-full lg:w-1/2 space-y-md">
<div className="text-secondary mb-base">
<span className="material-symbols-outlined text-[64px]" style={{fontVariationSettings: "'FILL' 1"}}>format_quote</span>
</div>
<blockquote className="italic font-poppins text-3xl md:text-4xl text-primary font-medium leading-tight">
                            "Our goal is to simplify complex supply chains through trust, quality, and a single-point solution for every corporate need."
                        </blockquote>
<div className="pt-md border-t border-outline-variant/30">
<h4 className="font-poppins font-bold text-xl text-primary">Ujjwal Pandey</h4>
<p className="text-on-surface-variant font-label-md">Leading One Vendor Solutions since inception</p>
<div className="mt-lg flex gap-md">
<div className="bg-surface-container p-sm rounded-lg flex items-center gap-2 text-primary font-label-md border border-outline-variant/20 hover:border-secondary transition-colors cursor-pointer">
<span className="material-symbols-outlined">description</span>
                                    Download Manifesto
                                </div>
<div className="bg-surface-container p-sm rounded-lg flex items-center gap-2 text-primary font-label-md border border-outline-variant/20 hover:border-secondary transition-colors cursor-pointer">
<span className="material-symbols-outlined">mail</span>
                                    Get in Touch
                                </div>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="py-xl bg-surface">
<div className="max-w-container-max mx-auto px-gutter">
<div className="text-center max-w-2xl mx-auto mb-xl">
<h2 className="font-poppins font-bold text-headline-lg text-primary mb-md">Our Core Values</h2>
<p className="text-on-surface-variant">The principles that guide every transaction and partnership at One Vendor Solutions.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-md">
<div className="p-md border border-outline-variant/30 rounded-xl hover:bg-surface-container-low transition-all group">
<span className="material-symbols-outlined text-secondary mb-base group-hover:scale-110 transition-transform">verified_user</span>
<h4 className="font-title-lg text-primary mb-xs">Unyielding Trust</h4>
<p className="text-body-md text-on-surface-variant">Building long-term relationships through transparency and consistent delivery.</p>
</div>
<div className="p-md border border-outline-variant/30 rounded-xl hover:bg-surface-container-low transition-all group">
<span className="material-symbols-outlined text-secondary mb-base group-hover:scale-110 transition-transform">diamond</span>
<h4 className="font-title-lg text-primary mb-xs">Premium Quality</h4>
<p className="text-body-md text-on-surface-variant">Selecting only the finest vendors that meet our rigorous corporate standards.</p>
</div>
<div className="p-md border border-outline-variant/30 rounded-xl hover:bg-surface-container-low transition-all group">
<span className="material-symbols-outlined text-secondary mb-base group-hover:scale-110 transition-transform">bolt</span>
<h4 className="font-title-lg text-primary mb-xs">Operational Velocity</h4>
<p className="text-body-md text-on-surface-variant">Streamlining logistics to ensure your business never misses a beat.</p>
</div>
</div>
</div>
</section>
</main>

<Footer />


    </>
  );
};

export default AboutUs;
