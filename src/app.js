const {json} = require("express");
const express = require("express");
const morgan = require('morgan');
require('dotenv').config();
const router = require("./routes");

const app = express();

app.use(json());
app.use(morgan("dev"));
app.use("/api", router);
app.use((request, response) => {
    response.status(404).send('Sorry cant find that!');
  });

app.listen(process.env.APP_PORT, () => {
    console.log("Server running at port 8080")
})