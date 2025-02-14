# Reviews-API

This is an API microservice that delivers reviews data for a catalog of products. This API handles get requests for all reviews of a product (paginated and sorted) as well as aggregate review data for a product (ie an overall rating) and also handles posts of new reviews. The database is PostgreSQL, all queries run in an average of 20 ms. The server layer is made with node.js and express. It is designed to be easily scalable through multiple AWS EC2 instances. While this project was deployed, it was on 7 EC2 instances; one instance was a reverse-proxy server made with NGINX, that distributed traffic across 5 Express servers that queried the Postgres database. This setup was able to handle 3,000 requests per second with an average response time of 80 ms and a 0% error rate. 

## Technologies Used

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
