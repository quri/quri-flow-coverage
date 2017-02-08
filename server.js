// @flow

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const runFlowCoverage = require('./flow-coverage');
const exec = require("child_process").exec;
const execSync = require("child_process").execSync;

const OAUTH_TOKEN

app.use(cors());
app.use(bodyParser.json());


function printError(error, stdout) {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log('',stdout);
}

app.get("/github/payload", () => {
  const getFlowCoverage = (res) => res.then(e => console.log("tg", e));
  runFlowCoverage(getFlowCoverage);
});


app.listen(1337, () => {
  execSync(`git clone https://${OAUTH_TOKEN}:x-oauth-basic@github.com/quri/nervecenter.git`)
  console.log('Example app listening on port 8080!');
});
