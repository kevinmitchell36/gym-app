const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
app.use(cors());

const exercises = require('./routes/api/exercises');

app.use('/api/exercises', exercises)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));