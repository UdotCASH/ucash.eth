const fs = require('fs');
const path = require('path');

/**
 * Extract subname data from README.md
 * This script parses the README.md to extract all subnames and their metadata
 */
function extractReadmeData() {
  const readmePath = path.join(__dirname, '../../README.md');

  if (!fs.existsSync(readmePath)) {
    console.error('❌ README.md not found at', readmePath);
    process.exit(1);
  }

  const readme = fs.readFileSync(readmePath, 'utf8');
  const lines = readme.split('\n');

  const subnames = [];
  const categories = {};

  let currentCategory = null;
  let categoryIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect category headers (## Category Name)
    if (line.startsWith('## ') && !line.includes('Sub-Subnames')) {
      currentCategory = line.replace('## ', '').trim().toLowerCase();
      categoryIndex = 0;

      // Initialize category
      if (!categories[currentCategory]) {
        categories[currentCategory] = {
          name: line.replace('## ', '').trim(),
          template: `${currentCategory}.html`,
          count: 0
        };
      }
    }

    // Extract subnames from lines like: - **name** - description
    const match = line.match(/- \*\*([a-z0-9-]+)\*\* - (.+)/);
    if (match) {
      const name = match[1];
      const description = match[2];

      // Determine template based on category
      let template = 'generic-tld';
      if (currentCategory === 'core infrastructure') {
        template = 'core';
      } else if (currentCategory === 'defi/financial') {
        template = 'defi';
      } else if (currentCategory === 'tools/explorers') {
        template = 'tools';
      } else if (currentCategory === 'storage/web3') {
        template = 'storage';
      } else if (currentCategory === 'blockchain networks') {
        template = 'networks';
      } else if (currentCategory === 'brand/identity') {
        template = 'brand';
      }

      subnames.push({
        name: name,
        fullName: `${name}.ucash.eth`,
        category: currentCategory || 'generic',
        template: template,
        purpose: description,
        description: description,
        notes: '',
        status: 'development',
        contract: null,
        links: {}
      });

      if (currentCategory && categories[currentCategory]) {
        categories[currentCategory].count++;
      }

      categoryIndex++;
    }
  }

  return { subnames, categories };
}

// Main execution
try {
  console.log('🔍 Extracting subname data from README.md...\n');

  const data = extractReadmeData();

  console.log(`📊 Found ${data.subnames.length} subnames\n`);
  console.log('📁 Categories:');
  Object.entries(data.categories).forEach(([key, cat]) => {
    console.log(`   ${cat.name}: ${cat.count} subnames`);
  });

  // Save to JSON file
  const outputPath = path.join(__dirname, '../data/subnames.json');
  fs.writeFileSync(outputPath, JSON.stringify({ ...data, generatedAt: new Date().toISOString() }, null, 2));

  console.log(`\n✅ Data saved to: ${outputPath}`);

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
