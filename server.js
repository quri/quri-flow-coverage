// @flow

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const execSync = require("child_process").execSync;
const fs = require("fs");
const fetch = require('node-fetch');

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
  const DESTINATION_BRANCH = "prod-114_shift_toggle";
  const PULL_REQUEST_ID = "985";
  execSync(`./flow-coverage.sh ${DESTINATION_BRANCH}`);
  console.log("Reading coverage.txt...");
  const content = fs.readFileSync("./coverage.txt").toString();
  console.log("Posting flow coverage result on Github pull request...");
  fetch(`https://api.github.com/repos/quri/nervecenter/issues/${PULL_REQUEST_ID}/comments`, {
    headers: {
      Authorization: `token ${OAUTH_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify({ body: content }),
  })
  .then((resp) => {
    console.log("Wipping coverage.txt...");
    execSync('>coverage.txt');
  })
  .catch((error) => console.error(error));

  // execSync(`curl -i -H 'Authorization: token ${OAUTH_TOKEN}' -d '{"body": ${content}}' https://api.github.com/repos/quri/nervecenter/issues/${PULL_REQUEST_ID}/comments`);
});


app.listen(1337, () => {
  execSync("which yarn || curl -o- -L https://yarnpkg.com/install.sh | bash", printError);
  execSync(`git -C nervecenter pull || git clone https://${OAUTH_TOKEN}:x-oauth-basic@github.com/quri/nervecenter.git`, printError)
  console.log('Example app listening on port 1337!');
});
