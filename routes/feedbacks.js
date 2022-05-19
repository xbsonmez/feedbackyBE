const express = require('express');
const Feedbacks = require('../models/Feedbacks');


const router = express.Router();

router.get('/', (req, res) => {
    Feedbacks.find()
    .then(feedbacks => {
        res.json(feedbacks);
    })
    .catch(err => {
        res.json(err);
    });
});

router.post("/", (req, res) => {
    const feedback = new Feedbacks({
        feedbacks: req.body.feedbacks
    });

    feedback.save();
    res.json(feedback);

});

router.delete("/:id", (req, res) => {
    Feedbacks.findOneAndDelete({ _id: req.params.id }, (err, feedback) => {
        if (err) {
            res.send(err);
        }
        res.json(feedback);
    });
});

module.exports = router;