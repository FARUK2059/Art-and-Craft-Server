const express = require("express");
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Midleware
app.use(cors());
app.use(express.json());


// MongoDB Conection Function
const uri = `mongodb+srv://${process.env.CRAF_USER}:${process.env.CRAF_PASS}@cluster0.6e55rfm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        // Database name Create
        const database = client.db("Craft-Store");
        const craftCollection = database.collection("craft-Item");


        // Client side a requast patanur function
        app.post('/crafts', async (req, res) => {
            const newCraft = req.body;
            console.log(newCraft);
            const result = await craftCollection.insertOne(newCraft);
            res.send(result);
        })

        // BongoDB teke Data pawar function
        app.get('/crafts', async (req, res) => {
            const cursor = craftCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        // Update get Data for mongoDB to Server with Single data
        app.get('/crafts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await craftCollection.findOne(query);
            res.send(result);
        })

        // Update request send server to client and  receved in mongodb
        app.put('/crafts/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const option = { upsert: true };
            const updateCraft = req.body;
            const upCraft = {
                $set: {
                    craftURL: updateCraft.craftURL,
                    itemName: updateCraft.itemName,
                    subitemname: updateCraft.subitemname,
                    shortdescription: updateCraft.shortdescription,
                    price: updateCraft.price,
                    rating: updateCraft.rating,
                    Customization: updateCraft.Customization,
                    processing_time: updateCraft.processing_time,
                    stockStatus: updateCraft.stockStatus
                }
            }
            const result = await craftCollection.updateOne(filter, upCraft, option);
            res.send(result);
        })


        // Delete Data mongoDB with cliend side request send
        app.delete('/crafts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await craftCollection.deleteOne(query);
            res.send(result);
        })

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //  Create spasific data
        const cetagoryCollection = client.db('ArtandCraft').collection('CraftCetagory');

        // BongoDB teke cetagory Data pawar function
        app.get('/cetagory', async (req, res) => {
            const cursor = cetagoryCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







// Main Server Function
app.get('/', (req, res) => {
    res.send('The Art & Craft server is Start')
})

app.listen(port, () => {
    console.log(`Prectice user Port : ${port}`);
})