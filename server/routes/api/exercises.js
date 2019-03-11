const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
  const exercises = await loadExerciseCollection();
  res.send(await exercises.find({}).toArray())
});

router.post('/', async (req, res) => {
  const exercises = await loadExerciseCollection();
  await exercises.insertOne({
    title: req.body.title,
    createdAt: new Date()
  });
  res.status(201).send();
})

router.delete('/:id', async (req, res) =>{
  const exercises = await loadExerciseCollection();
  await exercises.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
  res.status(200).send();
})

async function loadExerciseCollection() {
  const client = await mongodb.MongoClient.connect
  ('mongodb://localhost:27017/gym', {
    useNewParser: true
  });
  return client.db('gym').collection('exercises');
}

module.exports = router;
