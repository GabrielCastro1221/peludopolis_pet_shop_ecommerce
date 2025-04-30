const express = require("express");
const path = require("path");

const bodyParserMiddleware = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../public")));
};

module.exports = bodyParserMiddleware;
