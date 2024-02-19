const express = require('express');
const app = express();

function positiveIntegerHandler(req, res, next) {
  const number = parseInt(req.query.number);

  if(Number.isInteger(number) && number > 0){
    res.status(200).json({ message: 'Success: Number is a positive integer.' });
  } 
  else{
    const error = new Error('Invalid number: Please provide a positive integer.');
    error.status = 400;
    next(error);
  }
}

function errorHandler(err, req, res, next) {
  if(err.status === 400){
    res.status(400).json({ error: err.message });
  } 
  else{
    next(err);
  }
}

app.get('/positive', positiveIntegerHandler);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
