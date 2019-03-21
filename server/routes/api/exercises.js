const express = require('express');
const router = express.Router();
const Exercise = require('../../../models/gym')

router.get('/exercises', function (req, res) {
  Exercise.find({}).then(function(exercises){
    res.send(exercises);
  });
});

router.get('/exercises/:id', function (req, res) {
  Exercise.findById({_id: req.params.id}, req.body).then(function(exercises) {
    res.send(exercises);
  });
});

router.post('/exercises', function (req, res) {
  Exercise.create(req.body).then(function(exercises){
    res.send(exercises);
  });
});

router.put('/exercises/:id', function (req, res) {
  console.log(req.params);
  console.log(req.body);
  try {
  Exercise.findOneAndUpdate({_id: req.params.id}, req.body).then(function(exercises) { Exercise.findOne({_id: req.params.id}).then(function(exercises){
      res.send(exercises);
    });
  });
  } catch(err) {
    console.log(err)
  }
});

router.delete('/exercises/:id', function (req, res) {
  Exercise.findOneAndDelete({_id: req.params.id}, req.body).then(function(exercises) {
    res.send(exercises);
  });
});

module.exports = router;
