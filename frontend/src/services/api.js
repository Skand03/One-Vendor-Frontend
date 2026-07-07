import axios from 'axios';
import { supabase } from './supabaseClient';

// Helper to mimic Axios response shape
const wrapResponse = (data) => ({ data });

export const api = {
  get: async (url, config) => {
    // 1. /categories
    if (url === '/categories') {
      const { data, error } = await supabase.from('categories').select('*').order('id');
      if (error) throw error;
      return wrapResponse(data);
    }
    
    // 2. /services or /services?categoryId=X
    if (url === '/services' || url.startsWith('/services?')) {
      // Parse optional categoryId query param
      let categoryIdFilter = null;
      if (url.includes('categoryId=')) {
        const match = url.match(/categoryId=(\d+)/);
        if (match) categoryIdFilter = parseInt(match[1]);
      }

      let query = supabase.from('services').select('*').order('id');
      if (categoryIdFilter) {
        query = query.eq('category_id', categoryIdFilter);
      }

      const [svcRes, catRes] = await Promise.all([
        query,
        supabase.from('categories').select('id, name')
      ]);
      if (svcRes.error) throw svcRes.error;
      const catMap = {};
      (catRes.data || []).forEach(c => { catMap[c.id] = c.name; });
      const mapped = (svcRes.data || []).map(s => ({
        id: s.id,
        name: s.name,
        description: s.description,
        imageUrl: s.image_url,
        categoryId: s.category_id,
        categoryName: catMap[s.category_id] || '',
        basePrice: s.base_price,
        amcApplicable: s.amc_applicable
      }));
      return wrapResponse(mapped);
    }

    // 3. /services/:id
    if (url.startsWith('/services/')) {
      const id = url.split('/').pop();
      const [svcRes, catRes] = await Promise.all([
        supabase.from('services').select('*').eq('id', id).single(),
        supabase.from('categories').select('id, name')
      ]);
      if (svcRes.error) throw svcRes.error;
      const catMap = {};
      (catRes.data || []).forEach(c => { catMap[c.id] = c.name; });
      const s = svcRes.data;
      const mapped = {
        id: s.id,
        name: s.name,
        description: s.description,
        imageUrl: s.image_url,
        categoryId: s.category_id,
        categoryName: catMap[s.category_id] || '',
        basePrice: s.base_price,
        amcApplicable: s.amc_applicable
      };
      return wrapResponse(mapped);
    }

    // 4. /projects
    if (url === '/projects') {
      const { data, error } = await supabase.from('projects').select('*').order('id');
      if (error) throw error;
      const mapped = data.map(p => ({
        id: p.id,
        name: p.name,
        clientName: p.client_name,
        description: p.description,
        completionDate: p.completion_date,
        imageUrl: p.image_url,
        categoryId: p.category_id
      }));
      return wrapResponse(mapped);
    }

    // 5. /gallery
    if (url === '/gallery') {
      const { data, error } = await supabase.from('gallery').select('*').order('id');
      if (error) throw error;
      const mapped = data.map(g => ({
        id: g.id,
        title: g.title,
        imageUrl: g.image_url,
        categoryId: g.category_id
      }));
      return wrapResponse(mapped);
    }

    // 6. /settings
    if (url === '/settings') {
      const { data, error } = await supabase.from('website_settings').select('*').single();
      if (error) {
        // Return a mock default setting if not set yet in database
        return wrapResponse({
          companyName: 'One Vendor Solutions',
          email: 'onevendorsolutions@gmail.com',
          phone: '+91 85760 84127',
          address: '123 Corporate Blvd, Business District, Delhi, India',
          whatsappNumber: '918576084127',
          aboutText: 'Experience unified B2B procurement designed for excellence. We simplify your supply chain by providing premium quality essentials for educational institutions, corporate spaces, and residential complexes—all under one reliable roof.',
          logoUrl: '/logo.jpg'
        });
      }
      const mapped = {
        companyName: data.company_name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        whatsappNumber: data.whatsapp_number,
        aboutText: data.about_text,
        logoUrl: data.logo_url
      };
      return wrapResponse(mapped);
    }

    // 7. /testimonials
    if (url === '/testimonials') {
      const { data, error } = await supabase.from('testimonials').select('*').order('id');
      if (error) throw error;
      const mapped = data.map(t => ({
        id: t.id,
        name: t.name,
        position: t.position,
        company: t.company,
        content: t.content,
        rating: t.rating,
        imageUrl: t.image_url
      }));
      return wrapResponse(mapped);
    }

    throw new Error(`Endpoint GET ${url} not implemented`);
  },

  post: async (url, payload, config) => {
    // 1. /auth/login
    if (url === '/auth/login') {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', payload.username)
        .eq('password', payload.password)
        .single();
      if (error || !data) {
        throw { response: { status: 401, data: { message: 'Invalid admin credentials' } } };
      }
      return wrapResponse({
        token: 'supabase-admin-token-sim',
        id: data.id,
        username: data.username,
        email: data.email
      });
    }

    // 2. /bookings
    if (url === '/bookings') {
      const { data, error } = await supabase.from('bookings').insert({
        full_name: payload.fullName,
        phone: payload.phone,
        email: payload.email,
        address: payload.address,
        preferred_date: payload.preferredDate,
        time_slot: payload.timeSlot,
        message: payload.message,
        category_id: payload.categoryId,
        service_id: payload.serviceId
      }).select().single();
      if (error) throw error;
      return wrapResponse(data);
    }

    // 3. /contact
    if (url === '/contact') {
      // In frontend ContactUs, payload has name as fullName
      const { data, error } = await supabase.from('contact_messages').insert({
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        subject: payload.subject,
        message: payload.message
      }).select().single();
      if (error) throw error;
      return wrapResponse(data);
    }

    throw new Error(`Endpoint POST ${url} not implemented`);
  }
};

