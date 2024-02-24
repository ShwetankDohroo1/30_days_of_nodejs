const express = require('express');
const app = express();
const averageAgeOfUsers = require('./user');

app.get('/average-age', averageAgeOfUsers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
