const express = require('express');
const router = express.Router();
const Exercise = require('../../../models/gym')

router.get('/exercises', function (req, res) {
  Exercise.find({}).then(function(exercises){
    res.send(exercises);
  });
});

router.post('/exercises', function (req, res) {
  Exercise.create(req.body).then(function(exercises){
    res.send(exercises);
  });
});

router.put('/exercises/:id', function (req, res) {
  Exercise.findOneAndUpdate({_id: req.params.id}, req.body).then(function(exercises) { Exercise.findOne({_id: req.params.id}).then(function(exercises){
      res.send(exercises);
    });
  });
});

router.delete('/exercises/:id', function (req, res) {
  Exercise.findOneAndDelete({_id: req.params.id}, req.body).then(function(exercises) {
    res.send(exercises);
  });
});

module.exports = router;
