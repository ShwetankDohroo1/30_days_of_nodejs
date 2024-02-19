const path = require('path');

function resolvePath(relativePath){
    const absolutePath = path.resolve(__dirname, relativePath);

    console.log("Resolved Path:", absolutePath);
}
// Test cases
resolvePath('NodeJS_daily/test-files/file.txt');
resolvePath('nonexistent-folder/file.txt');
