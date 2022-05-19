const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');
const feedbacksRouter = require('./routes/feedbacks');

const app = express();


const corsOptions = {
  origin: 'https://your-app-name.herokuapp.com',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.options('*', cors());
app.use('/', routes);
app.use(bodyParser.json());
app.use("/feedbacks", feedbacksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port 5000');
});


app.get('/', (req, res) => {
    res.send('Hello World');
});

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