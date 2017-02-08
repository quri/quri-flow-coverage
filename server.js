// @flow

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const runFlowCoverage = require('./flow-coverage');
const exec = require("child_process").exec;


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
  // exec("git pull -f origin master", printError);
    flowCoverage();

});


app.listen(1337, () => {
  const getFlowCoverage = (res) => res.then(e => console.log("tg", e));
  runFlowCoverage(getFlowCoverage);

  console.log('Example app listening on port 8080!');
});
