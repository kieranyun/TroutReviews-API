CREATE TABLE opt_reviews (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT,
  date TIMESTAMP,
  summary VARCHAR,
  body VARCHAR,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR,
  helpfulness INT,
  photos JSONB,
  characteristics JSONB,
  FOREIGN KEY (product_id) REFERENCES Products (id)
);

SELECT old_reviews.id AS review_id, old_reviews.product_id, old_reviews.rating, old_reviews.date, old_reviews.summary, old_reviews.body, old_reviews.recommend, old_reviews.reported, old_reviews.reviewer_name, old_reviews.reviewer_email, old_reviews.response, old_reviews.helpfulness,
  ARRAY_AGG( json_build_object(
    'id', photos.id,
    'url', photos.photo_url))
  AS photos,

  JSONB_OBJECT_AGG(
    characteristics.name, json_build_object(
      'id', characteristicsReviews.characteristic_id,
      'value', characteristicsReviews.value
    ))
  AS characteristics

  INTO opt_reviews

  FROM old_reviews
  INNER JOIN photos
  ON old_reviews.id = photos.review_id
  INNER JOIN characteristicsReviews
  ON old_reviews.id = characteristicsReviews.review_id
  INNER JOIN characteristics
  ON characteristics.id = characteristicsReviews.characteristic_id
  GROUP BY old_reviews.id

  -- get avgerage functon

CREATE OR REPLACE FUNCTION get_avg (product INT)
RETURNS FLOAT as $$
  SELECT
  AVG(substring(value::text, 2, 1)::FLOAT)
  FROM opt_reviews
  CROSS JOIN LATERAL (
    SELECT (characteristics -> jsonb_object_keys(characteristics) ->> 'value')
    FROM opt_reviews
    WHERE product_id = product
  ) AS value
  WHERE product_id = product;
$$ LANGUAGE sql;
