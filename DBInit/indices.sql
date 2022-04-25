CREATE INDEX products_id_idx ON Products (id);
CREATE INDEX reviews_product_id_idx ON reviews (product_id);
CREATE INDEX characteristics_product_id_idx ON Characteristics (product_id);
CREATE INDEX characteristicsReviews_review_id_idx ON CharacteristicsReviews (review_id);
CREATE INDEX photos_review_id_idx ON Photos (review_id);