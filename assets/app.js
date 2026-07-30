const STORAGE_KEY = 'nepembeCleaningSiteData';
const DEFAULT_DATA = {
  _version: 10,
  logo: 'assets/nepembe-logo.png',
  users: [{ username: 'admin', password: 'nepembe2026', role: 'Admin' }],
  companyName: 'Nepembe Cleaning Service',
  heroTitle: 'Reliable cleaning services for homes, offices and businesses.',
  heroSubtitle: 'We are the kings of the cleaning world — trusted, detail-focused cleaning across Walvis Bay.',
  heroEyebrow: 'Desert-fresh cleaning in Walvis Bay',
  servicesEyebrow: 'What we do',
  servicesTitle: 'Cleaning services built around your space',
  servicesText: 'Choose a once-off deep clean, recurring office cleaning, or specialist cleaning support after moving, building, or events.',
  featuresEyebrow: 'Cleaning features',
  featuresTitle: 'The kings of the cleaning world',
  featuresText: 'Professional cleaning features that make every service easier to trust, easier to book and easier to update online.',
  aboutEyebrow: 'About Nepembe',
  aboutTitle: 'Local, dependable and detail-driven.',
  processEyebrow: 'Simple booking flow',
  processTitle: 'From dusty to desert-fresh in three smooth steps',
  processText: 'A polished experience from the first message to the final quality check.',
  transformEyebrow: 'Live cleaning feel',
  transformTitle: 'See the transformation before customers even call.',
  transformText: 'The landing page feels alive with image slides, elegant hover movements, animated counters and smooth scroll progress that guide visitors towards requesting a quote.',
  galleryEyebrow: 'Recent work',
  galleryTitle: 'Gallery',
  galleryText: 'Filter projects by category and click any image to preview the work.',
  quoteEyebrow: 'Request a quote',
  quoteTitle: 'Tell us what needs cleaning.',
  quoteText: 'Submit your details and Nepembe Cleaning Service will receive your request by email. You can also continue by WhatsApp for a faster response.',
  testimonialsEyebrow: 'Client confidence',
  testimonialsTitle: 'Why customers choose Nepembe',
  contactEyebrow: 'Contact',
  contactTitle: 'Ready for a cleaner space?',
  contactText: 'Reach out for residential, office, commercial, deep cleaning, sofa cleaning, upholstery cleaning, carpet, window, move-in/move-out and post-construction cleaning.',
  aboutText: 'Nepembe Cleaning Service helps households and businesses in Walvis Bay maintain clean, healthy and welcoming spaces. We focus on punctual service, professional communication and visible results.',
  phone: '081 227 3021 / 085 227 3021',
  whatsapp: '+264812273021',
  email: 'nepembejasen@gmail.com',
  address: 'Walvis Bay, Namibia',
  mapLocation: 'Walvis Bay, Namibia',
  googleMapsUrl: '',
  businessHours: 'Mon - Sat: 08:00 - 18:00',
  social: { facebook: '#', instagram: '#', tiktok: '#' },
  heroSlides: [
    { title: 'Professional home cleaning', image: 'assets/hero-desert-cleaning.png' },
    { title: 'Office & commercial cleaning', image: 'assets/hero-desert-office.png' },
    { title: 'Sofa & upholstery care', image: 'assets/hero-desert-sofa.png' }
  ],
  stats: [
    { icon: '⚡', value: '24h', count: 24, label: 'fast response goal' },
    { icon: '🛋️', value: '11+', count: 11, label: 'cleaning services' },
    { icon: '📍', value: 'Walvis Bay', count: 0, label: 'local mobile team' },
    { icon: '✨', value: 'Fresh', count: 0, label: 'desert-clean finish' }
  ],
  features: [
    { title: 'Sofa & upholstery care', text: 'Refresh couches, office chairs, cushions and fabric furniture with dedicated upholstery cleaning.', image: 'assets/sofa-cleaning.png' },
    { title: 'Deep cleaning details', text: 'Bathrooms, kitchens, corners, surfaces and high-touch areas cleaned with attention to detail.', image: 'assets/deep-cleaning.png' },
    { title: 'Clear finishing touches', text: 'Windows, glass and presentation-focused cleaning that leaves spaces looking brighter.', image: 'assets/window-cleaning.png' }
  ],
  processSteps: [
    { title: 'Choose a service', text: 'Select home, office, sofa, upholstery, windows, deep cleaning or any custom cleaning need.' },
    { title: 'Send a quick quote request', text: 'Use WhatsApp or email. The form prepares all your details so the team can respond faster.' },
    { title: 'Enjoy the clean finish', text: 'Nepembe arrives prepared, cleans with detail and leaves your space fresh and presentable.' }
  ],
  services: [
    { title: 'Residential Cleaning', description: 'Regular and once-off home cleaning to keep every room fresh, neat and comfortable.', image: 'assets/cleaning-home.png' },
    { title: 'Office Cleaning', description: 'Professional office cleaning for productive, hygienic workspaces and happy teams.', image: 'assets/cleaning-office.png' },
    { title: 'Commercial Cleaning', description: 'Reliable cleaning for shops, guesthouses, facilities and small business premises.', image: 'assets/cleaning-office.png' },
    { title: 'Deep Cleaning', description: 'Detailed top-to-bottom cleaning for kitchens, bathrooms, floors and hard-to-reach areas.', image: 'assets/deep-cleaning.png' },
    { title: 'Sofa Cleaning', description: 'Professional sofa cleaning to remove dust, stains, odours and refresh your lounge furniture.', image: 'assets/sofa-cleaning.png' },
    { title: 'Upholstery Cleaning', description: 'Fabric chair, couch, cushion and upholstery cleaning for homes, offices and guest spaces.', image: 'assets/sofa-cleaning.png' },
    { title: 'Move-In / Move-Out Cleaning', description: 'Prepare a property before moving in or hand it over spotless after moving out.', image: 'assets/cleaning-home.png' },
    { title: 'Post-Construction Cleaning', description: 'Dust, debris and finishing cleanups after renovation or building projects.', image: 'assets/deep-cleaning.png' },
    { title: 'Carpet Cleaning', description: 'Refresh carpets and fabric surfaces with careful deep cleaning support.', image: 'assets/sofa-cleaning.png' },
    { title: 'Window Cleaning', description: 'Cleaner glass, brighter rooms and better presentation for homes and businesses.', image: 'assets/window-cleaning.png' },
    { title: 'Event Cleaning', description: 'Before and after event cleaning for private functions, community events and business gatherings.', image: 'assets/deep-cleaning.png' }
  ],
  gallery: [
    { title: 'Office deep clean', category: 'Office Cleaning', url: 'assets/cleaning-office.png', color: 'linear-gradient(135deg,#dffaf4,#1769aa)' },
    { title: 'Residential home cleaning', category: 'Residential Cleaning', url: 'assets/cleaning-home.png', color: 'linear-gradient(135deg,#f8fdff,#22b8b0)' },
    { title: 'Sofa cleaning result', category: 'Sofa Cleaning', url: 'assets/sofa-cleaning.png', color: 'linear-gradient(135deg,#fff,#8ed8ff)' },
    { title: 'Upholstery cleaning', category: 'Upholstery Cleaning', url: 'assets/sofa-cleaning.png', color: 'linear-gradient(135deg,#fff,#8ed8ff)' },
    { title: 'Deep cleaning project', category: 'Deep Cleaning', url: 'assets/deep-cleaning.png', color: 'linear-gradient(135deg,#eaf5ff,#0b2545)' },
    { title: 'Window cleaning', category: 'Window Cleaning', url: 'assets/window-cleaning.png', color: 'linear-gradient(135deg,#c9f8f0,#f7fbff)' }
  ],
  testimonials: [
    { name: 'Walvis Bay Client', text: 'Professional, friendly and the place looked fresh afterwards. Highly recommended.' },
    { name: 'Office Manager', text: 'They communicate well and pay attention to the small details that matter.' },
    { name: 'Homeowner', text: 'Easy booking process and reliable cleaning service. I would use them again.' }
  ]
};

