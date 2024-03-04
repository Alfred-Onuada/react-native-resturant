const express = require('express');
const app = express();
app.use(express.json());
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://adminUser:mcrA2YudwKcxo59H@todo-db.az8gh.mongodb.net/';
const client = new MongoClient(url);


(async function () {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('resturant-app');

    app.post('/register', async (req, res) => {
      if (!req.body) {
        res.status(400).json({message: 'please provide the required info'})
        return;
      }

      const emailExists = await db.collection('users').findOne({email: req.body.email});

      if (emailExists) {
        res.status(400).json({message: 'Email already exists'});
        return;
      }

      const insertInfo = await db.collection('users').insertOne(req.body);

      res.status(200).json({
        _id: insertInfo.insertedId,
        type: 'user',
        ...req.body
      })
    })

    app.listen(6777, () => {
      console.log('Server is live');
    })
  } catch (error) {
    console.log(error);
  }
})()
  .catch(console.error)