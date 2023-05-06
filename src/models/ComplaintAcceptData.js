const mongoose = require('mongoose')



const schema = mongoose.Schema

const complaintAcceptSchema = new schema({
    complaint_id:{type:mongoose.Types.ObjectId,ref:"complaint_tb"},
    worker_id:{type:mongoose.Types.ObjectId,ref:"registerworker_tb"},
    status:{type:String},


})

const complaintacceptmodel = mongoose.model('complaint_accept_tb',complaintAcceptSchema)


module.exports = complaintacceptmodel