import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const myDsrExpress = express();
const router = express.Router();

myDsrExpress.use(cors());
myDsrExpress.use(bodyParser.json());

mongoose.connect('usris');
const databaseConnection = mongoose.connection;

// Once Mongoose Connection is successful.
databaseConnection.on('connected', () => {
    console.log("Database connection was established successfully!");
});
// If Mongoose Error occurs.
databaseConnection.on('error', (err) => (
    console.log("Mongoose Error: " + err)
));
// Once Mongoose Connection gets disconnected.
databaseConnection.on('disconnected', () => {
    console.log("Sorry! Database connection disconnected.");
});

myDsrExpress.use('/',router);
myDsrExpress.get('/', (req, res) => (
    res.send('Hello World!')
));


// Port on which the server is Up!
myDsrExpress.listen(4000, () => (
    console.log("Server is up and running at PORT:4000!")
));
