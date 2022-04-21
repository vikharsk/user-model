const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { router } = require('./routes/user_upload');
// for clustering
// const cluster = require('cluster');
var cors = require('cors');
app.use(cors());

app.use(express.json());

app.use(router);

app.listen(7600, async() => {

    console.log("sarver in runing @ 7600 Port");
    try {
        await mongoose.connect('mongodb://localhost:27017',{
        dbName: 'user_module',

    });
    console.log("DataBase Connected On sarver in runing @ 4600 Port");
    } catch (error) {
        console.log("DataBase Not Connect sarver in runing @ 5000 Port");
    }
    
})