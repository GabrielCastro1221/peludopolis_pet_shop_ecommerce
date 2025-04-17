const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const bodyParserMiddleware = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, "../public")));
};

module.exports = bodyParserMiddleware;