function getData(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
    if(!saved || saved._version !== DEFAULT_DATA._version){
      saveData(DEFAULT_DATA);
      return DEFAULT_DATA;
    }
    return { ...DEFAULT_DATA, ...saved };
  }
  catch { return DEFAULT_DATA; }
}
function saveData(data){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

function googleMapsEmbedSrc(data){
  const embed = (data.googleMapsUrl || '').trim();
  if(embed && embed.includes('google.com/maps/embed')) return embed;
  const query = (data.mapLocation || data.address || 'Walvis Bay, Namibia').trim();
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
function googleMapsOpenUrl(data){
  const query = (data.mapLocation || data.address || 'Walvis Bay, Namibia').trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
function updateGoogleMap(data){
  const iframe = document.getElementById('googleMapFrame');
  if(iframe) iframe.src = googleMapsEmbedSrc(data);
  const open = document.getElementById('openGoogleMaps');
  if(open) open.href = googleMapsOpenUrl(data);
}

function whatsappLink(number, message='Hello Nepembe Cleaning Service, I would like to request a cleaning quote.'){
  const clean = (number || '').replace(/[^0-9]/g,'');
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
function initShared(){
  const data = getData();
  document.querySelectorAll('.brand-logo, .admin-login-logo').forEach(img => { if(data.logo) img.src = data.logo; });
  const favicon = document.querySelector('link[rel="icon"]'); if(favicon && data.logo) favicon.href = data.logo;
  document.querySelectorAll('[data-bind]').forEach(el => {
    const key = el.dataset.bind; if(data[key]) el.textContent = data[key];
  });
  document.querySelectorAll('[data-email]').forEach(el => { el.href = `mailto:${data.email}`; if(el.classList.contains('quick-item')) el.textContent = 'Email inquiry'; else if(el.classList.contains('btn')) el.textContent = 'Email Us'; else el.textContent = data.email; });
  document.querySelectorAll('[data-phone]').forEach(el => { el.href = `tel:${(data.phone.split('/')[0] || data.phone).replace(/[^0-9+]/g,'')}`; el.textContent = data.phone; });
  document.querySelectorAll('[data-whatsapp]').forEach(el => { el.href = whatsappLink(data.whatsapp); });
  document.querySelectorAll('[data-social]').forEach(el => { el.href = data.social?.[el.dataset.social] || '#'; });
  updateGoogleMap(data);
  const year = document.getElementById('year'); if(year) year.textContent = new Date().getFullYear();
}
function initMenu(){
  const toggle = document.querySelector('.menu-toggle'), menu = document.querySelector('.main-menu');
  if(!toggle || !menu) return;
  toggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}
function initReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold:.12 });
  items.forEach(item => observer.observe(item));
}

function renderLandingContent(){
  const data = getData();
  const hero = document.getElementById('heroCarousel');
  if(hero){
    hero.innerHTML = (data.heroSlides || []).map((slide,i)=>`<figure class="hero-slide ${i===0?'active':''}"><img src="${escapeAttr(slide.image)}" alt="${escapeAttr(slide.title || 'Nepembe cleaning service')}"><figcaption>${escapeHtml(slide.title || 'Cleaning service')}</figcaption></figure>`).join('');
  }
  const stats = document.getElementById('liveStatsGrid');
  if(stats){
    stats.innerHTML = (data.stats || []).map(st=>`<article class="live-stat reveal magnetic-card"><span class="stat-icon">${escapeHtml(st.icon || '✨')}</span><strong>${st.count ? `<span data-count="${escapeAttr(st.count)}">0</span>${escapeHtml(String(st.value || '').replace(String(st.count),''))}` : escapeHtml(st.value || '')}</strong><p>${escapeHtml(st.label || '')}</p></article>`).join('');
  }
  const features = document.getElementById('featuresGrid');
  if(features){
    features.innerHTML = (data.features || []).map((f,i)=>`<article class="feature-card reveal ${i===1?'delay-1':''} magnetic-card"><img src="${escapeAttr(f.image || 'assets/deep-cleaning.png')}" alt="${escapeAttr(f.title || 'Cleaning feature')}"><h3>${escapeHtml(f.title || '')}</h3><p>${escapeHtml(f.text || '')}</p></article>`).join('');
  }
  const process = document.getElementById('processGrid');
  if(process){
    process.innerHTML = (data.processSteps || []).map((step,i)=>`<article class="process-card reveal magnetic-card"><span>${String(i+1).padStart(2,'0')}</span><h3>${escapeHtml(step.title || '')}</h3><p>${escapeHtml(step.text || '')}</p></article>`).join('');
  }
}

function renderServices(){
  const wrap = document.getElementById('serviceCards'), select = document.getElementById('serviceSelect');
  if(!wrap && !select) return;
  const icons = ['🏠','🏢','🧼','✨','📦','🏗️','🛋️','🪟','🎉'];
  const data = getData();
  if(wrap) {
    wrap.innerHTML = data.services.map((s,i)=>`<article class="service-card reveal">${s.image ? `<img class="service-img" src="${escapeAttr(s.image)}" alt="${escapeAttr(s.title)}">` : `<div class="service-img service-fallback"></div>`}<div class="service-body"><div class="icon-badge">${icons[i%icons.length]}</div><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.description)}</p><div class="service-actions"><a class="text-link" href="#quote">Request this service →</a><button class="gallery-link" type="button" data-service-gallery="${escapeAttr(s.title)}">View service gallery</button></div></div></article>`).join('');
    wrap.querySelectorAll('[data-service-gallery]').forEach(btn => btn.addEventListener('click', () => showServiceGallery(btn.dataset.serviceGallery)));
  }
  if(select) select.innerHTML = data.services.map(s=>`<option>${escapeHtml(s.title)}</option>`).join('');
  initReveal();
}

let activeGalleryItems = [];
let activeLightboxIndex = 0;
let galleryVisibleCount = 12;
const GALLERY_PAGE_SIZE = 12;
function renderGallery(active='All', reset=true){
  const grid = document.getElementById('galleryGrid'), filters = document.getElementById('galleryFilters'); if(!grid || !filters) return;
  const data = getData();
  if(reset) galleryVisibleCount = GALLERY_PAGE_SIZE;
  const serviceNames = data.services.map(s => s.title);
  const otherCats = data.gallery.map(g=>g.category || 'General').filter(c => !serviceNames.includes(c));
  const cats = ['All', ...new Set([...serviceNames, ...otherCats])];
  filters.innerHTML = cats.map(c=>`<button class="${c===active?'active':''}" data-filter="${escapeAttr(c)}">${escapeHtml(c)}</button>`).join('');
  const items = active==='All' ? data.gallery : data.gallery.filter(g=>g.category===active);
  activeGalleryItems = items;
  const visible = items.slice(0, galleryVisibleCount);
  const galleryHtml = visible.length ? visible.map((g,i)=>`<article class="gallery-item reveal" data-gallery-index="${i}" data-img="${escapeAttr(g.url || '')}" data-color="${escapeAttr(g.color || 'linear-gradient(135deg,#dffaf4,#1769aa)')}">${g.url ? `<img src="${escapeAttr(g.url)}" alt="${escapeAttr(g.title)}" loading="lazy">` : `<div class="fallback-art" style="--art:${escapeAttr(g.color || 'linear-gradient(135deg,#dffaf4,#1769aa)')}"></div>`}<div class="gallery-caption"><strong>${escapeHtml(g.title)}</strong><span>${escapeHtml(g.category)}</span></div></article>`).join('') : `<div class="empty-gallery"><h3>No pictures uploaded yet for ${escapeHtml(active)}.</h3><p>Please check again soon or request examples by WhatsApp.</p><a class="btn btn-primary" data-whatsapp href="${whatsappLink(data.whatsapp, `Hello Nepembe Cleaning Service, please send me pictures for ${active}.`)}" target="_blank">Ask on WhatsApp</a></div>`;
  const loadMore = items.length > galleryVisibleCount ? `<div class="gallery-load-more"><p>Showing ${galleryVisibleCount} of ${items.length} pictures in ${escapeHtml(active)} gallery.</p><button class="btn btn-primary" type="button" id="loadMoreGallery">Load More Pictures</button><button class="btn btn-secondary" type="button" id="showAllGallery">Show All Pictures</button></div>` : (items.length ? `<div class="gallery-load-more"><p>Showing all ${items.length} picture${items.length===1?'':'s'} in ${escapeHtml(active)} gallery.</p></div>` : '');
  grid.innerHTML = galleryHtml + loadMore;
  filters.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>renderGallery(b.dataset.filter, true)));
  grid.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>openLightbox(Number(item.dataset.galleryIndex || 0))));
  document.getElementById('loadMoreGallery')?.addEventListener('click',()=>{ galleryVisibleCount += GALLERY_PAGE_SIZE; renderGallery(active, false); });
  document.getElementById('showAllGallery')?.addEventListener('click',()=>{ galleryVisibleCount = items.length; renderGallery(active, false); });
  initReveal();
}
function showServiceGallery(serviceName){
  renderGallery(serviceName);
  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function openLightbox(index=0){
  const lb = document.getElementById('lightbox'); if(!lb) return;
  activeLightboxIndex = Math.max(0, Math.min(index, activeGalleryItems.length - 1));
  updateLightbox();
  lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
}
function updateLightbox(){
  const lb = document.getElementById('lightbox'); if(!lb) return;
  const img = lb.querySelector('img');
  const caption = document.getElementById('lightboxCaption');
  const counter = document.getElementById('lightboxCounter');
  const item = activeGalleryItems[activeLightboxIndex]; if(!item) return;
  if(item.url){ img.src = item.url; img.style.background='transparent'; img.style.width='auto'; img.style.height='auto'; }
  else { img.removeAttribute('src'); img.style.background = item.color || 'linear-gradient(135deg,#dffaf4,#1769aa)'; img.style.width='850px'; img.style.height='520px'; }
  if(caption) caption.textContent = `${item.title || 'Gallery image'} · ${item.category || 'Gallery'}`;
  if(counter) counter.textContent = `${activeLightboxIndex + 1} / ${activeGalleryItems.length}`;
}
function moveLightbox(step){
  if(!activeGalleryItems.length) return;
  activeLightboxIndex = (activeLightboxIndex + step + activeGalleryItems.length) % activeGalleryItems.length;
  updateLightbox();
}
function initLightbox(){
  const lb = document.getElementById('lightbox'); if(!lb) return;
  lb.querySelector('.lightbox-close')?.addEventListener('click',()=>{ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); });
  document.getElementById('lightboxPrev')?.addEventListener('click', e=>{ e.stopPropagation(); moveLightbox(-1); });
  document.getElementById('lightboxNext')?.addEventListener('click', e=>{ e.stopPropagation(); moveLightbox(1); });
  lb.addEventListener('click', e => { if(e.target===lb){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); }});
  document.addEventListener('keydown', e => {
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') { lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); }
    if(e.key === 'ArrowLeft') moveLightbox(-1);
    if(e.key === 'ArrowRight') moveLightbox(1);
  });
}
function renderTestimonials(){
  const wrap = document.getElementById('testimonialGrid'); if(!wrap) return;
  const data = getData();
  wrap.innerHTML = data.testimonials.map(t=>`<article class="testimonial reveal"><div class="stars">★★★★★</div><p>“${escapeHtml(t.text)}”</p><strong>${escapeHtml(t.name)}</strong></article>`).join('');
  initReveal();
}

