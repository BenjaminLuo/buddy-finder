const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/components');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync(directoryPath).filter(f => f.endsWith('.js'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // If it's importing makeStyles directly from @mui/material/styles
  if (content.includes("from '@mui/material/styles'")) {
      content = content.replace(/from '@mui\/material\/styles'/g, "from '@mui/styles'");
  }
  
  // If makeStyles is imported alongside other things from @mui/material
  if (content.includes("from '@mui/material'")) {
    const importRegex = /import\s+\{([^}]*)\}\s+from\s+['"]@mui\/material['"];/g;
    content = content.replace(importRegex, (match, imports) => {
      if (imports.includes('makeStyles')) {
        const otherImports = imports.replace(/makeStyles,?/g, '').replace(/,\s*,/g, ',').replace(/(^\s*,)|(,\s*$)/g, '').trim();
        let newImport = `import { makeStyles } from '@mui/styles';
`;
        if (otherImports.length > 0) {
           newImport += `import { ${otherImports} } from '@mui/material';`;
        }
        return newImport;
      }
      return match;
    });
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed:', file);
  }
});
