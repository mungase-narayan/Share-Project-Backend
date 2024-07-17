const express = require("express");
const router = require("./router")
const initDb = require("./config/db");
const errorHandler = require("./middlewares/error-handler")

const app = express();
initDb();

app.use(express.json())
app.use("/api", router);


app.get("/", (req, res) => {
    return res.send("Code Mitra YT");
});


app.use(errorHandler);
app.listen(5500, () => console.log("listening on port 5500"));

module.exports = app;
