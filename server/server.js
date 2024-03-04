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
      try {
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
      } catch (error) {
        res.status(500).json({message: error.message});
      }
    })

    app.post('/login', async (req, res) => {
      try {
        const {email, password} = req.body;
        const dataIsSet = email.trim().length && password.trim().length;

        if (!dataIsSet) {
          res.status(400).json({message: 'Please provide all required fields'});
          return;
        }

        let user = await db.collection('admins').findOne({email, password});

        if (user) {
          user.type = 'admin';
        }

        if (!user) {
          user = await db.collection('waiters').findOne({email, password});

          if (user) {
            user.type = 'waiter';
          }

          if (!user) {
            user = await db.collection('users').findOne({email, password});

            if (user) {
              user.type = 'user';
            }

            if (!user) {
              res.status(401).json({message: 'Invalid credentials'});
              return;
            }
          }
        }

        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({message: error.message});
      }
    })

    app.get('/foods', async (req, res) => {
      try {
        const cursor = db.collection('foods').find();
        const foodItems = await cursor.toArray();

        res.status(200).json(foodItems);
      } catch (error) {
        res.status(500).json({message: error.message});
      }
    })

    app.listen(6777, () => {
      console.log('Server is live');
    })
  } catch (error) {
    console.log(error);
  }
})()
  .catch(console.error)