function initHeroCarousel(){
  const slides = [...document.querySelectorAll('.hero-slide')];
  const dotsWrap = document.getElementById('heroDots');
  if(!slides.length || !dotsWrap) return;
  let active = 0;
  dotsWrap.innerHTML = slides.map((_,i)=>`<button aria-label="Show hero image ${i+1}" class="${i===0?'active':''}"></button>`).join('');
  const dots = [...dotsWrap.querySelectorAll('button')];
  const show = (index) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide,i)=>slide.classList.toggle('active', i===active));
    dots.forEach((dot,i)=>dot.classList.toggle('active', i===active));
  };
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
  setInterval(()=>show(active + 1), 6500);
}

function initQuoteForm(){
  const form = document.getElementById('quoteForm'), status = document.getElementById('formStatus'), waBtn = document.getElementById('quoteWhatsapp'); if(!form) return;
  const buildMessage = () => {
    const fd = new FormData(form);
    return 'Hello Nepembe Cleaning Service, I would like to request a cleaning quote.\n\n' + [...fd.entries()].map(([k,v])=>`${k}: ${v || '-'}`).join('\n');
  };
  form.addEventListener('submit', e => {
    e.preventDefault(); const data = getData();
    const subject = encodeURIComponent('Cleaning quote request - Nepembe Website');
    const body = encodeURIComponent(buildMessage());
    status.innerHTML = `Opening email app for ${data.email}. If it does not open, use the WhatsApp button below.`;
    window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;
  });
  waBtn?.addEventListener('click', () => {
    const data = getData();
    window.open(whatsappLink(data.whatsapp, buildMessage()), '_blank');
  });
}
function escapeHtml(str=''){ return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }
function escapeAttr(str=''){ return escapeHtml(str).replace(/`/g,'&#096;'); }

function initAdmin(){
  const login = document.getElementById('loginPanel'), dash = document.getElementById('dashboard'); if(!login || !dash) return;
  const isLogged = sessionStorage.getItem('nepembeAdmin') === 'yes'; if(isLogged){ login.classList.add('hidden'); dash.classList.remove('hidden'); populateAdmin(); }
  document.getElementById('loginForm').addEventListener('submit', e => { e.preventDefault(); if(document.getElementById('password').value === 'nepembe2026'){ sessionStorage.setItem('nepembeAdmin','yes'); login.classList.add('hidden'); dash.classList.remove('hidden'); populateAdmin(); } else alert('Wrong password for demo dashboard.'); });
  document.getElementById('logout')?.addEventListener('click',()=>{ sessionStorage.removeItem('nepembeAdmin'); location.reload(); });
  document.querySelectorAll('.tab-btn').forEach(btn=>btn.addEventListener('click',()=>switchTab(btn.dataset.tab)));
  document.getElementById('resetData')?.addEventListener('click',()=>{ if(confirm('Reset all demo content?')){ localStorage.removeItem(STORAGE_KEY); populateAdmin(); }});
}
function switchTab(tab){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab));
  document.querySelectorAll('.admin-panel').forEach(p=>p.classList.toggle('hidden', p.dataset.panel!==tab));
}
function populateAdmin(){
  const data = getData();
  const cf = document.getElementById('contentForm'); if(cf){
    ['companyName','heroTitle','heroSubtitle','aboutText'].forEach(k=>cf.elements[k].value=data[k]||'');
    if(cf.elements.logo) cf.elements.logo.value = data.logo || 'assets/nepembe-logo.png';
    const logoPreview = document.getElementById('logoPreview'); if(logoPreview) logoPreview.src = data.logo || 'assets/nepembe-logo.png';
    cf.elements.logoUpload?.addEventListener('change', async () => {
      const file = cf.elements.logoUpload.files[0]; if(!file) return;
      const logoData = await fileToDataUrl(file);
      if(logoPreview) logoPreview.src = logoData;
      cf.elements.logo.value = logoData;
    });
    cf.elements.logo?.addEventListener('input', () => { if(logoPreview && cf.elements.logo.value.trim()) logoPreview.src = cf.elements.logo.value.trim(); });
    cf.onsubmit = async e => {
      e.preventDefault(); const d=getData();
      ['companyName','heroTitle','heroSubtitle','aboutText'].forEach(k=>d[k]=cf.elements[k].value);
      d.logo = cf.elements.logo.value.trim() || 'assets/nepembe-logo.png';
      saveData(d); initShared(); alert('Branding and content saved. The logo, header and future gallery upload watermarks are updated.');
    };
  }
  const sf = document.getElementById('servicesForm'); if(sf){ sf.elements.services.value = data.services.map(s=>`${s.title} | ${s.description} | ${s.image || ''}`).join('\n'); sf.onsubmit = e => { e.preventDefault(); const d=getData(); d.services = sf.elements.services.value.split('\n').map(line=>line.trim()).filter(Boolean).map(line=>{ const [title,...desc]=line.split('|'); const description = (desc[0] || '').trim() || 'Cleaning service description.'; const image = (desc.slice(1).join('|') || '').trim(); return { title:title.trim(), description, image };  }); saveData(d); populateGallerySelectors(); alert('Services saved. Gallery selector updated.'); }; }
  const soc = document.getElementById('socialForm'); if(soc){ ['phone','whatsapp','email','address','mapLocation','googleMapsUrl','businessHours'].forEach(k=>{ if(soc.elements[k]) soc.elements[k].value=data[k]||''; }); ['facebook','instagram','tiktok'].forEach(k=>soc.elements[k].value=data.social?.[k]||''); soc.onsubmit = e => { e.preventDefault(); const d=getData(); ['phone','whatsapp','email','address','mapLocation','googleMapsUrl','businessHours'].forEach(k=>{ if(soc.elements[k]) d[k]=soc.elements[k].value; }); if(!d.mapLocation) d.mapLocation = d.address; d.social={facebook:soc.elements.facebook.value,instagram:soc.elements.instagram.value,tiktok:soc.elements.tiktok.value}; saveData(d); initShared(); alert('Contact, WhatsApp, social links and Google Maps location saved.'); }; }
  const gf = document.getElementById('galleryForm'); if(gf){
    populateGallerySelectors();
    gf.onsubmit = async e => {
      e.preventDefault(); const d=getData();
      const category = (gf.elements.galleryCustom.value || gf.elements.galleryService.value || 'General').trim();
      const baseTitle = (gf.elements.galleryTitle.value || category || 'Recent work').trim();
      const url = gf.elements.galleryUrl.value.trim();
      const files = [...gf.elements.galleryUpload.files];
      if(!url && !files.length) return alert('Add an image URL/path or upload one or more pictures.');
      if(url) d.gallery.unshift({ title: baseTitle, category, url, color:'linear-gradient(135deg,#dffaf4,#1769aa)' });
      for(let i=0;i<files.length;i++){
        const watermarked = await fileToWatermarkedDataUrl(files[i]);
        d.gallery.unshift({ title: files.length > 1 ? `${baseTitle} ${i+1}` : baseTitle, category, url: watermarked, color:'linear-gradient(135deg,#dffaf4,#1769aa)' });
      }
      saveData(d); gf.reset(); populateGallerySelectors(category); renderAdminGallery(category); alert(`Added ${files.length + (url ? 1 : 0)} picture(s) to ${category} gallery.`);
    };
    document.getElementById('adminGalleryFilter')?.addEventListener('change', e => renderAdminGallery(e.target.value));
    renderAdminGallery();
  }
}
function fileToDataUrl(file){ return new Promise((resolve,reject)=>{ const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=reject; r.readAsDataURL(file); }); }
function loadImage(src){ return new Promise((resolve,reject)=>{ const img = new Image(); img.onload=()=>resolve(img); img.onerror=reject; img.src=src; }); }
async function fileToWatermarkedDataUrl(file){
  const src = await fileToDataUrl(file);
  const data = getData();
  const [photo, logo] = await Promise.all([loadImage(src), loadImage(data.logo || 'assets/nepembe-logo.png')]);
  const canvas = document.createElement('canvas');
  const maxW = 1600;
  const scale = Math.min(1, maxW / photo.width);
  canvas.width = Math.round(photo.width * scale);
  canvas.height = Math.round(photo.height * scale);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(photo, 0, 0, canvas.width, canvas.height);
  const pad = Math.max(18, Math.round(canvas.width * 0.035));
  const boxW = Math.max(240, Math.round(canvas.width * 0.34));
  const boxH = Math.round(boxW * 0.27);
  const x = canvas.width - boxW - pad;
  const y = canvas.height - boxH - pad;
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,.30)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 8;
  ctx.fillStyle = 'rgba(255,255,255,.88)';
  roundedRect(ctx, x, y, boxW, boxH, Math.round(boxH * .22)); ctx.fill();
  ctx.restore();
  const inner = Math.round(boxH * .18);
  const maxLogoW = boxW - inner * 2;
  const maxLogoH = boxH - inner * 2;
  const logoScale = Math.min(maxLogoW / logo.width, maxLogoH / logo.height);
  const logoW = logo.width * logoScale;
  const logoH = logo.height * logoScale;
  ctx.drawImage(logo, x + (boxW-logoW)/2, y + (boxH-logoH)/2, logoW, logoH);
  return canvas.toDataURL('image/jpeg', 0.9);
}
function roundedRect(ctx, x, y, w, h, r){
  ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
}
function galleryCategories(data=getData()){
  return ['All', ...new Set([...data.services.map(s=>s.title), ...data.gallery.map(g=>g.category || 'General')])];
}
function populateGallerySelectors(selected=''){
  const data = getData();
  const serviceSelect = document.getElementById('galleryServiceSelect');
  const filterSelect = document.getElementById('adminGalleryFilter');
  const cats = galleryCategories(data);
  if(serviceSelect){
    serviceSelect.innerHTML = data.services.map(s=>`<option value="${escapeAttr(s.title)}">${escapeHtml(s.title)}</option>`).join('') + '<option value="General">General Gallery</option>';
    if(selected) serviceSelect.value = selected;
  }
  if(filterSelect){
    filterSelect.innerHTML = cats.map(c=>`<option value="${escapeAttr(c)}" ${c===selected?'selected':''}>${escapeHtml(c)}</option>`).join('');
  }
}
function renderAdminGallery(active='All'){
  const list = document.getElementById('adminGalleryList'); if(!list) return; const data=getData();
  populateGallerySelectors(active);
  const items = active === 'All' ? data.gallery.map((g,i)=>({g,i})) : data.gallery.map((g,i)=>({g,i})).filter(item => item.g.category === active);
  list.innerHTML = items.length ? items.map(({g,i})=>`<div class="gallery-admin-row"><div>${g.url?`<img src="${escapeAttr(g.url)}" alt="">`:''}<strong>${escapeHtml(g.title)}</strong><br><span>Gallery: ${escapeHtml(g.category)}</span></div><button data-remove="${i}">Remove</button></div>`).join('') : `<p class="hint">No pictures found in this gallery yet.</p>`;
  list.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{ const d=getData(); const current=document.getElementById('adminGalleryFilter')?.value || 'All'; d.gallery.splice(Number(btn.dataset.remove),1); saveData(d); renderAdminGallery(current); }));
}

function initLiveUI(){
  const progress = document.getElementById('scrollProgress');
  const header = document.querySelector('.site-header');
  const sticky = document.getElementById('stickyBooking');
  const navLinks = [...document.querySelectorAll('.main-menu a[href^="#"]')];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const updateScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if(progress) progress.style.width = `${pct}%`;
    header?.classList.toggle('scrolled', window.scrollY > 30);
    sticky?.classList.toggle('show', window.scrollY > 520 && window.scrollY < max - 240);
    let current = '';
    sections.forEach(sec => { if(sec.offsetTop - 130 <= window.scrollY) current = '#' + sec.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === current));
  };
  updateScroll();
  window.addEventListener('scroll', () => requestAnimationFrame(updateScroll), { passive:true });

  const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if(!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = 'yes';
    const target = Number(entry.target.dataset.count || 0);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 1300);
      entry.target.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if(p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold:.45 });
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  document.querySelectorAll('.magnetic-card:not([data-magnetic-ready])').forEach(card => {
    card.dataset.magneticReady = 'yes';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `translateY(-6px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  const hero = document.querySelector('.hero-carousel');
  if(hero && !hero.dataset.parallaxReady){
    hero.dataset.parallaxReady = 'yes';
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      hero.style.transform = `perspective(900px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg)`;
    });
    hero.addEventListener('mouseleave', () => { hero.style.transform = ''; });
  }
}


