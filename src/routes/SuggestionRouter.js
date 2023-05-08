const express = require('express')
const suggestionmodel = require('../models/SuggestionData')
const SuggestionRouter = express.Router()

SuggestionRouter.use(express.static('./public'))


SuggestionRouter.get('/viewsttudentsuggestion',async(req,res)=>{
    try {
        const allData = await suggestionmodel.find();
        res.render('viewstdsuggestion',{allData})
    } catch (error) {
        
    }

})




module.exports=SuggestionRouter