/* eslint-disable camelcase */
/* eslint-disable no-console */
const express = require('express');

const app = express();
const port = process.env.PORT || 1337;
const query = require('../db/queries');

app.use('/', (req, res, next) => {
  console.log(`${req.method} at ${req.url}`);
  next();
});

app.use(express.json());

app.get('/reviews/meta', (req, res) => {
  query.getMeta(Number(req.query.product_id))
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => res.send(err));
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  const { review_id } = req.params;
  query.updateHelpful(review_id)
    .then(() => {
      res.status(204);
    })
    .catch((err) => res.send(err));
});

app.put('/reviews/:review_id/report', (req, res) => {
  const { review_id } = req.params;
  query.updateReported(review_id)
    .then(() => {
      res.status(204);
    })
    .catch((err) => res.send(err));
});

app.get('/reviews', (req, res) => {
  const { product_id, page = 1, count = 5 } = req.query;
  const offset = (Number(page) - 1) * Number(count);
  query.getAllReviewsForProduct(Number(product_id), count, offset)
    .then((result) => {
      const response = { product_id, page, count };
      response.results = result.rows;
      res.send(response);
    })
    .catch((err) => res.send(err));
});

app.post('/reviews', (req, res) => {
  const time = new Date();
  query.post(req.body, time)
    .then(() => {
      res.status(201).send('created');
    })
    .catch((err) => res.send(err));
});

app.listen(port, () => {
  console.log(`kieran is the coolest and has a server listening on port ${port}`);
});
