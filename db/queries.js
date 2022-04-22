const db = require('./index.js');

exports.getAllReviewsForProduct = (productID) => {
  const query = `
  SELECT reviews.id AS review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.weird_date, reviews.reviewer_name, reviews.helpfulness, (array(
    SELECT row_to_json(t)
    FROM (
      SELECT photos.id, photo_url AS url
      FROM photos
      INNER JOIN reviews
      ON reviews.id = photos.review_id
      WHERE reviews.product_id = $1
    ) t
  ))
    AS photos
  FROM reviews
  WHERE reviews.product_id = $1;`
  return db.query(query, [productID])
}
