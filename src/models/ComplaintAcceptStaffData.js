const mongoose = require('mongoose')



const schema = mongoose.Schema

const staffcomplaintAcceptSchema = new schema({
    complaint_id:{type:mongoose.Types.ObjectId,ref:"staff_complaint_tb"},
    worker_id:{type:mongoose.Types.ObjectId,ref:"registerworker_tb"},
    status:{type:String},


})

const staffcomplaintacceptmodel = mongoose.model('staff_complaint_accept_tb',staffcomplaintAcceptSchema)


module.exports = staffcomplaintacceptmodel