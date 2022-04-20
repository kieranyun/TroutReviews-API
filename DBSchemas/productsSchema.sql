DROP TABLE if EXISTS Products;

CREATE TABLE Products (
  id int PRIMARY KEY,
  name varchar (60),
  slogan varchar (250),
  description varchar (250),
  category varchar (60),
  default_price int
);