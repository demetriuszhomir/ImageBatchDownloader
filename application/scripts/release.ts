import { existsSync, readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { resolve, join, dirname } from 'path';
import JSZip from 'jszip';

// Read version from package.json
const packageJson = JSON.parse(readFileSync(resolve('package.json'), 'utf-8'));
const version = packageJson.version.replace(/\./g, '-');
const versionedName = `ImageBatchDownloader_v${version}`;

const buildDir = resolve('build');
const projectRoot = dirname(buildDir);
const repoRoot = dirname(projectRoot); // ImageBatchDownloader root
const licensePath = resolve(repoRoot, 'LICENSE');
const noticePath = resolve(repoRoot, 'NOTICE');

// Create zip with build contents and license files
const zip = new JSZip();

function addDirectoryToZip(dirPath: string, zipFolder: JSZip, isRoot = false) {
  const files = readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = join(dirPath, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      const newZipFolder = zipFolder.folder(file);
      if (newZipFolder) {
        addDirectoryToZip(filePath, newZipFolder, false);
      }
    } else {
      // Rename index.html to versioned name at root level only
      if (isRoot && file === 'index.html') {
        const htmlContent = readFileSync(filePath);
        zipFolder.file(`${versionedName}.html`, htmlContent);
      } else {
        const fileData = readFileSync(filePath);
        zipFolder.file(file, fileData);
      }
    }
  }
}

// Add build folder contents
addDirectoryToZip(buildDir, zip, true);

// Add LICENSE to zip root
if (existsSync(licensePath)) {
  zip.file('LICENSE', readFileSync(licensePath));
  console.log('✓ Added LICENSE to zip');
}

// Add NOTICE to zip root
if (existsSync(noticePath)) {
  zip.file('NOTICE', readFileSync(noticePath));
  console.log('✓ Added NOTICE to zip');
}

const zipBuffer = await zip.generateAsync({ 
  type: 'nodebuffer',
  compression: 'DEFLATE',
  compressionOptions: { level: 9 }
});

writeFileSync(join(projectRoot, `${versionedName}.zip`), zipBuffer);
console.log(`✓ Created ${versionedName}.zip`);
