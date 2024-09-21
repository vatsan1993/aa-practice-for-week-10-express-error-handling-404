const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('GET / This is the root URL');
});

app.get('*', (req, res, next) => {
  let err = new Error("Sorry, the requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

let catchAll = (err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).json({
      message: err.message,
      statusCode: err.status || 500,
    });
  }
};
app.use(catchAll);
const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
