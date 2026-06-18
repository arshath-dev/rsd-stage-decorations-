const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public/images');
const htmlFiles = [
  'index.html',
  'about/index.html',
  'services/index.html',
  'portfolio/index.html',
  'testimonials/index.html',
  'contact/index.html'
];

async function optimizeImages() {
  const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.png'));
  for (const file of files) {
    const inputPath = path.join(imgDir, file);
    const outputPath = path.join(imgDir, file.replace('.png', '.webp'));
    
    console.log(`Optimizing ${file}...`);
    await sharp(inputPath)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);
      
    // Optionally delete original png
    fs.unlinkSync(inputPath);
  }
}

function updateHtmlFiles() {
  htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace .png with .webp
    content = content.replace(/\.png/g, '.webp');
    
    // Add preload for hero.webp in <head>
    if (!content.includes('<link rel="preload" as="image" href="/images/hero.webp">')) {
      content = content.replace('</head>', '    <link rel="preload" as="image" href="/images/hero.webp">\n  </head>');
    }
    
    // Add loading="lazy" to <img> tags if missing
    // Match <img ...> that doesn't already have loading="lazy"
    content = content.replace(/<img (?!.*loading="lazy")[^>]+>/g, (match) => {
      // Don't lazy load hero image if it was an <img> tag, but it's a background image anyway.
      return match.replace('<img ', '<img loading="lazy" ');
    });

    fs.writeFileSync(filePath, content);
    console.log(`Updated HTML: ${file}`);
  });
}

function updateCssAndJs() {
  const cssPath = path.join(__dirname, 'src/style.css');
  if (fs.existsSync(cssPath)) {
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    cssContent = cssContent.replace(/\.png/g, '.webp');
    
    // Optimize FontAwesome by deferring it if it's in HTML, but here it's in HTML.
    
    fs.writeFileSync(cssPath, cssContent);
    console.log('Updated CSS');
  }
}

async function run() {
  try {
    await optimizeImages();
    updateHtmlFiles();
    updateCssAndJs();
    console.log('Optimization complete!');
  } catch (err) {
    console.error('Error during optimization:', err);
  }
}

run();
