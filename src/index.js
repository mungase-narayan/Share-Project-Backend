const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    return res.send("Code Mitra YT");
});

app.post("/api/sign-up", (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    const signupSchema = Joi.object({
         fullName: Joi.string().min(3).required(),
         email: Joi.string().email().required(),
         password: Joi.string().min(5).required(),
         confirmPassword: Joi.ref("password"),
     });

    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Please check all fields ",
            error: error.message,
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password MisMatch",
        });
    }

    res.status(200).json({
        message: "data stored",
    });

    return res.json({ message: "Otp Sent Successfully" });
});

app.listen(5500, () => console.log("listening on port 5500"));

module.exports = app;
