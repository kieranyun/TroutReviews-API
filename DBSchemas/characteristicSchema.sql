DROP TABLE IF EXISTS Characteristics;

CREATE TABLE Characteristics (
  id INT PRIMARY KEY,
  product_id INT,
  name varchar,
  FOREIGN KEY (product_id) REFERENCES Products (id)
);