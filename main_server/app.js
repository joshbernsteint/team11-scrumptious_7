const express = require("express");
const app = express();
const session = require("express-session");
const configRoutes = require("./routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

configRoutes(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log(`Database server on ${PORT}`);
});
