const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    score : {
        type: Number, 
        index: true, 
        required: true,
        min: 0,
        max: 10
    },
    comment : {
        type: String,
        required: true
    },
    authorEmail: {
        type: String,
        required: true,
        trim: true
    }, 
    productCode: {
        type: String,
        required: true,
        trim: true
    }
    },
    {collection:'Review'});

// Para establecer cardinalidad
ReviewSchema.index({authorEmail: 1, productCode: 1}, {unique: true})

export const reviewModel = mongoose.model('Review',ReviewSchema,'Review');
