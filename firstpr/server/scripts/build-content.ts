import fs from 'fs';
import path from 'path';

// Mock script since real CSVs are missing as per spec.
console.log('Building content... [MOCK]');

const dataDir = path.join(__dirname, '../../../src/content/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Write dummy orgs.json
const orgs = [
  {
    id: "org-1",
    name: "Placeholder Org",
    tier: "beginner",
    stack: ["javascript"],
    gsoc2026: true,
    lfx2026: false,
    starterRepo: "https://github.com/placeholder/repo",
    links: { website: "https://example.com" },
    activity: { commits30d: 42, authors30d: 5, checkedAt: new Date().toISOString() },
    aiPolicy: "allowed"
  }
];

fs.writeFileSync(path.join(dataDir, 'orgs.json'), JSON.stringify(orgs, null, 2));

console.log('Content built successfully.');
