DROP TABLE IF EXISTS Reviews
CASCADE;

CREATE TABLE Reviews (
  id INT NOT NULL PRIMARY KEY,
  product_id INT,
  rating INT,
  weird_date BIGINT,
  summary VARCHAR,
  body VARCHAR,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR,
  helpfulness INT,
  FOREIGN KEY (product_id) REFERENCES Products (id)
);