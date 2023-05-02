const mongoose =require('mongoose')
mongoose.connect('mongodb+srv://akshayakalluvalappil4:akshayakalluvalappil4@cluster0.vfdbl9t.mongodb.net/Asset?retryWrites=true&w=majority')

const schema = mongoose.Schema

const gallerySchema = new schema({
    Image:{type:String}

})

const gallerymodel = mongoose.model('gallery_tb',gallerySchema)

module.exports = gallerymodel