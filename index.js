const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');
const feedbacksRouter = require('./routes/feedbacks');

const app = express();

app.use(bodyParser.json());
app.use("/feedbacks", feedbacksRouter);


const domainsFromEnv = process.env.CORS_DOMAINS || ""

const whitelist = domainsFromEnv.split(",").map(item => item.trim());

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

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

app.use(bodyParser.json());
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
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