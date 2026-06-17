const fs = require('fs');
const path = require('path');

const dir = 'src';

const replacements = {
  '1490481651871-ab68de25d43d': '1618005182384-a83a8bd57fbe',
  '1509631179647-0177331693ae': '1550684848-fac1c5b4e853',
  '1469334031218-e382a71b716b': '1558769132-cb1aea458c5e',
  '1539109136881-3be0616acf4b': '1574015974293-814fda234479',
  '1549298916-b41d501d3772': '1500462918059-b1a0cb512f1d',
  '1496747611176-843222e1e57c': '1550684376-ef3b2f5d0f1f',
  '1512436991641-6745cdb1723f': '1604014237800-1c9102c219da',
  '1485462537746-965f33f7f6a7': '1557672172221-78663f738c64',
  '1534528741775-53994a69daeb': '1618005182384-a83a8bd57fbe',
  '1507003211169-0a1dd7228f2d': '1550684848-fac1c5b4e853',
  '1524504388940-b1c1722653e1': '1558769132-cb1aea458c5e'
};

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;
      for (const [oldId, newId] of Object.entries(replacements)) {
        if (content.includes(oldId)) {
          content = content.split(oldId).join(newId);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + filePath);
      }
    }
  }
}

walkDir(dir);
