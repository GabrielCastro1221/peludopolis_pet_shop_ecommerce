const { engine } = require("express-handlebars");
const path = require("path");

module.exports = (app) => {
  app.engine(
    "handlebars",
    engine({
      helpers: {
        range: function (start, end) {
          let range = [];
          for (let i = start; i <= end; i++) {
            range.push(i);
          }
          return range;
        },
        isEqual: function (a, b) {
          return a === b;
        },
        eq: function (a, b) {
          return a === b;
        },
        multiply: function (a, b) {
          return a * b;
        },
      },
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      },
    })
  );
  app.set("view engine", "handlebars");
  app.set("views", path.join(__dirname, "../views"));
};
