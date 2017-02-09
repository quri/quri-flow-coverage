# Nervecenter-flow

Nervecenter-flow is a small node server, that run flow coverage and publish the results on Nervecenter PRs from the github account wiseview-builder.

## Getting Started

Create a file `credentials.js` :

```js
module.exports = {
  OAUTH_TOKEN : <OAUTH_TOKEN>,
};
```

You should be able to run the server with:
```bash
$ node server.js
```
