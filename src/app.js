if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan")("dev");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const logger = require("./config/logger");

app.use(cors());
app.use(morgan);
app.use(express.json());
app.use(logger);

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
