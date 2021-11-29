const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();
require("dotenv").config();
require("./db/mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const user_router = require("./src/routes/user");
app.use(user_router);

app.get("/api", (req, res) => {
    res.send({ message: "Hello from server!" });
});





app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});