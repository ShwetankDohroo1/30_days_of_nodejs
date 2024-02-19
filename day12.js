const express = require('express');
const app = express();

const rateLimitConfig = {
  windowMs: 60000, 
  maxRequests: 5, 
  message: 'Too many requests, please try again later.',
};

function initializeRateLimit() {
  const rateLimit = require('express-rate-limit');
  return rateLimit(rateLimitConfig);
}

app.use(initializeRateLimit());

app.get('/', (req, res) => {
  res.send('You have successfully reached the endpoint.');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Opening server at http://localhost:${PORT}`);
});

const { exec } = require('child_process');
exec(`start http://localhost:${PORT}`, (error, stdout, stderr) => {
  if(error){
    console.error(`Error opening browser: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});


