const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');
const newNotes = require('./db/db.json'); //Added 3/7/2023
const uniqid = require('uniqid'); //Creates a new id for db file

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//GET Route for Home Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// GET Route for Notes Page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname,'/public/notes.html')));

// *GET API route for loading saved notes on left side of screen
app.get('/notes', (req, res) => res.json(newNotes));

// * Post API Route for when a new note is saved. Needs to include file path to db file

// post Route for api request (added 3/7/2023)
app.post('/notes', (req, res) => {
    res.json(`${req.method} request received`);
    console.info(req.rawHeaders);
    console.info(`${req.method} request received`);
})

//GET /api/notes should read the db.json file and return all saved notes as JSON.


//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).



// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));
