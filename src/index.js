const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config()

const app = express();
const routes = require("./routes");
const config = require("./config");
const mongodb = require("./config/mongodb.config");

const configApp = async () => {
    app.use(morgan("dev"));

    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    // Useful if you're behind a reverse proxy
    app.enable('trust proxy');

    // Config cors options
    var corsOptions = {
        origin: "http://localhost:3000"
      };
    app.use(cors(corsOptions));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    // in latest body-parser use like below.
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(config.api.prefix, routes);
}

const startServer = async () => {
    console.log(`
      #####################################################
      ★                     LPI - Backend                 ★
      #####################################################
    `);
    
    configApp();

    const port = config.port;
    app.listen(port, () => {
      console.log(`Server started at *:${port}`);      
    });

    mongodb.connect();
}
startServer();


/* CHAMADA API DE TESTE
  axios.post('http://localhost:9000/api/post', {
    title: 'Finn',
    description: 'Williams',
    published: '1010'
  })
    .then(response => {
        console.log("dasdadasdada");
    });
*/