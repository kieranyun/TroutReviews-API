DROP TABLE IF EXISTS CharacteristicsReviews;

CREATE TABLE CharacteristicsReviews (
  id INT PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  value INT,
  FOREIGN KEY (characteristic_id) REFERENCES Characteristics (id),
  FOREIGN KEY (review_id) REFERENCES Reviews (id)
);