const express = require("express");
const cors = require('cors');
require('dotenv').config();
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Midleware
app.use(cors());
app.use(express.json());








// Main Server Function
app.get('/', (req, res) => {
    res.send('The Art & Craft server is Start')
})

app.listen(port, () => {
    console.log(`Prectice user Port : ${port}`);
})