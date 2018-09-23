import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import Issue from './modelSchema/issue';

const myDsrExpress = express();
const router = express.Router();

myDsrExpress.use(cors());
myDsrExpress.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/issues');
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

myDsrExpress.use('/', router);
myDsrExpress.get('/', (req, res) => (
    res.send('Hello World!')
));

// Route to GET all the issues
router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Getting all the issues.");
            res.json(issues);
        }
    });
});

// Route to GET an issue by ID
router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err) {
            console.log("Error occurred while fetching Issue by Id:" + id);
        } else {
            console.log('Getting issue with id:'+id);
            res.json(issue);
        }
    })
});

// Route to POST an issue
router.route('/issues/add').post((req, res) => {
    let issue = new Issue (req.body);
    issue.save().then(issue => {
        console.log("Adding an issue.");
        res.status(200).json({
            'issue': 'Issue Added Successfully'
        })
    }).catch(err => {
        console.log("Error occurred while adding an issue.");
        res.status(400).send('Error add issue!')
    });
});

// Route to UPDATE an issue
router.route("/issues/update/:id").post((req,res)=>{
    Issue.findById(req.params.id,(err,issue)=>{
        if(!issue){
            console.log("Erro occurred while updating the isssue by id:"+id);
            return next(new Error('Unable to load the issue to be updated.'))
        } else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue=>{
                res.json('Issue Update Successful!');
                console.log("Issue:"+id+" updated successfully@");
            }).catch(err=>{
                console.log("Failed to update the issue:"+err)
            });
        }
    });
});

// Route to DEL an issue by Id
router.route("/issues/delete/:id").get((req,res)=>{
    Issue.findByIdAndRemove({_id:req.params.id},(err,issue)=>{
        if(err){
            console.log("Error removing the issue with id:"+id);
            res.json(err);
        } else {
            console.log("Issue id:"+id+" reoved successfully!");
            res.json("Issue removed successfully.")
        }
    })
})

// Port on which the server is Up!
myDsrExpress.listen(4000, () => (
    console.log("Server is up and running at PORT:4000!")
));
