const express = require("express");
const morgan = require('morgan');
require('dotenv').config();
const router = require("./routes");

const app = express();

app.use("/api", router);
app.use(morgan());
app.use((request, response) => {
    response.status(404).send('Sorry cant find that!');
  });

app.listen(8080, () => {
    console.log("Server running at port 8080")
})