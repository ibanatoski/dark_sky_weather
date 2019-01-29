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
  console.log("ip:", req.headers["x-forwarded-for"]);
  req.client_ip =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
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

  app.get("/api/forecast/ip", (req, res) => {
    console.log("/api/forecast/ip");
    request(
      `http://api.ipstack.com/${req.client_ip}?access_key=${
        process.env.IP_STACK_API
      }`,
      function(error, response, loc) {
        var locBody = JSON.parse(loc);
        console.log("locBody", locBody);
        if (error || !locBody.latitude || !locBody.longitude) {
          console.log("ipstack error");
          throw new Error("could not locate IP"); // Express will catch this on its own.
        } else {
          var lat = locBody.latitude;
          var lng = locBody.longitude;
          locBody.formatted_address =
            locBody.city +
            ", " +
            locBody.region_code +
            " " +
            locBody.zip +
            " " +
            locBody.country_code;

          request(
            `https://api.darksky.net/forecast/${
              process.env.DARK_SKY_API
            }/${lat},${lng}`,
            function(errror, response, body) {
              if (error) {
                console.log("darksky error");
                res.json({ code: 500, error: "could not locate IP" });
              } else {
                res.json({
                  ip: req.client_ip,
                  locationData: locBody,
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

  app.get("/api/forecast/zipcode/:zip", (req, res, next) => {
    request(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${
        req.params.zip
      }&key=${process.env.GOOGLE_MAPS_API}`,
      function(error, response, body) {
        var body = JSON.parse(body);
        if (error || !body.results[0]) {
          next(error);
        } else if (body.results[0]) {
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
                  locationData: res.locationData[0],
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

  app.get("/api/location/ip", (req, res) => {
    request(
      `http://api.ipstack.com/${req.client_ip}?access_key=${
        process.env.IP_STACK_API
      }`,
      function(error, response, body) {
        if (error) {
          next(error);
        } else {
          var body = JSON.parse(body);
          var lat = body.latitude;
          var lng = body.longitude;
          res.send(body);
          console.log("------------------------------");
        }
      }
    );
  });

  app.get("/api/forecast/:lat/:lng/:timestamp", (req, res) => {
    request(
      `https://api.darksky.net/forecast/${process.env.DARK_SKY_API}/${
        req.params.lat
      },${req.params.lng},${
        req.params.timestamp
      }?exclude=currently,flags,minutely,daily,alerts`,
      function(error, response, body) {
        if (error) {
          next(error);
        } else {
          res.send(body);
        }
        console.log("------------------------------");
      }
    );
  });

  app.get("/api/forecast/:lat/:lng", (req, res) => {
    request(
      `https://api.darksky.net/forecast/${process.env.DARK_SKY_API}/${
        req.params.lat
      },${req.params.lng}`,
      function(error, response, body) {
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
