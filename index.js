const express = require('express');
const app = express();
const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`kieran is the coolest and has a server listening on port ${port}`)
})

mongoose.connect('mongodb://localhost:1337/reviews').
  catch(error => console.log(error));