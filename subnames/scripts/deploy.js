const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

const SITES_PATH = path.join(__dirname, '../sites');
const CID_OUTPUT_PATH = path.join(__dirname, '../ipfs-cids.json');

// Pinata API configuration
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;

if (!PINATA_API_KEY || !PINATA_API_SECRET) {
  console.error('❌ Error: Pinata API credentials not found!');
  console.error('   Please set PINATA_API_KEY and PINATA_API_SECRET in your .env file');
  console.error('   Copy .env.example to .env and add your credentials');
  process.exit(1);
}

/**
 * Upload a single folder to Pinata/IPFS
 */
async function uploadFolderToPinata(folderPath, folderName) {
  const formData = new FormData();

  try {
    // Recursively add all files from the folder
    const addFiles = (dirPath) => {
      const files = fs.readdirSync(dirPath);

      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          addFiles(filePath);
        } else {
          // Create a path relative to the sites folder
          const relativePath = path.relative(SITES_PATH, filePath);
          formData.append('file', fs.createReadStream(filePath), {
            filepath: `${folderName}/${relativePath}`
          });
        }
      });
    };

    addFiles(folderPath);

    // Upload to Pinata
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_API_SECRET
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity
      }
    );

    return response.data.IpfsHash;

  } catch (error) {
    if (error.response) {
      throw new Error(`Pinata API error: ${error.response.status} - ${error.response.data?.error || error.response.statusText}`);
    }
    throw error;
  }
}

/**
 * Upload all sites to IPFS
 */
async function deployAllSites() {
  console.log('🚀 Starting IPFS deployment...\n');

  // Check if sites directory exists
  if (!fs.existsSync(SITES_PATH)) {
    console.error('❌ Error: Sites directory not found!');
    console.error(`   Please run: npm run generate`);
    console.error(`   To generate the sites first`);
    process.exit(1);
  }

  // Get all subname folders
  const folders = fs.readdirSync(SITES_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  if (folders.length === 0) {
    console.error('❌ Error: No sites found to deploy!');
    console.error(`   Please run: npm run generate`);
    process.exit(1);
  }

  console.log(`📊 Found ${folders.length} sites to deploy\n`);

  const cids = {};
  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  // Deploy each folder
  for (const folder of folders) {
    try {
      const folderPath = path.join(SITES_PATH, folder);
      console.log(`⬆️  Deploying ${folder}.ucash.eth...`);

      const cid = await uploadFolderToPinata(folderPath, folder);
      cids[folder] = cid;

      successCount++;
      console.log(`✅ ${folder}.ucash.eth → ${cid}`);
      console.log(`   Gateway: https://gateway.pinata.cloud/ipfs/${cid}\n`);

    } catch (error) {
      errorCount++;
      const errorMsg = `Error deploying ${folder}: ${error.message}`;
      errors.push(errorMsg);
      console.error(`❌ ${errorMsg}\n`);
    }
  }

  // Save CID mapping
  fs.writeFileSync(CID_OUTPUT_PATH, JSON.stringify(cids, null, 2));
  console.log(`💾 CID mapping saved to: ${CID_OUTPUT_PATH}\n`);

  // Summary
  console.log('='.repeat(60));
  console.log('📈 Deployment Summary');
  console.log('='.repeat(60));
  console.log(`✅ Successfully deployed: ${successCount} sites`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📊 Total: ${folders.length} sites`);
  console.log('='.repeat(60));

  if (successCount > 0) {
    console.log('\n🎉 Deployment complete!');
    console.log('\n📝 CID Mapping:');
    Object.entries(cids).forEach(([name, cid]) => {
      console.log(`   ${name}: ${cid}`);
    });

    console.log('\n🔗 Gateway URLs:');
    Object.entries(cids).forEach(([name, cid]) => {
      console.log(`   ${name}.ucash.eth: https://gateway.pinata.cloud/ipfs/${cid}`);
    });

    console.log('\n📌 Next steps:');
    console.log('1. Update ENS text records with the IPFS hashes');
    console.log('2. Configure ucash.onl wildcard DNS');
    console.log('3. Test gateway access\n');
  }

  if (errors.length > 0) {
    console.log('\n⚠️  Errors:');
    errors.forEach(err => console.log(`   ${err}`));
  }

  process.exit(errorCount > 0 ? 1 : 0);
}

/**
 * Deploy a single site by name
 */
async function deploySingleSite(siteName) {
  const sitePath = path.join(SITES_PATH, siteName);

  if (!fs.existsSync(sitePath)) {
    console.error(`❌ Error: Site "${siteName}" not found!`);
    console.error(`   Available sites:`);
    const sites = fs.readdirSync(SITES_PATH);
    sites.forEach(site => console.error(`   - ${site}`));
    process.exit(1);
  }

  console.log(`🚀 Deploying ${siteName}.ucash.eth...\n`);

  try {
    const cid = await uploadFolderToPinata(sitePath, siteName);
    console.log(`✅ ${siteName}.ucash.eth → ${cid}`);
    console.log(`   Gateway: https://gateway.pinata.cloud/ipfs/${cid}\n`);

    // Update CID mapping file
    let cids = {};
    if (fs.existsSync(CID_OUTPUT_PATH)) {
      cids = JSON.parse(fs.readFileSync(CID_OUTPUT_PATH, 'utf8'));
    }
    cids[siteName] = cid;
    fs.writeFileSync(CID_OUTPUT_PATH, JSON.stringify(cids, null, 2));

    console.log('✅ Deployment successful!\n');
    process.exit(0);

  } catch (error) {
    console.error(`❌ Error deploying ${siteName}:`, error.message);
    process.exit(1);
  }
}

// CLI interface
const args = process.argv.slice(2);

if (args.length > 0 && args[0] === '--single') {
  const siteName = args[1];
  if (!siteName) {
    console.error('❌ Error: Please specify a site name');
    console.error('   Usage: npm run deploy -- --single <site-name>');
    process.exit(1);
  }
  deploySingleSite(siteName);
} else {
  deployAllSites();
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
