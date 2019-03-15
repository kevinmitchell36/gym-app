const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/gym', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', require('./routes/api/exercises'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));