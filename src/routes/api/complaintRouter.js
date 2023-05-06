const express = require('express')
const ComplaintRouter = express.Router()
const bcrypt = require('bcryptjs');
const Complaint = require('../../models/ComplaintData');
const multer = require("multer")
var objectId = require('mongodb').ObjectID;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

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
        const allData = await Complaint.find({status:"0"});
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
});


ComplaintRouter.get("/accept-complaints/:id", async (req, res) => {
    try {
        const complaint_id = req.params.id
        const updation = await Complaint.updateOne({_id:complaint_id},{$set:{status:"1"}})
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

// ComplaintRouter.post("/reply-complaints/:id", async (req, res) => {
//     const id = req.params.id
//     try {

//         const allData = await Complaint.updateOne({_id:id},{$set:{reply:req.body.reply}});
//         if (allData) {
//             return res.status(200).json({ success: true, error: false, message:"Reply added" });
//         }
//         else {
//             res.status(201).json({ success: false, error: true, message: "No data found" });
//         }

//     } catch (error) {
//         res.status(500).json({ success: false, error: true, message: "Something went wrong" });
//         console.log(error);
//     }
// }
// );






module.exports = ComplaintRouter