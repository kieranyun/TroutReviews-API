DROP TABLE if EXISTS Products;
CREATE TABLE Products (
  id int PRIMARY KEY,
  name varchar (60),
  slogan varchar (250),
  description varchar (250),
  category varchar (60),
  default_price int
);


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

DROP TABLE IF EXISTS Photos;
CREATE TABLE Photos (
  id INT PRIMARY KEY,
  review_id INT,
  photo_url VARCHAR (250),
  FOREIGN KEY (review_id) REFERENCES Reviews (id)

);

DROP TABLE IF EXISTS Characteristics;
CREATE TABLE Characteristics (
  id INT PRIMARY KEY,
  product_id INT,
  name varchar,
  FOREIGN KEY (product_id) REFERENCES Products (id)
);

DROP TABLE IF EXISTS CharacteristicsReviews;
CREATE TABLE CharacteristicsReviews (
  id INT PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  value INT,
  FOREIGN KEY (characteristic_id) REFERENCES Characteristics (id),
  FOREIGN KEY (review_id) REFERENCES Reviews (id)
);



