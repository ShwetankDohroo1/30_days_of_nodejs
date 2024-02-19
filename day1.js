const fs = require('fs');

function readFileContent(filePath){
    let file = fs.readFileSync(filePath)
    console.log(''+file)
}
readFileContent('C://Users//shwet//OneDrive//Desktop//New folder//FULL//nodejs//NodeJS_daily//test-files//file1.txt');
readFileContent('C:/Users/shwet/OneDrive/Desktop/New folder/FULL/nodejs/NodeJS_daily/test-files/empty-file.txt');
readFileContent('./test-files/nonexistent-file.txt');
