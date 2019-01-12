const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/static', express.static(path.join(__dirname, 'build', 'static')));

app.get('/*', (req, res) => {
  if (req.path !== '/') {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));