export const adminApi = {
  get: async (url, config) => {
    // 1. /bookings
    if (url === '/bookings') {
      // Fetch bookings and lookup tables in parallel (avoids join 400 errors if FK not set up in PostgREST)
      const [bookingsRes, categoriesRes, servicesRes] = await Promise.all([
        supabase.from('bookings').select('*').order('id', { ascending: false }),
        supabase.from('categories').select('id, name'),
        supabase.from('services').select('id, name')
      ]);
      if (bookingsRes.error) throw bookingsRes.error;

      const catMap = {};
      (categoriesRes.data || []).forEach(c => { catMap[c.id] = c.name; });
      const svcMap = {};
      (servicesRes.data || []).forEach(s => { svcMap[s.id] = s.name; });

      const mapped = (bookingsRes.data || []).map(b => ({
        id: b.id,
        fullName: b.full_name,
        phone: b.phone,
        email: b.email,
        address: b.address,
        preferredDate: b.preferred_date,
        timeSlot: b.time_slot,
        message: b.message,
        status: b.status,
        categoryId: b.category_id,
        categoryName: catMap[b.category_id] || 'Unknown',
        serviceId: b.service_id,
        serviceName: svcMap[b.service_id] || 'Unknown',
        createdAt: b.created_at
      }));
      return wrapResponse(mapped);
    }

    // 2. /contact-messages
    if (url === '/contact-messages') {
      const { data, error } = await supabase.from('contact_messages').select('*').order('id', { ascending: false });
      if (error) throw error;
      const mapped = data.map(m => ({
        id: m.id,
        fullName: m.full_name,
        email: m.email,
        phone: m.phone,
        subject: m.subject,
        message: m.message,
        status: m.status || 'UNREAD',
        createdAt: m.created_at
      }));
      return wrapResponse(mapped);
    }

    throw new Error(`Endpoint GET admin ${url} not implemented`);
  },

  post: async (url, payload, config) => {
    // 1. /services
    if (url === '/services') {
      const { data, error } = await supabase.from('services').insert({
        name: payload.name,
        description: payload.description,
        image_url: payload.imageUrl,
        category_id: payload.categoryId,
        base_price: payload.basePrice,
        amc_applicable: payload.amcApplicable || false
      }).select().single();
      if (error) throw error;
      return wrapResponse(data);
    }

    throw new Error(`Endpoint POST admin ${url} not implemented`);
  },

  put: async (url, payload, config) => {
    // 1. /settings
    if (url === '/settings') {
      // Upsert website settings row (id = 1)
      const { data, error } = await supabase.from('website_settings').upsert({
        id: 1,
        company_name: payload.companyName,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        whatsapp_number: payload.whatsappNumber,
        about_text: payload.aboutText,
        logo_url: payload.logoUrl
      }).select().single();
      if (error) throw error;
      return wrapResponse(data);
    }

    // 2. /services/:id
    if (url.startsWith('/services/')) {
      const id = url.split('/').pop();
      const { data, error } = await supabase.from('services').update({
        name: payload.name,
        description: payload.description,
        image_url: payload.imageUrl,
        category_id: payload.categoryId,
        base_price: payload.basePrice,
        amc_applicable: payload.amcApplicable || false
      }).eq('id', id).select().single();
      if (error) throw error;
      return wrapResponse(data);
    }

    // 3. /bookings/:id/status
    if (url.startsWith('/bookings/') && url.endsWith('/status')) {
      const id = url.split('/')[2];
      const { data, error } = await supabase.from('bookings').update({
        status: payload.status
      }).eq('id', id).select().single();
      if (error) throw error;
      return wrapResponse(data);
    }

    // 4. /contact-messages/:id/status
    if (url.startsWith('/contact-messages/') && url.endsWith('/status')) {
      const id = url.split('/')[2];
      const { data, error } = await supabase.from('contact_messages').update({
        status: payload.status
      }).eq('id', id).select().single();
      if (error) throw error;
      return wrapResponse(data);
    }

    throw new Error(`Endpoint PUT admin ${url} not implemented`);
  },

  delete: async (url, config) => {
    // 1. /services/:id
    if (url.startsWith('/services/')) {
      const id = url.split('/').pop();
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      return wrapResponse({ message: 'Deleted successfully' });
    }

    // 2. /bookings/:id
    if (url.startsWith('/bookings/')) {
      const id = url.split('/').pop();
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (error) throw error;
      return wrapResponse({ message: 'Deleted successfully' });
    }

    // 3. /contact-messages/:id
    if (url.startsWith('/contact-messages/')) {
      const id = url.split('/').pop();
      const { error } = await supabase.from('contact_messages').delete().eq('id', id);
      if (error) throw error;
      return wrapResponse({ message: 'Deleted successfully' });
    }

    throw new Error(`Endpoint DELETE admin ${url} not implemented`);
  }
};

export const uploadImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to 'images' bucket
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return { url: publicUrl };
  } catch (err) {
    console.error('Supabase storage upload failed:', err);
    if (err.statusCode === 403 || err.message.includes('403')) {
      throw new Error('Upload failed: Permission denied (403). Please ensure the "images" bucket exists in Supabase Storage and has a public INSERT policy.');
    }
    throw err;
  }
};

export default api;
