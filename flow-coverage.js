/* eslint-disable no-console */

// To run this file : `$ node npm-scripts/flow-coverage.js`

const exec = require("child_process").exec;

exec("git diff --name-only master..$(git symbolic-ref HEAD)", (error, stdout) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  const NOT_A_JS_FILE_MESSAGE = "not a js file";

  const filesChanged = stdout.split("\n");

  const percentages = filesChanged.map((filename) => {
    const isAJavaScriptFile = filename.match(/\.js$/);

    if (isAJavaScriptFile) {
      return new Promise((resolve) => {
        exec(`./node_modules/.bin/flow coverage ${filename}`, (fileError, fileStdout) => {
          const percentageRegex = /\d+(?:\.\d+)?%/g;
          const percentage = parseFloat(percentageRegex.exec(fileStdout)[0], 10);

          console.log(`${percentage}% : ${filename}`)

          return resolve(percentage);
        });
      });
    }

    return NOT_A_JS_FILE_MESSAGE;
  });

  const res = Promise
                .all(percentages)
                .then((filesCoverage) => filesCoverage.filter((item) => item !== NOT_A_JS_FILE_MESSAGE))
                .then((jsFileCoverages) => {
                  console.log("============")
                  const averageFlowCoverage = jsFileCoverages.reduce((acc, curr) => acc += curr, 0) / jsFileCoverages.length;
                  console.log("Average Flow coverage :", averageFlowCoverage);
                });
});
