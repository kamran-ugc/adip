const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve(__dirname, '../mfe-shell/src/styles');
const targetDir = path.resolve(__dirname, 'projects/shared-components/.storybook/styles');

console.log('Source directory:', sourceDir);
console.log('Target directory:', targetDir);

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy styles.scss
const stylesSource = path.join(sourceDir, 'styles.scss');
const stylesTarget = path.join(targetDir, 'styles.scss');
console.log('Copying styles.scss from:', stylesSource, 'to:', stylesTarget);
fs.copyFileSync(stylesSource, stylesTarget);

// Copy themes directory
const themesSourceDir = path.join(sourceDir, 'themes');
const themesTargetDir = path.join(targetDir, 'themes');
console.log('Themes source directory:', themesSourceDir);
console.log('Themes target directory:', themesTargetDir);

if (!fs.existsSync(themesTargetDir)) {
  fs.mkdirSync(themesTargetDir, { recursive: true });
}

// Copy all files from themes directory
const themeFiles = fs.readdirSync(themesSourceDir);
console.log('Found theme files:', themeFiles);

themeFiles.forEach(file => {
  const sourceFile = path.join(themesSourceDir, file);
  const targetFile = path.join(themesTargetDir, file);
  
  console.log(`\nProcessing file: ${file}`);
  console.log('Source file:', sourceFile);
  console.log('Target file:', targetFile);
  
  // Copy the file
  fs.copyFileSync(sourceFile, targetFile);
  
  // Read the content of the copied file
  let content = fs.readFileSync(targetFile, 'utf8');
  console.log('Original content length:', content.length);
  
  // Update font paths - handle both quoted and unquoted paths
  const updatedContent = content
    .replace(/url\(['"]\.\.\/\.\.\/assets\/scu\/fonts/g, 'url(\'../../../assets/scu/fonts')
    .replace(/url\(\.\.\/\.\.\/assets\/scu\/fonts/g, 'url(\'../../../assets/scu/fonts');
  
  console.log('Updated content length:', updatedContent.length);
  console.log('Changes made:', content !== updatedContent);
  
  // Write the updated content back to the file
  fs.writeFileSync(targetFile, updatedContent);
  console.log('File processed successfully');
});

console.log('\nStyles copied and font paths updated successfully!'); 