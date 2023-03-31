const mongoose = require('mongoose');
const Product = require('./Product');

const FavoriteSchema = new mongoose.Schema({
    items:[{
        type:String
    }]
})

module.exports = mongoose.model('Favorite', FavoriteSchema)