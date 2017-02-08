const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const flowCoverage = require('./flow-coverage');

app.use(cors());
app.use(bodyParser.json());


flowCoverage();

app.get("/github/payload", () => {

});
