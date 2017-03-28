// @flow

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const runFlowCoverage = require('./flow-coverage');
const exec = require("child_process").exec;
const execSync = require("child_process").execSync;
const { OAUTH_TOKEN } = require("./credentials")

app.use(cors());
app.use(bodyParser.json());


function printError(error, stdout) {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log('',stdout);
}

app.get("/github/payload", (req,res) => {
  const DESTINATION_BRANCH = "prod-114_shift_toggle"
  execSync(`./flow-coverage.sh ${DESTINATION_BRANCH}`);
});


app.listen(1337, () => {
  // execSync("curl -o- -L https://yarnpkg.com/install.sh | bash", printError);
  execSync(`git -C nervecenter pull || git clone https://${OAUTH_TOKEN}:x-oauth-basic@github.com/quri/nervecenter.git`, printError)
  execSync("cd nervecenter && yarn")
  console.log('Example app listening on port 1337!');
});
