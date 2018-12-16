const express = require('express');

const startServer = config => {
  const app = express();

  config.endpoints.forEach(endpoint => {
    // Configure endpoints
    app[endpoint.method](`/${endpoint.path}`, (req, res) => {
      // Set Headers on response
      if (endpoint.headers) {
        endpoint.headers.forEach(header => {
          res.set(Object.keys(header)[0], Object.values(header)[0]);
        })
      }

      setTimeout(() => {
        // Send response
        res.status(endpoint.status).json(endpoint.body || {})
      }, endpoint.delay || 0);
    })
  })

  const server = app.listen(config.port);

  return server;
}

module.exports = { startServer }