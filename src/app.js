const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World! we will do greate work with this project');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});