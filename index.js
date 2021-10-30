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
    // create a document to insert
    const doc = {
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    }
    const result = await ourServices.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
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