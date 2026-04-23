const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/subnames.json');
const TEMPLATES_PATH = path.join(__dirname, '../templates');
const OUTPUT_PATH = path.join(__dirname, '../sites');

// Simple template renderer (replaces <%= var %> with values)
function renderTemplate(template, data) {
  return template.replace(/<%=\s*(\w+)\s*%>/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

async function generateAll() {
  console.log('🚀 Starting UCASH subname website generation...\n');

  // Load subname data
  const dataPath = path.resolve(__dirname, '../data/subnames.json');
  if (!fs.existsSync(dataPath)) {
    console.error('❌ Error: subnames.json not found at', dataPath);
    console.log('   Please ensure the data file exists.');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const subnames = data.subnames || [];

  console.log(`📊 Found ${subnames.length} subnames to generate\n`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  }

  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  // Generate HTML for each subname
  for (const subname of subnames) {
    try {
      // Determine template file
      const templateFile = `${subname.template}.html`;
      const templatePath = path.join(TEMPLATES_PATH, templateFile);

      // Check if template exists
      if (!fs.existsSync(templatePath)) {
        // Fall back to generic template if specific template doesn't exist
        const genericTemplate = path.join(TEMPLATES_PATH, 'generic-tld.html');
        if (fs.existsSync(genericTemplate)) {
          console.log(`⚠️  Template ${templateFile} not found, using generic-tld.html for ${subname.name}`);
          var template = fs.readFileSync(genericTemplate, 'utf8');
        } else {
          throw new Error(`No template found for ${subname.name}`);
        }
      } else {
        var template = fs.readFileSync(templatePath, 'utf8');
      }

      // Prepare data for template
      const templateData = {
        name: subname.name,
        fullName: subname.fullName,
        category: subname.category,
        purpose: subname.purpose,
        description: subname.description,
        notes: subname.notes,
        status: subname.status,
        contract: subname.contract,
        links: subname.links || {}
      };

      // Render template
      const html = renderTemplate(template, templateData);

      // Create output directory
      const outputPath = path.join(OUTPUT_PATH, subname.name, 'index.html');
      const outputDir = path.dirname(outputPath);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write HTML file
      fs.writeFileSync(outputPath, html, 'utf8');

      successCount++;
      console.log(`✅ Generated ${subname.name}.ucash.eth`);

    } catch (error) {
      errorCount++;
      const errorMsg = `Error generating ${subname.name}: ${error.message}`;
      errors.push(errorMsg);
      console.error(`❌ ${errorMsg}`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📈 Generation Summary');
  console.log('='.repeat(60));
  console.log(`✅ Successfully generated: ${successCount} sites`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📊 Total: ${subnames.length} sites`);
  console.log(`📁 Output directory: ${OUTPUT_PATH}`);
  console.log('='.repeat(60));

  if (errors.length > 0) {
    console.log('\n⚠️  Errors:');
    errors.forEach(err => console.log(`   ${err}`));
  }

  if (successCount > 0) {
    console.log('\n🎉 Success! You can now deploy the sites to IPFS.');
    console.log(`\nNext steps:`);
    console.log(`1. Review generated sites in: ${OUTPUT_PATH}`);
    console.log(`2. Run: npm run deploy`);
    console.log(`3. Or push to GitHub to trigger automated deployment\n`);
  }

  // Exit with error code if there were errors
  process.exit(errorCount > 0 ? 1 : 0);
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

// Run generation
generateAll().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
