const express = require('express')
const categorymodel = require('../models/Categorytbl')
const Category = express.Router()
Category.use(express.static('./public'))


Category.get('/addcategory', function (req, res) {
    res.render('Addcategory')
})

Category.get('/viewcategory', async function (req, res) {
    try {
        const data = await categorymodel.find()
        console.log(data);
        res.render('ViewCategory', { data })
    } catch (error) {

    }

})

Category.post('/category-name', function (req, res) {
    const data = {
        categoryname: req.body.category_name
    }

    categorymodel(data).save().then((data) => {
        res.redirect('/category/viewcategory')
    })
})

Category.get('/delete-category/:id', function (req, res) {
    const id = req.params.id
    categorymodel.deleteOne({_id:id}).then((data) => {
        res.redirect('/category/viewcategory')
    })
})



module.exports = Category