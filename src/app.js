const { json } = require("express");
require('dotenv').config();

const express = require("express");
const morgan = require('morgan');
const session = require("express-session");

const router = require("./routes");
const app = express();

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
})
);
app.use(json());
app.use(morgan());
app.use("/api", router);

app.listen(process.env.APP_PORT, () => {
    console.log("Server running at port 8080")
});