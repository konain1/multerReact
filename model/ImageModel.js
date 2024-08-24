
const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    image:{
        type:String
    }
})

const ImageModel = mongoose.model('ImageModel' , ImageSchema)

module.exports = ImageModel