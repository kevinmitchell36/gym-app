const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: String,
  category: String,
  notes: String
});

const Exercise = mongoose.model('exercise', ExerciseSchema);

module.exports = Exercise; 