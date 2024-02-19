const express = require('express');
const cachingMiddleware = require('./cachingMiddleware');

const app = express();  

app.use(cachingMiddleware);

app.get('/test', (req, res) => {
  console.log('Received request');
  res.send('Response from server');
});

setTimeout(() => {
  console.log('\nTest Case 1:');
  makeRequest('/test');
  setTimeout(() => {
    makeRequest('/test');
  }, 2000);
}, 1000);

setTimeout(() => {
  console.log('\nTest Case 2:');
  makeRequest('/test');
  setTimeout(() => {
    makeRequest('/test');
  }, 60000);
}, 20000); 

function makeRequest(url) {
  const http = require('http');
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: url,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`Response status code: ${res.statusCode}`);
    res.on('data', (data) => {
      console.log(`Response data: ${data.toString()}`);
    });
  });

  req.on('error', (error) => {
    console.error(`Error making request: ${error.message}`);
  });

  req.end();
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
