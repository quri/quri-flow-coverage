/* eslint-disable no-console */

// To run this file : `$ node npm-scripts/flow-coverage.js`

const exec = require("child_process").exec;

module.exports = function runFlowCoverage(cb) {

  exec("git -C nervecenter diff --name-only master", (error, stdout) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    const NOT_A_JS_FILE_MESSAGE = "not a js file";

    const filesChanged = stdout.split("\n");
    const hasFilesChanged = filesChanged[0] !== "";


    const filesCoverage = filesChanged.map((filename, index) => {
      const flowBinaryResult = (resolve) => {
        exec(`./nervecenter/node_modules/.bin/flow coverage nervecenter/${filename}`, (fileError, fileStdout) => {
          if (fileError) {
            console.error(`flowBinaryResult error`, fileError);
          }
          const percentageRegex = /\d+(?:\.\d+)?%/g;
          console.log("JACQUIE", fileStdout);
          const percentage = parseFloat(percentageRegex.exec(fileStdout)[0], 10);
          console.log(`${percentage}% : ${filename}`);

          return resolve([percentage, filename]);
        });
      };

      const isAJavaScriptFile = filename.match(/src\/.*.js/);

      return isAJavaScriptFile && hasFilesChanged
        ? new Promise(flowBinaryResult)
        : NOT_A_JS_FILE_MESSAGE;
    });



    const buildMapOfCoverage = (mapAcc, curr) => {
        const fileName = curr[1];
        const fileCoverage = curr[0];
        mapAcc[fileName] = fileCoverage;
        return mapAcc;
    };

    const diffCoverage = Promise
                  .all(filesCoverage)
                  .then((filesCoverage) => filesCoverage
                      .filter((item) => item !== NOT_A_JS_FILE_MESSAGE)
                      .reduce(buildMapOfCoverage, {})
                  )
                  .catch((error) => console.log(error));

    return cb(diffCoverage);
  });
};
