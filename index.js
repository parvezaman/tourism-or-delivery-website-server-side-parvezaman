const express = require('express');
const cors = require('cors');  // CORS
const { MongoClient } = require('mongodb'); //MongoDB
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

// MongoDB connectioin
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kbuol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
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

    // POST API
    app.post('/services', async(req, res)=>{
      const service = req.body;
      console.log("hit the post API", service);
      const result = await ourServices.insertOne(service);
      console.log(result);
      res.json(result);

    })

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