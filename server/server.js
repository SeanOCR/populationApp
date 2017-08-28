const express = require('express');
const app = express();
const path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/../public/index.html'));
});

app.listen(3000, function () {
  console.log('Population app listening on port 3000!');
});

app.use(express.static(path.join(__dirname, '/../public')));