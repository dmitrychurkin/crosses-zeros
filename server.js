const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'build')));
app.use(favicon(path.join(__dirname,'','build', 'favicon.ico')));

app.get('/*', (req, res) => {
  if (req.path !== '/') {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));