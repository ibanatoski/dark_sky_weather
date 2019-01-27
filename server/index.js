const express = require("express");
const path = require("path");
const cluster = require("cluster");
const bodyParser = require("body-parser");
var request = require("request");
const cors = require("cors");

require("dotenv").config();

const WORKERS = process.env.WEB_CONCURRENCY || 1;
const PORT = process.env.PORT || 5000;

function loggingMiddleware(req, res, next) {
  console.log("------------------------------");
  console.log("req.user", req.user);
  console.log("header.authorization: ", req.headers.authorization);
  console.log("ip:", req.ip);
  next();
}

var app = express();
app.use(cors());
app.use(bodyParser.json());

if (app.get("env") == "development") {
  require("dotenv").config();
}

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < WORKERS; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${
        worker.process.pid
      } exited: code ${code}, signal ${signal}`
    );
  });
} else {
  //Log traffic through API
  app.use(loggingMiddleware);

  app.use("/api/forecast/ip", (req, res) => {
    request(
      `http://api.ipstack.com/${req.ip}?access_key=${process.env.IP_STACK_API}`,
      function(error, response, body) {
        if (error) {
          next(error);
        } else {
          var body = JSON.parse(body);
          var lat = body.latitude;
          var lng = body.longitude;

          request(
            `https://api.darksky.net/forecast/${
              process.env.DARK_SKY_API
            }/${lat},${lng}`,
            function(errror, response, body) {
              if (error) {
                next(error);
              } else {
                res.json({
                  locationData: res.locationData,
                  weatherData: JSON.parse(body)
                });
              }
              console.log("------------------------------");
            }
          );
        }
      }
    );
  });

  app.use("/api/forecast/zipcode/:zip", (req, res) => {
    request(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${
        req.params.zip
      }&key=${process.env.GOOGLE_MAPS_API}`,
      function(error, response, body) {
        if (error) {
          next(error);
        } else {
          var body = JSON.parse(body);
          res.locationData = body.results;

          var lat = body.results[0].geometry.location.lat;
          var lng = body.results[0].geometry.location.lng;

          request(
            `https://api.darksky.net/forecast/${
              process.env.DARK_SKY_API
            }/${lat},${lng}`,
            function(errror, response, body) {
              if (error) {
                next(error);
              } else {
                res.json({
                  locationData: res.locationData,
                  weatherData: JSON.parse(body)
                });
              }
              console.log("------------------------------");
            }
          );
        }
      }
    );
  });

  app.get("/api/forecast/:lat/:lng", (req, res) => {
    console.log();
    request(
      `https://api.darksky.net/forecast/${process.env.DARK_SKY_API}/${
        req.params.lat
      },${req.params.lng}`,
      function(errror, response, body) {
        if (error) {
          next(error);
        } else {
          res.send(body);
        }
        console.log("------------------------------");
      }
    );
  });

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
  });

  // app.get('*', function (req, res) {
  //   const index = path.join(__dirname, 'build', 'index.html');
  //   res.sendFile(index);
  // });

  app.listen(PORT, function() {
    console.error(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });
}
