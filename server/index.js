const express = require('express');
const app = express();
const port = process.env.PORT || 1337;
const query = require('../db/queries.js');

app.use('/', (req, res, next) => {
  console.log(`${req.method} at ${req.url}`);
  next();
});

app.get('/reviews', (req, res) => {
  let responseBody = req.query;
  console.log(responseBody)
  query.getAllReviewsForProduct(Number(req.query.product_id))
  .then(result => {
    responseBody.results = result.rows
    res.send(responseBody);
  })
  .catch(err => res.send(err));
})

app.listen(port, () => {
  console.log(`kieran is the coolest and has a server listening on port ${port}`)
})

