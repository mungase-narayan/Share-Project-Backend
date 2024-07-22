const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        fullName: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 30,
        },
        userName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
