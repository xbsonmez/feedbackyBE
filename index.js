const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const feedbacksRouter = require('./routes/feedbacks');

app.use("/feedbacks", feedbacksRouter);


mongoose.connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.kqqb8.mongodb.net/?retryWrites=true&w=majority`,
    (e) => {
        if (e) {
            console.log(e);
        } else {
            console.log('Connected to MongoDB');
        }
    }
);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});


app.get('/', (req, res) => {
    res.send('Hello World');
});

const feedbacks = [
    {
        id: "string",
        feedbacks:"string"
    }
]