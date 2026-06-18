const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about/index.html',
  'services/index.html',
  'portfolio/index.html',
  'testimonials/index.html',
  'contact/index.html',
  'update_nav.cjs'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace display format
  content = content.replace(/\+91 9025066027/g, '+91 8438886853');
  
  // Replace link format
  content = content.replace(/919025066027/g, '918438886853');
  
  fs.writeFileSync(filePath, content);
  console.log('Updated ' + file);
});