document.addEventListener('DOMContentLoaded', () => {
  initShared(); initMenu(); renderLandingContent(); initReveal(); initHeroCarousel(); renderServices(); renderGallery(); renderTestimonials(); initLightbox(); initQuoteForm(); initAdmin(); initLiveUI();
});

/* Final no-code admin editor override */
function setIfField(form, key, value){ if(form?.elements?.[key]) form.elements[key].value = value || ''; }
function getField(form, key){ return form?.elements?.[key]?.value || ''; }
function landingKeys(){ return ['companyName','heroEyebrow','heroTitle','heroSubtitle','servicesEyebrow','servicesTitle','servicesText','featuresEyebrow','featuresTitle','featuresText','aboutEyebrow','aboutTitle','aboutText','processEyebrow','processTitle','processText','transformEyebrow','transformTitle','transformText','galleryEyebrow','galleryTitle','galleryText','quoteEyebrow','quoteTitle','quoteText','testimonialsEyebrow','testimonialsTitle','contactEyebrow','contactTitle','contactText']; }
function refreshPublicPreviewParts(){ initShared(); renderLandingContent(); renderServices(); renderGallery(); renderTestimonials(); initReveal(); initHeroCarousel(); initLiveUI(); }
async function valueOrUpload(urlId, uploadId, watermark=false){
  const url = document.getElementById(urlId)?.value.trim();
  const file = document.getElementById(uploadId)?.files?.[0];
  if(file) return watermark ? await fileToWatermarkedDataUrl(file) : await fileToDataUrl(file);
  return url;
}
function listRowHtml(img, title, sub, i, type){
  return `<div class="gallery-admin-row"><div>${img?`<img src="${escapeAttr(img)}" alt="">`:''}<strong>${escapeHtml(title || '')}</strong><br><span>${escapeHtml(sub || '')}</span></div><button type="button" data-${type}-remove="${i}">Remove</button></div>`;
}
function renderHeroSlidesAdmin(){
  const list=document.getElementById('heroSlidesList'); if(!list) return; const d=getData();
  list.innerHTML=(d.heroSlides||[]).map((x,i)=>listRowHtml(x.image,x.title,'Hero slideshow image',i,'hero')).join('') || '<p class="hint">No hero slides yet.</p>';
  list.querySelectorAll('[data-hero-remove]').forEach(b=>b.onclick=()=>{const d=getData(); d.heroSlides.splice(+b.dataset.heroRemove,1); saveData(d); renderHeroSlidesAdmin();});
}
function renderStatsAdmin(){
  const list=document.getElementById('statsList'); if(!list) return; const d=getData();
  list.innerHTML=(d.stats||[]).map((x,i)=>listRowHtml('',`${x.icon||''} ${x.value||''}`,x.label||'',i,'stat')).join('') || '<p class="hint">No stats yet.</p>';
  list.querySelectorAll('[data-stat-remove]').forEach(b=>b.onclick=()=>{const d=getData(); d.stats.splice(+b.dataset.statRemove,1); saveData(d); renderStatsAdmin();});
}
function renderFeaturesAdmin(){
  const list=document.getElementById('featuresList'); if(!list) return; const d=getData();
  list.innerHTML=(d.features||[]).map((x,i)=>listRowHtml(x.image,x.title,x.text,i,'feature')).join('') || '<p class="hint">No features yet.</p>';
  list.querySelectorAll('[data-feature-remove]').forEach(b=>b.onclick=()=>{const d=getData(); d.features.splice(+b.dataset.featureRemove,1); saveData(d); renderFeaturesAdmin();});
}
function renderProcessAdmin(){
  const list=document.getElementById('processStepsList'); if(!list) return; const d=getData();
  list.innerHTML=(d.processSteps||[]).map((x,i)=>listRowHtml('',`${String(i+1).padStart(2,'0')} ${x.title}`,x.text,i,'process')).join('') || '<p class="hint">No process steps yet.</p>';
  list.querySelectorAll('[data-process-remove]').forEach(b=>b.onclick=()=>{const d=getData(); d.processSteps.splice(+b.dataset.processRemove,1); saveData(d); renderProcessAdmin();});
}
function renderServicesAdmin(){
  const list=document.getElementById('servicesList'); if(!list) return; const d=getData();
  list.innerHTML=(d.services||[]).map((x,i)=>listRowHtml(x.image,x.title,x.description,i,'service')).join('') || '<p class="hint">No services yet.</p>';
  list.querySelectorAll('[data-service-remove]').forEach(b=>b.onclick=()=>{const d=getData(); const name=d.services[+b.dataset.serviceRemove]?.title; d.services.splice(+b.dataset.serviceRemove,1); saveData(d); renderServicesAdmin(); populateGallerySelectors(); alert(`${name || 'Service'} removed.`);});
}
function renderReviewsAdmin(){
  const list=document.getElementById('reviewsList'); if(!list) return; const d=getData();
  list.innerHTML=(d.testimonials||[]).map((x,i)=>listRowHtml('',x.name,x.text,i,'review')).join('') || '<p class="hint">No reviews yet.</p>';
  list.querySelectorAll('[data-review-remove]').forEach(b=>b.onclick=()=>{const d=getData(); d.testimonials.splice(+b.dataset.reviewRemove,1); saveData(d); renderReviewsAdmin();});
}

