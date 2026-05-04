const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/subnames.json');

const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

const missing = [
  { name: 'demo', category: 'core', purpose: 'Demo site' },
  { name: 'code', category: 'core', purpose: 'Code repository' },
  { name: 'whitepaper', category: 'core', purpose: 'Whitepaper docs' },
  { name: 'management', category: 'core', purpose: 'Management interface' },
  { name: 'proxy', category: 'core', purpose: 'Proxy services' },
  { name: 'view', category: 'core', purpose: 'View interface' },
  { name: 'create', category: 'core', purpose: 'Creation interface' },
  { name: 'layer', category: 'core', purpose: 'Layer services' },
  { name: 'space', category: 'core', purpose: 'Space ID integration' },
  { name: 'web', category: 'core', purpose: 'Web services' },
  { name: '_', category: 'core', purpose: 'Wildcard services' },
  { name: '$', category: 'core', purpose: 'Financial services' },
  { name: 'delegates', category: 'defi', purpose: 'Governance delegates' },
  { name: 'delegate', category: 'defi', purpose: 'Single delegate' },
  { name: 'delegation', category: 'defi', purpose: 'Delegation services' },
  { name: 'proposals', category: 'defi', purpose: 'Governance proposals' },
  { name: 'proposal', category: 'defi', purpose: 'Single proposal' },
  { name: 'aragon', category: 'defi', purpose: 'Aragon DAO' },
  { name: 'badges', category: 'defi', purpose: 'NFT badges' },
  { name: 'loyalty', category: 'defi', purpose: 'Loyalty program' },
  { name: 'access', category: 'defi', purpose: 'Access control' },
  { name: 'rewards', category: 'defi', purpose: 'Reward distribution' },
  { name: 'receipt', category: 'defi', purpose: 'Transaction receipts' },
  { name: 'order', category: 'defi', purpose: 'Order management' },
  { name: 'coupons', category: 'defi', purpose: 'Coupon management' },
  { name: 'uip', category: 'defi', purpose: 'UCASH Improvement Proposals' },
  { name: 'urc', category: 'defi', purpose: 'UCASH Request for Comments' },
  { name: 'multisig', category: 'defi', purpose: 'Multisig wallet' },
  { name: 'tree', category: 'defi', purpose: 'Merkle tree' },
  { name: 'smart', category: 'defi', purpose: 'Smart contracts' },
  { name: 'wns', category: 'tools', purpose: 'Web3 Naming Service' },
  { name: 'uid', category: 'tools', purpose: 'Unique ID' },
  { name: 'sid', category: 'tools', purpose: 'Space ID' },
  { name: 'cns', category: 'tools', purpose: 'Crypto Naming Service' },
  { name: 'sns', category: 'tools', purpose: 'Solana Naming Service' },
  { name: 'tns', category: 'tools', purpose: 'TAO Naming Service' },
  { name: 'register', category: 'tools', purpose: 'Registration' },
  { name: 'registrar', category: 'tools', purpose: 'Registrar services' },
  { name: 'refer', category: 'tools', purpose: 'Referral program' },
  { name: 'referrer', category: 'tools', purpose: 'Referrer dashboard' },
  { name: 'referral', category: 'tools', purpose: 'Referral tracking' },
  { name: 'infra', category: 'tools', purpose: 'Infrastructure ops' },
  { name: 'label', category: 'tools', purpose: 'Label services' },
  { name: 'wei', category: 'tools', purpose: 'WeiNS' },
  { name: 'robot', category: 'tools', purpose: 'Robot/Automation' },
  { name: 'onchain', category: 'tools', purpose: 'On-chain data' },
  { name: 'agi', category: 'tools', purpose: 'AI/AGI services' },
  { name: 'legacy', category: 'tools', purpose: 'Legacy systems' },
  { name: 'tunnel', category: 'tools', purpose: 'Tunnel services' },
  { name: 'sync', category: 'tools', purpose: 'Sync services' },
  { name: 'lab', category: 'tools', purpose: 'Development lab' },
  { name: 'infrastructure', category: 'tools', purpose: 'Infrastructure management' },
  { name: 'cold', category: 'tools', purpose: 'Cold storage' },
  { name: 'launch', category: 'tools', purpose: 'Launchpad' },
  { name: 'warm', category: 'tools', purpose: 'Warm storage' },
  { name: 'hot', category: 'tools', purpose: 'Hot wallet' },
  { name: 'lightning', category: 'tools', purpose: 'Lightning network' },
  { name: 'anchor', category: 'tools', purpose: 'Anchor services' },
  { name: 'zones', category: 'tools', purpose: 'Zone management' },
  { name: 'one', category: 'brand', purpose: 'One' },
  { name: 'now', category: 'brand', purpose: 'Now' },
  { name: 'new', category: 'brand', purpose: 'New' }
];

const templates = {
  core: 'core',
  defi: 'defi',
  tools: 'tools',
  brand: 'brand',
  networks: 'networks',
  storage: 'storage',
  emoji: 'emoji',
  geographic: 'geographic'
};

let addedCount = 0;
for (const item of missing) {
  const fullName = `${item.name}.ucash.eth`;
  const existing = data.subnames.find(s => s.name === item.name);
  if (!existing) {
    data.subnames.push({
      name: item.name,
      fullName: fullName,
      category: item.category,
      template: templates[item.category] || 'core',
      purpose: item.purpose,
      description: `${item.purpose} for UCASH`,
      notes: item.purpose,
      status: 'development',
      contract: null,
      links: {}
    });
    addedCount++;
  }
}

// Update category counts
data.categories.core.count = data.subnames.filter(s => s.category === 'core').length;
data.categories.defi.count = data.subnames.filter(s => s.category === 'defi').length;
data.categories.tools.count = data.subnames.filter(s => s.category === 'tools').length;
data.categories.brand.count = data.subnames.filter(s => s.category === 'brand').length;
data.categories.emoji.count = data.subnames.filter(s => s.category === 'emoji').length;
data.categories.geographic.count = data.subnames.filter(s => s.category === 'geographic').length;
data.categories.networks.count = data.subnames.filter(s => s.category === 'networks').length;
data.categories.storage.count = data.subnames.filter(s => s.category === 'storage').length;

console.log(`✅ Added ${addedCount} new subdomains`);
console.log(`📊 Total subdomains: ${data.subnames.length}`);
console.log('\nCategory breakdown:');
console.log(`  Core: ${data.categories.core.count}`);
console.log(`  DeFi: ${data.categories.defi.count}`);
console.log(`  Tools: ${data.categories.tools.count}`);
console.log(`  Brand: ${data.categories.brand.count}`);
console.log(`  Emoji: ${data.categories.emoji.count}`);
console.log(`  Geographic: ${data.categories.geographic.count}`);
console.log(`  Networks: ${data.categories.networks.count}`);
console.log(`  Storage: ${data.categories.storage.count}`);

fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
console.log('\n✅ Updated subnames/data/subnames.json');
