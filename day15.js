const express = require('express');
const loggingMiddleware = require('./loggingMiddleware');

const app = express();

app.use(loggingMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