function populateContentAdmin(){
  const data = getData();
  const cf = document.getElementById('contentForm');
  if(cf){
    landingKeys().forEach(k=>setIfField(cf,k,data[k]));
    setIfField(cf,'logo',data.logo || 'assets/nepembe-logo.png');
    const logoPreview = document.getElementById('logoPreview'); if(logoPreview) logoPreview.src = data.logo || 'assets/nepembe-logo.png';
    cf.elements.logoUpload?.addEventListener('change', async () => { const file=cf.elements.logoUpload.files[0]; if(!file) return; const v=await fileToDataUrl(file); cf.elements.logo.value=v; if(logoPreview) logoPreview.src=v; });
    cf.elements.logo?.addEventListener('input',()=>{ if(logoPreview && cf.elements.logo.value.trim()) logoPreview.src=cf.elements.logo.value.trim(); });
    document.getElementById('addHeroSlide')?.addEventListener('click', async ()=>{ const d=getData(); const image=await valueOrUpload('heroSlideUrl','heroSlideUpload',true); const title=document.getElementById('heroSlideTitle').value.trim() || 'Cleaning service'; if(!image) return alert('Please add or upload a slide image.'); d.heroSlides=d.heroSlides||[]; d.heroSlides.push({title,image}); saveData(d); ['heroSlideTitle','heroSlideUrl','heroSlideUpload'].forEach(id=>document.getElementById(id).value=''); renderHeroSlidesAdmin(); alert('Hero slide added.'); });
    document.getElementById('addStat')?.addEventListener('click',()=>{ const d=getData(); d.stats=d.stats||[]; d.stats.push({icon:document.getElementById('statIcon').value||'✨', value:document.getElementById('statValue').value||'Fresh', count:Number(document.getElementById('statCount').value||0), label:document.getElementById('statLabel').value||'trust highlight'}); saveData(d); ['statIcon','statValue','statCount','statLabel'].forEach(id=>document.getElementById(id).value=''); renderStatsAdmin(); });
    document.getElementById('addFeature')?.addEventListener('click', async ()=>{ const d=getData(); const image=await valueOrUpload('featureImage','featureUpload',true); const title=document.getElementById('featureTitle').value.trim(); const text=document.getElementById('featureText').value.trim(); if(!title || !text) return alert('Add a feature title and text.'); d.features=d.features||[]; d.features.push({title,text,image:image||'assets/deep-cleaning.png'}); saveData(d); ['featureTitle','featureText','featureImage','featureUpload'].forEach(id=>document.getElementById(id).value=''); renderFeaturesAdmin(); });
    document.getElementById('addProcessStep')?.addEventListener('click',()=>{ const d=getData(); const title=document.getElementById('processStepTitle').value.trim(); const text=document.getElementById('processStepText').value.trim(); if(!title || !text) return alert('Add a step title and text.'); d.processSteps=d.processSteps||[]; d.processSteps.push({title,text}); saveData(d); ['processStepTitle','processStepText'].forEach(id=>document.getElementById(id).value=''); renderProcessAdmin(); });
    cf.onsubmit = e => { e.preventDefault(); const d=getData(); landingKeys().forEach(k=>d[k]=getField(cf,k)); d.logo=getField(cf,'logo')||'assets/nepembe-logo.png'; saveData(d); refreshPublicPreviewParts(); alert('Landing page saved. Open the website to see all updated text and images.'); };
    renderHeroSlidesAdmin(); renderStatsAdmin(); renderFeaturesAdmin(); renderProcessAdmin();
  }

  const sf=document.getElementById('servicesForm');
  if(sf){
    document.getElementById('addService')?.addEventListener('click', async ()=>{ const d=getData(); const title=document.getElementById('serviceTitle').value.trim(); const description=document.getElementById('serviceDesc').value.trim(); const image=await valueOrUpload('serviceImage','serviceUpload',true); if(!title || !description) return alert('Add service name and description.'); d.services=d.services||[]; d.services.push({title,description,image:image||'assets/cleaning-home.png'}); saveData(d); ['serviceTitle','serviceDesc','serviceImage','serviceUpload'].forEach(id=>document.getElementById(id).value=''); renderServicesAdmin(); populateGallerySelectors(); alert('Service added.'); });
    renderServicesAdmin();
  }

  const rf=document.getElementById('reviewsForm');
  if(rf){
    document.getElementById('addReview')?.addEventListener('click',()=>{ const d=getData(); const name=document.getElementById('reviewName').value.trim(); const text=document.getElementById('reviewText').value.trim(); if(!name || !text) return alert('Add customer name and review text.'); d.testimonials=d.testimonials||[]; d.testimonials.push({name,text}); saveData(d); ['reviewName','reviewText'].forEach(id=>document.getElementById(id).value=''); renderReviewsAdmin(); });
    renderReviewsAdmin();
  }

  const soc = document.getElementById('socialForm');
  if(soc){ ['phone','whatsapp','email','address','mapLocation','googleMapsUrl','businessHours'].forEach(k=>{ if(soc.elements[k]) soc.elements[k].value=data[k]||''; }); ['facebook','instagram','tiktok'].forEach(k=>soc.elements[k].value=data.social?.[k]||''); soc.onsubmit = e => { e.preventDefault(); const d=getData(); ['phone','whatsapp','email','address','mapLocation','googleMapsUrl','businessHours'].forEach(k=>{ if(soc.elements[k]) d[k]=soc.elements[k].value; }); if(!d.mapLocation) d.mapLocation = d.address; d.social={facebook:soc.elements.facebook.value,instagram:soc.elements.instagram.value,tiktok:soc.elements.tiktok.value}; saveData(d); initShared(); alert('Contact, WhatsApp, social links and Google Maps location saved.'); }; }

  const gf = document.getElementById('galleryForm'); if(gf){
    populateGallerySelectors();
    gf.onsubmit = async e => {
      e.preventDefault(); const d=getData();
      const category = (gf.elements.galleryCustom.value || gf.elements.galleryService.value || 'General').trim();
      const baseTitle = (gf.elements.galleryTitle.value || category || 'Recent work').trim();
      const url = gf.elements.galleryUrl.value.trim();
      const files = [...gf.elements.galleryUpload.files];
      if(!url && !files.length) return alert('Add an image URL/path or upload one or more pictures.');
      if(url) d.gallery.unshift({ title: baseTitle, category, url, color:'linear-gradient(135deg,#dffaf4,#1769aa)' });
      for(let i=0;i<files.length;i++){
        const watermarked = await fileToWatermarkedDataUrl(files[i]);
        d.gallery.unshift({ title: files.length > 1 ? `${baseTitle} ${i+1}` : baseTitle, category, url: watermarked, color:'linear-gradient(135deg,#dffaf4,#1769aa)' });
      }
      saveData(d); gf.reset(); populateGallerySelectors(category); renderAdminGallery(category); alert(`Added ${files.length + (url ? 1 : 0)} picture(s) to ${category} gallery.`);
    };
    document.getElementById('adminGalleryFilter')?.addEventListener('change', e => renderAdminGallery(e.target.value));
    renderAdminGallery();
  }
}

