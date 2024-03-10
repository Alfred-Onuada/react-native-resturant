const express = require('express');
const app = express();
app.use(express.json());
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb+srv://adminUser:mcrA2YudwKcxo59H@todo-db.az8gh.mongodb.net/';
const client = new MongoClient(url);

const PORT = process.env.PORT || 6777;

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

    app.get('/tables', async (req, res) => {
      try {
        const cursor = db.collection('tables').find();
        const tables = await cursor.toArray();

        res.status(200).json(tables);
      } catch (error) {
        res.status(500).json({message: error.message});
      }
    })

    app.post('/cart', async (req, res) => {
      try {
        const data = req.body;
        data.items = data.items.map(d => {
          d._id = new ObjectId(d._id);

          return d;
        });

        const purchase = {
          items: data.items,
          buyerId: new ObjectId(data.userInfo._id),
          total: data.total,
          amount: data.amount * 100,
          fees: data.fees,
          status: 'pending',
          fulfiled: null
        }

        const insertInfo = await db.collection('purchases').insertOne(purchase);

        const params = {
          reference: insertInfo.insertedId,
          email: data.userInfo.email,
          amount: data.amount,
          callback_url: 'https://google.com',
          metadata: { cancel_action: 'https://bing.com' }
        };
        
        const resp = await fetch('https://api.paystack.co/transaction/initialize', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer sk_test_04a262dcbfb776c552281036bdd432af7de2c720',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        });

        const paystackData = await resp.json();

        res.status(201).send(paystackData.data.authorization_url)
      } catch (error) {
        res.status(500).json({message: error.message});
      }
    })

    app.patch('/cart/success/:ref', async (req, res) => {
      try {
        await db.collection('purchases').updateOne({_id: new ObjectId(req.params.ref), status: 'pending'}, {$set: {status: 'success'}});

        res.status(200).send();
      } catch (error) {
        res.status(500).json({message: error.message});
      }
    })

    app.patch('/table/:tableId', async (req, res) => {
      try {
        const table = await db.collection('tables').findOneAndUpdate({_id: new ObjectId(req.params.tableId), status: 'available'}, {$set: {status: 'occupied'}});

        if (!table) {
          res.status(400).json({message: 'This table is no longer available'});
        }

        res.status(200).send();
      } catch (error) {
        res.status(500).json({message: error.message});
      }
    })

    app.get('/incoming/food', async (req, res) => {
      try {
        // food is any purchase that has fees
        const cursor = db.collection('purchases').aggregate([
          {
            $match: {
              fees: { $gt: 0 },
              status: 'success',
              fulfiled: null
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'buyerId',
              foreignField: '_id',
              as: 'userInfo'
            }
          },
          {
            $addFields: {
              userInfo: {
                $arrayElemAt: ['$userInfo', 0]
              }
            }
          }
        ]);
        const foods = await cursor.toArray();

        res.status(200).json(foods)
      } catch (error) {
        res.status(500).json({message: error.message});
      }
    });

    app.get('/incoming/table', async (req, res) => {
      try {
        // table is any purchase that has 0 fees
        const cursor = db.collection('purchases').find({ fees: 0, status: 'pending' });
        const tables = await cursor.toArray();

        res.status(200).json(tables)
      } catch (error) {
        res.status(500).json({message: error.message});
      }
    });

    app.patch('/incoming/food', async (req, res) => {
      try {
        const {waiter, fulfiled, ref} = req.query;

        await db.collection('purchases').updateOne({_id: new ObjectId(ref)},  { $set: { waiter: new ObjectId(waiter), fulfiled: fulfiled == 'true' } });

        res.status(200).send();
      } catch (error) {
        res.status(500).json({message: error.message});
      }
    });

    app.delete('/foods/:foodId', async (req, res) => {
      try {
        await db.collection('foods').deleteOne({_id: new ObjectId(req.params.foodId)});

        res.end();
      } catch (error) {
        res.status(500).json({message: error.message});
      }
    });

    app.patch('/foods/:foodId', async (req, res) => {
      try {
        console.log(req.params.foodId, req.body);
        await db.collection('foods').updateOne({_id: new ObjectId(req.params.foodId)}, {$set: req.body});

        res.end();
      } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
      }
    });

    app.listen(PORT, () => {
      console.log('Server is live');
    })
  } catch (error) {
    console.log(error);
  }
})()
  .catch(console.error)