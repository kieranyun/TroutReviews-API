/* eslint-disable camelcase */
const db = require('./index');

exports.getAllReviewsForProduct = (productID, count, offset) => {
  const query = `
    SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos[1], characteristics
    FROM opt_reviews
    WHERE product_id = $1 AND reported = false
    LIMIT $2 OFFSET $3`;
  return db.query(query, [productID, count, offset]);
};

exports.getMeta = (productID) => {
  const query = `
  SELECT distinct on (product_id)
      product_id,

      JSON_BUILD_OBJECT(
        '1',
        (SELECT COUNT(rating)
        FROM opt_reviews
        WHERE product_id = $1 AND rating = 1),
        '2',
        (SELECT COUNT(rating)
        FROM opt_reviews
        WHERE product_id = $1 AND rating = 2),
        '3',
        (SELECT COUNT(rating)
        FROM opt_reviews
        WHERE product_id = $1 AND rating = 3),
        '4',
        (SELECT COUNT(rating)
        FROM opt_reviews
        WHERE product_id = $1 AND rating = 4),
        '5',
        (SELECT COUNT(rating)
        FROM opt_reviews
        WHERE product_id = $1 AND rating = 5)
      ) AS ratings,

      JSON_BUILD_OBJECT(
        'false',
        (SELECT COUNT(recommend)
        FROM opt_reviews
        WHERE product_id = $1 AND recommend = false),
        'true',
        (SELECT COUNT(recommend)
        FROM opt_reviews
        WHERE product_id = $1 AND recommend = true)
      ) AS recommended,

      (SELECT
        (JSONB_OBJECT_AGG(
          characteristics.name,
          charaavg
        ))
      FROM metacharacteristics
      INNER JOIN characteristics
      ON characteristics.product_id = metacharacteristics.product_id
      WHERE characteristics.product_id = $1
      GROUP BY characteristics.product_id
      ) as characteristics

  FROM opt_reviews
  WHERE product_id = $1
  GROUP BY product_id, characteristics, jsonb_object_keys(characteristics),review_id
  ORDER BY product_id`;
  return db.query(query, [productID]);
};

exports.post = (data, time) => {
  const {
    product_id, rating, summary, body, recommend, name, email, photos, characteristics,
  } = data;
  const query = `
    INSERT INTO opt_reviews (
      product_id, rating, summary, body, recommend, reviewer_name, reviewer_email, photos, characteristics, date
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
    )`;
  return db.query(query, [
    product_id, rating, summary, body, recommend, name, email, photos, characteristics, time,
  ]);
};

exports.updateHelpful = (productID) => {
  const query = `
  UPDATE opt_reviews
  SET helpfulness = helpfulness + 1
  WHERE product_id = $1`;
  return db.query(query, [productID]);
};

exports.updateReported = (productID) => {
  const query = `
  UPDATE opt_reviews
  SET reported = true
  WHERE product_id = $1`;
  return db.query(query, [productID]);
};