/* User management and password control override */
function currentAdminUser(){ return sessionStorage.getItem('nepembeAdminUser') || ''; }
function ensureUsers(data){
  if(!Array.isArray(data.users) || !data.users.length){
    data.users = [{ username:'admin', password:'nepembe2026', role:'Admin' }];
    saveData(data);
  }
  return data.users;
}
function initAdmin(){
  const login = document.getElementById('loginPanel'), dash = document.getElementById('dashboard'); if(!login || !dash) return;
  const data = getData(); ensureUsers(data);
  const isLogged = sessionStorage.getItem('nepembeAdmin') === 'yes';
  if(isLogged){ login.classList.add('hidden'); dash.classList.remove('hidden'); populateAdmin(); }
  document.getElementById('loginForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const d = getData(); const users = ensureUsers(d);
    const username = (document.getElementById('username')?.value || 'admin').trim();
    const password = document.getElementById('password')?.value || '';
    const user = users.find(u => u.username === username && u.password === password);
    if(user){
      sessionStorage.setItem('nepembeAdmin','yes');
      sessionStorage.setItem('nepembeAdminUser', user.username);
      login.classList.add('hidden'); dash.classList.remove('hidden'); populateAdmin();
    } else alert('Wrong username or password.');
  });
  document.getElementById('logout')?.addEventListener('click',()=>{ sessionStorage.removeItem('nepembeAdmin'); sessionStorage.removeItem('nepembeAdminUser'); location.reload(); });
  document.querySelectorAll('.tab-btn').forEach(btn=>btn.addEventListener('click',()=>switchTab(btn.dataset.tab)));
  document.getElementById('resetData')?.addEventListener('click',()=>{ if(confirm('Reset all demo content and users to default?')){ localStorage.removeItem(STORAGE_KEY); sessionStorage.removeItem('nepembeAdmin'); sessionStorage.removeItem('nepembeAdminUser'); location.reload(); }});
}
function renderUsersAdmin(){
  const list = document.getElementById('usersList'); if(!list) return;
  const d = getData(); const users = ensureUsers(d); const current = currentAdminUser();
  list.innerHTML = users.map((u,i)=>`<div class="gallery-admin-row"><div><strong>${escapeHtml(u.username)}</strong><br><span>${escapeHtml(u.role || 'Admin')}${u.username===current?' · currently logged in':''}</span></div><button type="button" data-user-remove="${i}" ${users.length===1?'disabled':''}>Remove</button></div>`).join('');
  list.querySelectorAll('[data-user-remove]').forEach(btn=>btn.addEventListener('click',()=>{
    const d=getData(); const users=ensureUsers(d); const idx=Number(btn.dataset.userRemove);
    if(users.length===1) return alert('At least one admin user is required.');
    if(users[idx]?.username===current && !confirm('You are removing your own account. Continue?')) return;
    const removed=users.splice(idx,1)[0]; saveData(d); renderUsersAdmin(); alert(`${removed.username} removed.`);
    if(removed.username===current){ sessionStorage.removeItem('nepembeAdmin'); sessionStorage.removeItem('nepembeAdminUser'); location.reload(); }
  }));
}
function initUsersPanel(){
  const form = document.getElementById('usersForm'); if(!form) return;
  if(form.dataset.ready) { renderUsersAdmin(); return; }
  form.dataset.ready = 'yes';
  document.getElementById('addUserBtn')?.addEventListener('click',()=>{
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newUserPassword').value;
    const role = document.getElementById('newUserRole').value || 'Admin';
    if(!username || !password) return alert('Enter username and password for the new user.');
    if(password.length < 6) return alert('Password must be at least 6 characters.');
    const d=getData(); const users=ensureUsers(d);
    if(users.some(u=>u.username.toLowerCase()===username.toLowerCase())) return alert('That username already exists.');
    users.push({username,password,role}); saveData(d);
    ['newUsername','newUserPassword'].forEach(id=>document.getElementById(id).value='');
    renderUsersAdmin(); alert('New user added.');
  });
  document.getElementById('changePasswordBtn')?.addEventListener('click',()=>{
    const current = currentAdminUser(); if(!current) return alert('Please login again.');
    const oldPass = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;
    if(!oldPass || !newPass || !confirm) return alert('Fill in current password, new password and confirmation.');
    if(newPass.length < 6) return alert('New password must be at least 6 characters.');
    if(newPass !== confirm) return alert('New passwords do not match.');
    const d=getData(); const users=ensureUsers(d); const user=users.find(u=>u.username===current);
    if(!user || user.password !== oldPass) return alert('Current password is incorrect.');
    user.password = newPass; saveData(d);
    ['currentPassword','newPassword','confirmPassword'].forEach(id=>document.getElementById(id).value='');
    renderUsersAdmin(); alert('Password changed successfully. Use the new password next time you login.');
  });
  renderUsersAdmin();
}

