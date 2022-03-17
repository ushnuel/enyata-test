const server = {
  async start() {
    const app = initializeApp();
    addErrorResponses(app);
    connectToDatabase();
    await runMigrations();
    runApp(app);
  }
};

function initializeApp() {
  const express = require("express");
  const router = require("./config/routes");
  const configureEnvironment = require("./config/environment");
  const cors = require("cors");

  // Setup Environment Variables
  configureEnvironment();

  const app = express();

  app.use(cors());

  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));

  // parse application/json
  app.use(express.json());

  // api/controllers entry point
  app.use("/", router); 

  return app;
}

function addErrorResponses(app) {
  app.use((req, res, next) => {
    res.status(404).send("Resource not found");
  });

  app.use((error, req, res, next) => {
    const ApiError = require("./api_error");

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        message: error.message,
        ...error.extraAttributes
      });
    }

    console.log(error.stack)
    res.status(500).json({
      message: "Something went wrong"
    });
  });
}

function connectToDatabase() {
  const sequelize = require("./db/sequelize");

  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
}

async function runMigrations() {
  const sequelize = require("./db/sequelize");
  const Umzug = require("umzug");

  const umzug = new Umzug({
    storage: "sequelize",
    storageOptions: {
      sequelize
    },
    migrations: {
      params: [sequelize.getQueryInterface(), sequelize.constructor],
      path: process.cwd() + "/db/migrations"
    }
  });

  await umzug.up();
}

function runApp(app) {
  app.listen(process.env.PORT || 8000, () => console.log("Server Started Successfully"));
}

server.start();

module.exports = server;
