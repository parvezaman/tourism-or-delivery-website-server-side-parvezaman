const express = require('express');
const cors = require('cors');  // CORS
const { MongoClient } = require('mongodb'); //MongoDB
const ObjectId = require('mongodb').ObjectId;
const { response } = require('express');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

// MongoDB connectioin
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kbuol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// CORS Middleware
app.use(cors());
app.use(express.json());


// MongoDB Operations
async function run() {
  try {
    await client.connect();
    const database = client.db("travel-the-world");
    const ourServices = database.collection("ourServices");
    const allBookings = database.collection("allBookings");
    const allGuides = database.collection("tourGuides");

    // GET API (Services)
    app.get('/services', async(req, res)=>{
      const cursor = ourServices.find({});
      const services = await cursor.toArray();
      res.send(services);
    });
    // GET API (Bookings)
    app.get('/bookings', async(req, res)=>{
      const cursor = allBookings.find({});
      const bookings = await cursor.toArray();
      res.send(bookings);
    });
    // GET API (All tour guides)
    app.get('/allguides', async(req, res)=>{
      const cursor = allGuides.find({});
      const guides = await cursor.toArray();
      res.send(guides);
    });

    // POST API (Services)
    app.post('/services', async(req, res)=>{
      const service = req.body;
      // console.log("hit the post API", service);
      const result = await ourServices.insertOne(service);
      console.log(result);
      res.json(result);

    });
    // POST API (all bookings)
    app.post('/bookings', async(req, res)=>{
      const booking = req.body;
      // console.log("hit the post API", service);
      const result = await allBookings.insertOne(booking);
      console.log(result);
      res.json(result);

    });

    //DELETE API (Delete from all bookings)
    // app.delete('/bookings/:id', async(req, res)=>{
    //   const id = req.params.id;
    //   const query = {_id:ObjectId(id)};
    //   const result = await allBookings.deleteOne(query);
    //   response.json(result)

    // })

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
  

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})