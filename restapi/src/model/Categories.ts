const mongoose = require('mongoose')

const CategoriesShema = new mongoose.Schema(
    {
        catergorias: {
            type: [String], 
            required: true
        }
    }, 
    { collection: 'Categories' }
)

export const categoriesModel = mongoose.model('Categories', CategoriesShema)