const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');
const feedbacksRouter = require('./routes/feedbacks');
const Feedbacks = require('./models/Feedbacks');

const app = express();


const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
 };
app.use(cors(corsOptions));

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

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
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-type','text/html');
    Feedbacks.find()
    .then(feedbacks => {
        res.send(
         `<table key={'table'} border=1>
                <thead>
                  <tr key={'header'}>
                    ${Object.keys(feedbacks[0].toJSON()).map((key, index) => (
                      `<th key=${index}>${key}</th>`
                    ))}
                  </tr>
                  ${feedbacks.map((item, index) => (
                    `<tr key=${index}>
                      ${Object.values(item.toJSON()).map((val, index) => (
                        `<td key=${index}>${val}</td>`
                      ))}
                    </tr>`
                  ))}
                  </thead>
                </table>`);
    })
    .catch(err => {
        res.json(err);
    });
});