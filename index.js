const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ctfo7.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    await client.connect();
    //console.log('Database connected')
    const servicecollection = client.db('tools_manufaturer').collection('service');
    const bookingcollection = client.db('tools_manufaturer').collection('bookings');
    app.get('/service', async(req, res) =>{
      const query = {};
      const cursor = servicecollection.find(query);
      const service = await cursor.toArray();
      res.send(service);
    });

    app.get('/service',async(req, res) =>{
      const customar = req.query.customar;
      const query = {customar: customar};
     const booking = await bookingcollection.find(query).toArray();
     res.send(booking);
    })

    app.get('/user',async(req, res) =>{
      const users = await usercollection.find().toArray();
      res.send(users);
    })
    app.post('/booking', async(req, res) =>{
      const booking = req.body;
      const result = await bookingcollection.insertOne(booking);
      res.send(result);
    });
  }
  finally{

  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from tools manufaturer!')
})

app.listen(port, () => {
  console.log(`Tools app listening on port ${port}`)
})



