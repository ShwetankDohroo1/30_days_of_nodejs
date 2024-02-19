function greetHandler(req, res){
    const name = req.query.name;
    if(name){
        res.send(`Hello, ${name}!`);
    } 
    else{
        res.send('Hello, Guest!');
    }
}
const express = require('express');
const app = express();

app.get('/greet?name = Shwetank', greetHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
