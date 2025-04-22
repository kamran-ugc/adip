const sass = require('sass');
const fs = require('fs');
const path = require('path');

// Paths
const inputFile = path.resolve(__dirname, 'styles/styles.scss');
const outputFile = path.resolve(__dirname, 'styles/styles.css');

// Make sure the output directory exists
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Compile SCSS to CSS
try {
  const result = sass.compile(inputFile, {
    loadPaths: [
      path.resolve(__dirname, '../src/styles'),
      path.resolve(__dirname, '../../../node_modules')
    ]
  });
  
  // Write the CSS to the output file
  fs.writeFileSync(outputFile, result.css);
  console.log('SCSS compiled successfully');
} catch (error) {
  console.error('Error compiling SCSS:', error);
}