const express = require('express');
const Feedbacks = require('../models/Feedbacks');


const router = express.Router();

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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