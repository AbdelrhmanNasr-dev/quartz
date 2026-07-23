import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Modern ES Module workaround for folder paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, 'content');
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const today = Date.now();

function cleanExpiredTags(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      cleanExpiredTags(fullPath); // Recursively search folders
    } else if (fullPath.endsWith('.md')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // 1. Isolate the YAML frontmatter
      const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      
      if (frontmatterMatch) {
        let frontmatter = frontmatterMatch[1];

        // 2. Extract the publishDate string
        const dateMatch = frontmatter.match(/publishDate:\s*(.+)/);
        
        if (dateMatch) {
          const publishDateStr = dateMatch[1].trim();
          const publishDate = new Date(publishDateStr).getTime();

          // 3. Check if 7 days have passed since publication
          if (!isNaN(publishDate) && (today - publishDate > SEVEN_DAYS_MS)) {
            
            const tagRegex = /^[ \t]*-[ \t]*new[ \t]*\r?\n?/gm;
            
            if (tagRegex.test(frontmatter)) {
              let updatedFrontmatter = frontmatter.replace(tagRegex, '');
              
              const finalContent = content.replace(frontmatterMatch[1], () => updatedFrontmatter);
              fs.writeFileSync(fullPath, finalContent, 'utf8');
              console.log(`✅ Expired! Removed 'new' tag from: ${file}`);
            }
          }
        }
      }
    }
  }
}

cleanExpiredTags(contentDir);