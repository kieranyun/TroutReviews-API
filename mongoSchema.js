import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
    "rating": Int,
    "summary": String,
    "recommend": Bool,
    "response": String,
    "body": String,
    "date": date,
    "reviewer_name": String,
    "helpfulness": Int,
    "photos": [{
        "id": Int,
        "url": String
      }
     ]
     "Reported": Bool,
     "Helpfulness": Int,
     "width": Int,
     "size": Int,
     "comfort": Int,
     "fit": Int,
     "quality": Int
})

const Review = mongoose.model('Review', reviewSchema);

export default Review;