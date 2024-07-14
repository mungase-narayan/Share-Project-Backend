const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    return res.send("Code Mitra YT");
});

app.post("/api/sign-up", (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    const signUpSchema = Joi.object({
        fullName: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.ref("password"),
    });

    const { error } = signUpSchema.validate(req.body)
    if(error){
        return res.status(400).json({massage: "All Field Are required", error: error.details[0].message})
    }
    return res.json({ message: "Otp Sent Successfully" });
});

app.listen(5500, () => console.log("listening on port 5500"));

module.exports = app;
