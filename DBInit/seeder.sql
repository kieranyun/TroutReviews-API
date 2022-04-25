\COPY Products
FROM '/Users/kieranyun/Documents/HR/SDC/Reviews-API/rawData/product.csv' DELIMITER ','
CSV HEADER;

\COPY Reviews
FROM '/Users/kieranyun/Documents/HR/SDC/Reviews-API/rawData/reviews.csv'
PROGRAM ''
DELIMITER ','
CSV HEADER;

\COPY Photos
FROM '/Users/kieranyun/Documents/HR/SDC/Reviews-API/rawData/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

\COPY Characteristics
FROM '/Users/kieranyun/Documents/HR/SDC/Reviews-API/rawData/characteristics.csv'
DELIMITER ','
CSV HEADER;

\COPY CharacteristicsReviews
FROM '/Users/kieranyun/Documents/HR/SDC/Reviews-API/rawData/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;
