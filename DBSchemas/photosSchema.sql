DROP TABLE IF EXISTS Photos;

CREATE TABLE Photos (
  id INT PRIMARY KEY,
  review_id INT,
  photo_url VARCHAR (250),
  FOREIGN KEY (review_id) REFERENCES Reviews (id)

);