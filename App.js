const express = require('express')
var mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()


const Category = require('./src/routes/Category')
const AssetRouter = require('./src/routes/AssetRouter')
const Allocation = require('./src/routes/Allocation')
const ImageRouter = require('./src/routes/ImageRouter')
const ComplaintRouter = require('./src/routes/ComplaintRouter')
const SuggestionRouter = require('./src/routes/SuggestionRouter')
const ProfileRouter = require('./src/routes/ProfileRouter')
const OtherAllocationRouter = require('./src/routes/OtherAllocationRouter')
const categorymodel = require('./src/models/Categorytbl')
const assetmodel = require('./src/models/Assettbl')
const StaffRegisterRouter = require('./src/routes/StaffRegistrationRouter')
const registerRouter = require('./src/routes/api/registerRouter')
const signinRouter = require('./src/routes/api/signinRouter')
const complaintRouter = require('./src/routes/api/complaintRouter')
const suggestionRouter = require('./src/routes/api/suggestionRouter')



app.use(express.static('./public'))
app.set('view engine','ejs')
app.set('views','./src/views')
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader( 
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });


app.use('/category',Category)
app.use('/asset',AssetRouter)
app.use('/allocation',Allocation)
app.use('/otheralloction',OtherAllocationRouter)
app.use('/image',ImageRouter)
app.use('/complaint',ComplaintRouter)
app.use('/suggestion',SuggestionRouter)
app.use('/profile',ProfileRouter)
app.use('/staffreg',StaffRegisterRouter)


app.use('/api/register/',registerRouter)
app.use('/api/login/',signinRouter)
app.use('/api/complaint/',complaintRouter)
app.use('/api/suggestion/',suggestionRouter)






app.get('/viewasset', async function(req,res){
  try {
      const  data = await assetmodel.aggregate([
          {
            '$lookup': {
              'from': 'category_tbs', 
              'localField': 'category_id', 
              'foreignField': '_id', 
              'as': 'category'
            }
          },
          {
              '$unwind' : '$category'
          },
          {
              '$group' :
              {
                  '_id': '$_id',
                  'assetname':{'$first':'$assetname'} ,
                  'purchasedate':{'$first':'$purchasedate'} ,
                  'Receipt':{'$first':'$Receipt'} ,
                  'totalquantity':{'$first':'$totalquantity'} ,
                  'cost':{'$first':'$cost'} ,
                  'image':{'$first':'$image'} ,

                  'categoryname':{'$first':'$category.categoryname'} ,
              }
          }



        ])

// res.json({data:data})
      res.render('ViewAsset',{data})
      
  } catch (error) {
      console.log('categoryname');
  }
  
})


app.get('/viewotherallocation', async function(req,res){
  try {
      const data = await allocationothermodel.aggregate(
          [
              {
                  '$lookup': {
                      'from': 'asset_tbs', 
                      'localField': 'asset_id', 
                      'foreignField': '_id', 
                      'as': 'assets'
                  }
              },
         
          {
              '$unwind' : '$assets'
          },
          {
              '$group' :
          {               
               '_id': '$_id',
               'other':{'$first':'$other'} ,
               'Roomnumber':{'$first':'$Roomnumber'} ,
               'allottedquantity':{'$first':'$allottedquantity'} ,
               'Image':{'$first':'$Image'} ,
               'assetname':{'$first':'$assets.assetname' },


          }
      }
  ])   
      res.render('ViewOtherAllocation',{data})
  } catch (error) {
    console.log('assetname');

  }
})


app.get('/',  (req, res) =>{
  res.render('dashboard')
})


const MONGODB_URL=
"mongodb+srv://maneeshmaitexa:maneeshmaitexa@cluster0.fv75o1k.mongodb.net/AssetDb?retryWrites=true&w=majority"


const port=2000;

mongoose.connect(MONGODB_URL).then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port http://localhost:2000/admin`);
    })
}).catch((error)=>{
    console.log(` ${error} did not connect`); 
})