function populateAdmin(){
  populateContentAdmin();
  initUsersPanel();
}

/* Dashboard audit/backup enhancement */
function renderAdminDashboard(){
  const box = document.getElementById('adminSummary'); if(!box) return;
  const d = getData(); ensureUsers(d);
  const checks = [
    {label:'Services', value:(d.services||[]).length, ok:(d.services||[]).length > 0, note:'service cards'},
    {label:'Gallery Pictures', value:(d.gallery||[]).length, ok:(d.gallery||[]).length >= 6, note:'uploaded work photos'},
    {label:'Hero Slides', value:(d.heroSlides||[]).length, ok:(d.heroSlides||[]).length >= 3, note:'homepage slideshow'},
    {label:'Reviews', value:(d.testimonials||[]).length, ok:(d.testimonials||[]).length >= 3, note:'trust builders'},
    {label:'Users', value:(d.users||[]).length, ok:(d.users||[]).length >= 1, note:'admin accounts'},
    {label:'WhatsApp', value:d.whatsapp ? 'Ready' : 'Missing', ok:!!d.whatsapp, note:'lead button'},
    {label:'Email', value:d.email ? 'Ready' : 'Missing', ok:!!d.email, note:'quote form'},
    {label:'Google Map', value:(d.mapLocation||d.googleMapsUrl) ? 'Ready' : 'Missing', ok:!!(d.mapLocation||d.googleMapsUrl), note:'location'}
  ];
  box.innerHTML = checks.map(c=>`<article class="summary-card ${c.ok?'ok':'warn'}"><span>${c.ok?'✓':'!'}</span><strong>${escapeHtml(c.value)}</strong><p>${escapeHtml(c.label)}</p><small>${escapeHtml(c.note)}</small></article>`).join('');
}
function initDashboardTools(){
  const panel = document.getElementById('dashboardPanel'); if(!panel) return;
  renderAdminDashboard();
  document.querySelectorAll('[data-tab-jump]').forEach(btn=>{ if(!btn.dataset.ready){ btn.dataset.ready='yes'; btn.addEventListener('click',()=>switchTab(btn.dataset.tabJump)); }});
  const exportBtn = document.getElementById('exportDataBtn');
  if(exportBtn && !exportBtn.dataset.ready){
    exportBtn.dataset.ready='yes';
    exportBtn.addEventListener('click',()=>{
      const data = JSON.stringify(getData(), null, 2);
      const blob = new Blob([data], {type:'application/json'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `nepembe-website-backup-${new Date().toISOString().slice(0,10)}.json`;
      a.click(); URL.revokeObjectURL(a.href);
    });
  }
  const importBtn = document.getElementById('importDataBtn');
  if(importBtn && !importBtn.dataset.ready){
    importBtn.dataset.ready='yes';
    importBtn.addEventListener('click',()=>{
      const file = document.getElementById('importDataFile')?.files?.[0];
      if(!file) return alert('Please choose a backup JSON file first.');
      const reader = new FileReader();
      reader.onload = () => {
        try{
          const data = JSON.parse(reader.result);
          if(!data.companyName && !Array.isArray(data.services)) throw new Error('Invalid backup file');
          data._version = DEFAULT_DATA._version;
          saveData({...DEFAULT_DATA, ...data});
          alert('Backup imported. The admin panel will refresh now.');
          location.reload();
        }catch(e){ alert('Could not import this backup. Please choose a valid Nepembe JSON backup.'); }
      };
      reader.readAsText(file);
    });
  }
  const clearBtn = document.getElementById('clearDemoDataBtn');
  if(clearBtn && !clearBtn.dataset.ready){
    clearBtn.dataset.ready='yes';
    clearBtn.addEventListener('click',()=>{ if(confirm('Reset all website content, users and galleries to default demo content?')){ localStorage.removeItem(STORAGE_KEY); sessionStorage.removeItem('nepembeAdmin'); sessionStorage.removeItem('nepembeAdminUser'); location.reload(); }});
  }
}
const populateAdminWithDashboard = populateAdmin;
function populateAdmin(){
  populateAdminWithDashboard();
  initDashboardTools();
}
