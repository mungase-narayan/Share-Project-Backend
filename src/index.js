const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.send("Code Mitra YT")
});

app.listen(5500, () => console.log("listening on port 6000"));

module.exports = app