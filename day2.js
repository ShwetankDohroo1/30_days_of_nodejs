const fs = require('fs');



function writeToFile(filePath, content){
    fs.writeFile(filePath, content, (a) => {
        if(a){
            console.error(`Error writing to file: ${a}`);
        } 
        else{
            console.log(`Data written to ${filePath}`);
        }
    });
}
writeToFile('NodeJS_daily/test-files/output1.txt', 'Sample content.');
writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');
