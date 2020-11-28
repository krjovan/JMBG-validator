const express = require('express');
const path = require('path');

const cors = require('cors');
const app = express();	


app.use(cors());
app.set('views', __dirname + '/dist/JMBG-validator');
app.set('view engine', 'html');
// Serve only the static files form the dist directory	// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/JMBG-validator'));