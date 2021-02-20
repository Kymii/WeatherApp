// Express for server routes, HTTP requests
const express = require('express');

//body-parser middleware for handling data
const bodyParser = require('body-parser');

//cors middleware for web server access
const cors = require('cors');


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// point to project folder
app.use(express.static('website'));

const port = 5000;

// start up server 
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// hold data 
let projectData = {};

// GET route 
app.get('/grab', (req, res) => {
    res.send(projectData);
});

//POST route 
app.post('/save', (req, res) => {
    res.send('POST Received')
    projectData = req.body;
    console.log(req);
})