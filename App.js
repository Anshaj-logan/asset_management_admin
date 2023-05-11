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
const allocationclsmodel = require('./src/models/Allocationtblcls')
const allocationmodelother = require('./src/models/Allocationtblothers')
const StaffRegisterRouter = require('./src/routes/StaffRegistrationRouter')
const registerRouter = require('./src/routes/api/registerRouter')
const signinRouter = require('./src/routes/api/signinRouter')
const complaintRouter = require('./src/routes/api/complaintRouter')
const suggestionRouter = require('./src/routes/api/suggestionRouter')
const allocationRouter = require('./src/routes/api/allocationRouter')




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
app.use('/api/allocation/',allocationRouter)



app.get('/viewreport', async function(req,res){
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
        const totalCost = data.reduce((sum, obj) => sum + parseInt(obj.cost), 0);
console.log(totalCost);

// res.json({data:data})
      res.render('ViewReport',{data,totalCost})
      
  } catch (error) {
      console.log('categoryname');
  }
  
})


app.get('/viewasset', async function(req,res){
  try {
      const  data1 = await assetmodel.aggregate([
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

        const data = data1.map(item => {
          return {
            image:item.image,
            Receipt:item.Receipt,
            _id:item._id,
            assetname:item.assetname,
            purchasedate:item.purchasedate,
            totalquantity:item.totalquantity,
            cost:item.cost,
            categoryname:item.categoryname,

          }
        });

// res.json({data:data})
      res.render('ViewAsset',{data})
      
  } catch (error) {
      console.log('categoryname');
  }
  
})


app.get('/viewotherallocation', async function(req,res){
  try {
      const data = await allocationmodelother.aggregate(
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


app.get('/viewallocation', async function(req,res){
  try {
      const data = await allocationclsmodel.aggregate([
          {
            '$lookup': {
              'from': 'asset_tbs', 
              'localField': 'asset_id', 
              'foreignField': '_id', 
              'as': 'Asset'
            }
          }, {
              '$unwind' : '$Asset'
          },
          {
              '$group' :
          {
              '_id': '$_id',
              'department':{'$first':'$department'} ,
              'Class':{'$first':'$Class'} ,
              'Roomnumber':{'$first':'$Roomnumber'} ,
              'image':{'$first':'$image' },
              'allottedquantity':{'$first':'$allottedquantity'} ,
              'assetname':{'$first':'$Asset.assetname' },
          }
      }
        ])   
      res.render('ViewAllocation',{data})
  } catch (error) {
      
  }
})

Allocation.get('/viewallocationother', async function(req,res){
  try {
      const data = await allocationmodelother.aggregate([
          {
            '$lookup': {
              'from': 'asset_tbs', 
              'localField': 'asset_id', 
              'foreignField': '_id', 
              'as': 'Asset'
            }
          }, {
              '$unwind' : '$Asset'
          },
          {
              '$group' :
          {
              '_id': '$_id',
              'other':{'$first':'$other'} ,
              'Roomnumber':{'$first':'$Roomnumber'} ,
              'allottedquantity':{'$first':'$allottedquantity'} ,
              'assetname':{'$first':'$Asset.assetname' },
          }
      }
        ])   
      res.render('ViewOtherAllocation',{data})
  } catch (error) {
      
  }
})


app.get('/',  (req, res) =>{
  res.render('login')
})

app.get('/dashboard',  (req, res) =>{
  res.render('dashboard')
})


const MONGODB_URL=
"mongodb+srv://maneeshmaitexa:maneeshmaitexa@cluster0.fv75o1k.mongodb.net/AssetDb?retryWrites=true&w=majority"


const port=2000;

mongoose.connect(MONGODB_URL).then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port http://localhost:2000/`);
    })
}).catch((error)=>{
    console.log(` ${error} did not connect`); 
})