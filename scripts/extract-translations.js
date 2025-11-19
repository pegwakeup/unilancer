#!/usr/bin/env node

/**
 * Translation Extraction Script
 * Scans all TSX files and extracts Turkish content for translation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../src/pages');
const COMPONENTS_DIR = path.join(__dirname, '../src/components');

// Turkish character detection regex
const TURKISH_CHARS = /[ığüşöçĞÜŞİÖÇ]/;

// Extract strings from file content
function extractStrings(content, filePath) {
  const strings = [];

  // Match string literals in various contexts
  const patterns = [
    // JSX text content: >text<
    />([^<>{}]+)</g,
    // String literals: "text" or 'text'
    /["']([^"']+)["']/g,
    // Template literals: `text`
    /`([^`]+)`/g,
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const text = match[1].trim();

      // Check if contains Turkish characters and is not too short
      if (TURKISH_CHARS.test(text) && text.length > 3) {
        // Skip if it's a file path, URL, or code
        if (!text.includes('/') && !text.includes('http') && !text.includes('import') && !text.includes('const')) {
          strings.push({
            text,
            file: path.relative(process.cwd(), filePath),
          });
        }
      }
    }
  });

  return strings;
}

// Recursively scan directory
function scanDirectory(dir, results = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDirectory(filePath, results);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const strings = extractStrings(content, filePath);
      results.push(...strings);
    }
  });

  return results;
}

// Generate content key from text and file
function generateContentKey(text, file) {
  const page = path.basename(file, '.tsx').toLowerCase();
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9ığüşöç\s]/g, '')
    .split(/\s+/)
    .slice(0, 3)
    .join('_');

  return `${page}.${words}`.substring(0, 50);
}

// Generate hash for content
function generateHash(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Main execution
console.log('🔍 Scanning for Turkish content...\n');

const pagesStrings = scanDirectory(PAGES_DIR);
const componentStrings = scanDirectory(COMPONENTS_DIR);
const allStrings = [...pagesStrings, ...componentStrings];

// Remove duplicates
const uniqueStrings = [...new Map(allStrings.map(item => [item.text, item])).values()];

console.log(`Found ${uniqueStrings.length} unique Turkish strings\n`);
console.log('📝 Sample content:\n');

// Show first 10 samples
uniqueStrings.slice(0, 10).forEach((item, idx) => {
  console.log(`${idx + 1}. "${item.text}"`);
  console.log(`   File: ${item.file}\n`);
});

// Generate SQL migration
const sqlStatements = uniqueStrings.map((item, idx) => {
  const contentKey = generateContentKey(item.text, item.file);
  const hash = generateHash(item.text);
  const text = item.text.replace(/'/g, "''"); // Escape single quotes

  return `('${contentKey}', 'tr', '${text}', '${hash}')`;
});

const migration = `/*
  # Complete Site Translation Seeds

  Extracted from all pages and components
  Total items: ${uniqueStrings.length}
*/

INSERT INTO translations (content_key, language, translated_text, content_hash) VALUES
${sqlStatements.join(',\n')}
ON CONFLICT (content_key, language) DO NOTHING;
`;

// Save migration file
const migrationPath = path.join(__dirname, '../extracted-translations.sql');
fs.writeFileSync(migrationPath, migration);

console.log(`\n✅ Generated migration file: ${migrationPath}`);
console.log(`📊 Total translations: ${uniqueStrings.length}`);
