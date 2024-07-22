const Joi = require("joi");
const User = require("../model/user-model");
const bcrypt = require("bcrypt");
const JwtService = require("../services/jwtService");
const CustomErrorHandler = require("../services/custom-error-handler");

class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signup(req, res, next) {
        const { fullName, userName, email, password, confirmPassword } = req.body;

        const signupSchema = Joi.object({
            fullName: Joi.string().min(3).required(),
            userName: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required(),
            confirmPassword: Joi.ref("password"),
        });

         const { error } = signupSchema.validate(req.body);
         if (error) {
             return next(error);
         }

        try {
            const exist = await User.findOne({ email: req.body.email });
            if (exist) {
                return next(
                    CustomErrorHandler.alreadyExist(
                        "This email is already taken"
                    )
                );
            }
        } catch (err) {
            return next(err);
        }

        // Hash passwords
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare the model
        const user = new User({
            fullName,
            userName,
            email,
            password: hashedPassword,
        });

        let access_token;
        try {
            const result = await user.save();
            console.log("result :: ", result);
            // token
            access_token = await JwtService.sign({
                _id: result._id,
                role: result.role,
            });
        } catch (err) {
            console.log(err);
            return next(err);
        }

        return res.json({ access_token: access_token });
    }
    async login(req, res, next) {
        // CheckList
        // [] validate the request
        // [] authorize the request
        // [] Check if user is in database
        // [] check password
        // [] generate jwt token
        // [] send the response


        // Validation 
        const loginSchema = Joi.object({ 
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

        const { error } = loginSchema.validate(req.body);
        if(error){
            return next(error); 
        }

        try {
            const user = await User.findOne({email: req.body.email});
            if(!user){
                return next(CustomErrorHandler.wrongCredentials()); 
            }

            // Compare the password
            const match = await bcrypt.compare(req.body.password, user.password);
            if(!match){
                return next(CustomErrorHandler.wrongCredentials()); 
            } 
 
            // Token Generation
            const access_token = await JwtService.sign({_id: user._id})
            return res.json({ access_token: access_token}); 

        }catch(err){
            return next(err);
        }
    }

}

module.exports = AuthController;
