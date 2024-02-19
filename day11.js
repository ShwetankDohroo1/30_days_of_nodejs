const express = require('express');
const jwt = require('jsonwebtoken'); 
const path = require('path');
const app = express();

const secretKey = "yourSecretKey";

function authenticationMiddleware(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Token is not provided" });
  }
  try {
    const decodeToken = jwt.verify(token, secretKey);
    req.user = decodeToken;
    next();
  } catch (error) {
    console.error('Error in token verification', error);
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.use(express.json());
app.get('/', (req, res) => {
  const token = jwt.sign({}, secretKey);
  res.send(`welcome to authentication middleware ${token}`);
});
app.post('/login', authenticationMiddleware, (req, res) => {
  res.json({ message: "login successful" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
