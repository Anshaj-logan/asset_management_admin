const express = require('express')
const ComplaintRouter = express.Router()
const bcrypt = require('bcryptjs');
const Complaint = require('../../models/ComplaintData');
const ComplaintAccept = require('../../models/ComplaintAcceptData');
const StaffComplaint = require('../../models/StaffComplaintData');
const StaffComplaintAccept = require('../../models/ComplaintAcceptStaffData');
const mongoose = require('mongoose');
var objectId = mongoose.Types.ObjectId
const multer = require("multer");
const gallery = require('../../models/Gallerytbl')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/Complaint")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

ComplaintRouter.get("/view-image", async (req, res) => {
    try {
        const allData = await gallery.find()
        if (allData) {
            return res.status(200).json({ success: true, error: false, data: allData });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
    }
});

ComplaintRouter.post('/upload-image', upload.single("file"), (req, res) => {
    console.log("jh",req.file.filename);
    return res.json("file uploaded")
})

ComplaintRouter.post("/add-complaint", async (req, res) => {
    try {
        var details = { student_id: req.body.student_id, department: req.body.department, class: req.body.class, 
            room_number: req.body.room_number, complaint: req.body.complaint, image: req.body.image, status:"0"}
        const result = await Complaint(details).save()
        if (result) {
            res.status(201).json({ success: true, error: false, message: "Complaint added", details: result });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);

ComplaintRouter.post("/staff-add-complaint", async (req, res) => {
    try {
        var details = { staff_id: req.body.staff_id, department: req.body.department, class: req.body.class, 
            room_number: req.body.room_number, complaint: req.body.complaint, image: req.body.image, status:"0"}
        const result = await StaffComplaint(details).save()
        if (result) {
            res.status(201).json({ success: true, error: false, message: "Complaint added", details: result });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);

ComplaintRouter.get("/student-added-complaints/:id", async (req, res) => {
    try {
        const student_id = req.params.id
        const allData = await Complaint.find({student_id:student_id});
        if (allData) {
            return res.status(200).json({ success: true, error: false, data: allData });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);

ComplaintRouter.get("/view-all-pending-complaints", async (req, res) => {
    try {
        const allData = await Complaint.aggregate([
            {
              '$lookup': {
                'from': 'registerstudent_tbs', 
                'localField': 'student_id', 
                'foreignField': '_id', 
                'as': 'student'
              }
            },
            {
                "$unwind":"$student"
            },
            {
                "$group":{
                    "_id":"$_id",
                    "department":{"$first":"$department"},
                    "class":{"$first":"$class"},
                    "complaint":{"$first":"$complaint"},
                    "room_number":{"$first":"$room_number"},
                    "complaint_id":{"$first":"$_id"},
                    "name":{"$first":"$student.name"},
                    "image":{"$first":"$image"},
                    "status":{"$first":"$status"},
                }
            }
            
          ])
        if (allData) {
            return res.status(200).json({ success: true, error: false, data: allData });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
    }
});


ComplaintRouter.get("/view-all-pending-complaints-staff", async (req, res) => {
    try {
        const allData = await StaffComplaint.aggregate([
            {
              '$lookup': {
                'from': 'registerstaff_tbs', 
                'localField': 'staff_id', 
                'foreignField': '_id', 
                'as': 'staff'
              }
            },
            {
                "$unwind":"$staff"
            },
            {
                "$group":{
                    "_id":"$_id",
                    "department":{"$first":"$department"},
                    "class":{"$first":"$class"},
                    "complaint":{"$first":"$complaint"},
                    "room_number":{"$first":"$room_number"},
                    "complaint_id":{"$first":"$_id"},
                    "name":{"$first":"$staff.name"},
                    "image":{"$first":"$image"},
                    "status":{"$first":"$status"},
                }
            }
            
          ])
        if (allData) {
            return res.status(200).json({ success: true, error: false, data: allData });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
    }
});

ComplaintRouter.get("/view-all-pending-complaints-staff/:id", async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const allData = await StaffComplaint.aggregate([
            {
              '$lookup': {
                'from': 'registerstaff_tbs', 
                'localField': 'staff_id', 
                'foreignField': '_id', 
                'as': 'staff'
              }
            },
            {
                "$unwind":"$staff"
            },
            {
               '$match':{
                'staff_id':new objectId(id)
               } 
            },
            {
                "$group":{
                    "_id":"$_id",
                    "department":{"$first":"$department"},
                    "class":{"$first":"$class"},
                    "complaint":{"$first":"$complaint"},
                    "room_number":{"$first":"$room_number"},
                    "complaint_id":{"$first":"$_id"},
                    "name":{"$first":"$staff.name"},
                    "image":{"$first":"$image"},
                    "status":{"$first":"$status"},
                }
            }
            
          ])
        if (allData) {
            return res.status(200).json({ success: true, error: false, data: allData });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
    }
});

ComplaintRouter.get("/view-all-pending-complaints-staff", async (req, res) => {
    try {
        const allData = await StaffComplaint.find({status:"0"});
        if (allData) {
            return res.status(200).json({ success: true, error: false, data: allData });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
    }
});


ComplaintRouter.get("/accept-student-complaints/:id/:worker", async (req, res) => {
    try {
        const complaint_id = req.params.id
        const worker_id = req.params.worker

        const updation = await Complaint.updateOne({_id:complaint_id},{$set:{status:"1"}})
        const data = await ComplaintAccept.create({complaint_id,worker_id,status:"0"})
        if (data) {
            return res.status(200).json({ success: true, error: false, message:"Accepted" });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);

ComplaintRouter.get("/accept-staff-complaints/:id/:worker", async (req, res) => {
    try {
        const complaint_id = req.params.id
        const worker_id = req.params.worker

        const updation = await StaffComplaint.updateOne({_id:complaint_id},{$set:{status:"1"}})
        const data = await StaffComplaintAccept.create({complaint_id,worker_id,status:"0"})
        if (data) {
            return res.status(200).json({ success: true, error: false, message:"Accepted" });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);

ComplaintRouter.get("/view-all-worker-accepted-complaints/:workerId", async (req, res) => {
    try {
        const worker_id = req.params.workerId
        const allData = await ComplaintAccept.aggregate([
            {
              '$lookup': {
                'from': 'complaint_tbs', 
                'localField': 'complaint_id', 
                'foreignField': '_id', 
                'as': 'complaint'
              }
            }, {
              '$lookup': {
                'from': 'registerworker_tbs', 
                'localField': 'worker_id', 
                'foreignField': '_id', 
                'as': 'worker'
              }
            },
        
            {
                "$unwind":"$complaint"
            },
            {
                "$unwind":"$worker"
            },
          
            {
                "$match":{
                    "worker_id":new objectId(worker_id)
                }
            },
            {
                "$group":{
                    "_id":"$_id",
                    // "name":{"$first":"$student.name"},
                    "department":{"$first":"$complaint.department"},
                    "class":{"$first":"$complaint.class"},
                    "complaint":{"$first":"$complaint.complaint"},
                    "room_number":{"$first":"$complaint.room_number"},
                    "image":{"$first":"$complaint.image"},
                    "complaint_id":{"$first":"$complaint._id"},
                    "status":{"$first":"$status"},
                }
            }
          ])
        if (allData) {
            return res.status(200).json({ success: true, error: false, data: allData });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
    }
});

ComplaintRouter.get("/view-all-worker-accepted-complaints-staff/:workerId", async (req, res) => {
    try {
        const worker_id = req.params.workerId
        const allData = await StaffComplaintAccept.aggregate([
            {
              '$lookup': {
                'from': 'staff_complaint_tbs', 
                'localField': 'complaint_id', 
                'foreignField': '_id', 
                'as': 'complaint'
              }
            }, {
              '$lookup': {
                'from': 'registerworker_tbs', 
                'localField': 'worker_id', 
                'foreignField': '_id', 
                'as': 'worker'
              }
            },
        
            {
                "$unwind":"$complaint"
            },
            {
                "$unwind":"$worker"
            },
          
            {
                "$match":{
                    "worker_id":new objectId(worker_id)
                }
            },
            {
                "$group":{
                    "_id":"$_id",
                    // "name":{"$first":"$student.name"},
                    "department":{"$first":"$complaint.department"},
                    "class":{"$first":"$complaint.class"},
                    "complaint":{"$first":"$complaint.complaint"},
                    "room_number":{"$first":"$complaint.room_number"},
                    "image":{"$first":"$complaint.image"},
                    "complaint_id":{"$first":"$complaint._id"},
                    "status":{"$first":"$status"},
                }
            }
          ])
        if (allData) {
            return res.status(200).json({ success: true, error: false, data: allData });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
    }
});


ComplaintRouter.get("/complete-complaints/:id/:complaintid", async (req, res) => {
    try {
        const complaint_id = req.params.id
        const Acomplaint_id = req.params.complaintid
        console.log(complaint_id,Acomplaint_id);
        const updation = await Complaint.updateOne({_id:complaint_id},{$set:{status:"2"}})
        const data = await ComplaintAccept.updateOne({_id:Acomplaint_id},{$set:{status:"1"}})
        console.log(data,updation);
        if (data.matchedCount===1) {
            return res.status(200).json({ success: true, error: false, message:"Status updated" });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);


ComplaintRouter.get("/complete-complaints-staff/:id/:complaintid", async (req, res) => {
    try {
        const complaint_id = req.params.id
        const Acomplaint_id = req.params.complaintid
        console.log(complaint_id,Acomplaint_id);
        const updation = await StaffComplaint.updateOne({_id:complaint_id},{$set:{status:"2"}})
        const data = await StaffComplaintAccept.updateOne({_id:Acomplaint_id},{$set:{status:"1"}})
        console.log(data,updation);
        if (data.matchedCount===1) {
            return res.status(200).json({ success: true, error: false, message:"Status updated" });
        }
        else {
            res.status(201).json({ success: false, error: true, message: "No data found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);








module.exports = ComplaintRouter