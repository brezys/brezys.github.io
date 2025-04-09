const fs = require('fs');
const path = require('path');

// Path to the built index.html
const indexPath = path.resolve(__dirname, 'dist', 'index.html');

// Read the current content
let content = fs.readFileSync(indexPath, 'utf8');

// Add meta tag for JavaScript MIME type
const metaTag = '<meta http-equiv="Content-Type" content="text/javascript; charset=utf-8" />';
content = content.replace('</head>', metaTag + '</head>');

// Write the updated content back
fs.writeFileSync(indexPath, content);

console.log('Added Content-Type meta tag to index.html'); 