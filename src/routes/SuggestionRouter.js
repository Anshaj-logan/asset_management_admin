const express = require('express')
const SuggestionRouter = express.Router()
SuggestionRouter.use(express.static('./public'))


SuggestionRouter.get('/viewstaffsuggestion',(req,res)=>{
    res.render('viewstaffsuggestion')
})


SuggestionRouter.get('/viewsttudentsuggestion',(req,res)=>{
    res.render('viewstdsuggestion')
})



module.exports=SuggestionRouter