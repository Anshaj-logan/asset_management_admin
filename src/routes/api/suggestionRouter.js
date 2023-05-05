const express = require('express')
const SuggestionRouter = express.Router()
const Suggestion = require('../../models/SuggestionData');


SuggestionRouter.post("/add-suggestion", async (req, res) => {
    try {
        var details = { student_id: req.body.student_id, department: req.body.department, class: req.body.class, 
            room_number: req.body.room_number, suggestion: req.body.suggestion}
        const result = await Suggestion(details).save()
        if (result) {
            res.status(201).json({ success: true, error: false, message: "Suggestion added", details: result });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }
}
);












module.exports = SuggestionRouter