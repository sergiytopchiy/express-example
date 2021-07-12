var express = require("express");
var app = express()

const SDC = require('statsd-client')
const sdc = new SDC({
  port: 8125,
  host: process.env.HOST,
  prefix: process.env.PREFIX
});

app.use(sdc.helpers.getExpressMiddleware('webhooks.events'));

app.listen(3000, () => {
 console.log("Server running on port 3000");
})

app.post("/test", async (req, res, next) => {
  sdc.increment('webhooks.events')
  res.json(["test"]);
})
