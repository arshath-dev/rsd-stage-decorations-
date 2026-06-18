const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about/index.html',
  'services/index.html',
  'portfolio/index.html',
  'testimonials/index.html',
  'contact/index.html'
];

const getHeaderHtml = (activeKey) => `
    <!-- Navbar -->
    <header class="navbar" id="navbar">
      <div class="container nav-content">
        <a href="/" class="logo">RDS <span>Decor</span></a>
        
        <!-- Desktop Nav -->
        <nav class="nav-links">
          <a href="/" class="hover-link" ${activeKey === 'home' ? 'style="color: var(--color-gold);"' : ''}>Home</a>
          <a href="/about/" class="hover-link" ${activeKey === 'about' ? 'style="color: var(--color-gold);"' : ''}>About</a>
          <a href="/services/" class="hover-link" ${activeKey === 'services' ? 'style="color: var(--color-gold);"' : ''}>Services</a>
          <a href="/portfolio/" class="hover-link" ${activeKey === 'portfolio' ? 'style="color: var(--color-gold);"' : ''}>Portfolio</a>
          <a href="/testimonials/" class="hover-link" ${activeKey === 'testimonials' ? 'style="color: var(--color-gold);"' : ''}>Testimonials</a>
          <a href="/contact/" class="hover-link" ${activeKey === 'contact' ? 'style="color: var(--color-gold);"' : ''}>Contact</a>
        </nav>

        <a href="https://wa.me/919025066027" class="btn btn-sweep desktop-book-btn" target="_blank">
          <span class="btn-text">Book Now</span>
        </a>

        <!-- Mobile Menu Toggle -->
        <div class="mobile-menu-btn" id="mobile-menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>

    <!-- Mobile Nav Overlay -->
    <div class="mobile-nav-overlay" id="mobile-nav-overlay">
      <nav class="mobile-nav-links">
        <a href="/" ${activeKey === 'home' ? 'style="color: var(--color-gold);"' : ''}>Home</a>
        <a href="/about/" ${activeKey === 'about' ? 'style="color: var(--color-gold);"' : ''}>About</a>
        <a href="/services/" ${activeKey === 'services' ? 'style="color: var(--color-gold);"' : ''}>Services</a>
        <a href="/portfolio/" ${activeKey === 'portfolio' ? 'style="color: var(--color-gold);"' : ''}>Portfolio</a>
        <a href="/testimonials/" ${activeKey === 'testimonials' ? 'style="color: var(--color-gold);"' : ''}>Testimonials</a>
        <a href="/contact/" ${activeKey === 'contact' ? 'style="color: var(--color-gold);"' : ''}>Contact</a>
      </nav>
      <a href="https://wa.me/919025066027" class="btn btn-sweep mt-4" target="_blank">
          <span class="btn-text">Book Now</span>
      </a>
    </div>
`;

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Determine active key
  let activeKey = 'home';
  if (file.includes('about')) activeKey = 'about';
  else if (file.includes('services')) activeKey = 'services';
  else if (file.includes('portfolio')) activeKey = 'portfolio';
  else if (file.includes('testimonials')) activeKey = 'testimonials';
  else if (file.includes('contact')) activeKey = 'contact';

  // regex to match the old <header id="navbar">...</header>
  // using generic regex to replace from <header class="navbar" id="navbar"> to </header>
  const headerRegex = /<!-- Navbar -->[\s\S]*?<\/header>/;
  
  const newHeader = getHeaderHtml(activeKey);
  content = content.replace(headerRegex, newHeader);
  
  fs.writeFileSync(filePath, content);
  console.log('Updated ' + file);
});
