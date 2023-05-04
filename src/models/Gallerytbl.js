const mongoose =require('mongoose')


const schema = mongoose.Schema

const gallerySchema = new schema({
    Image:{type:String}

})

const gallerymodel = mongoose.model('gallery_tb',gallerySchema)

module.exports = gallerymodel