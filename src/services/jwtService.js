const jwt = require("jsonwebtoken");
const GWT_SECRET = "thisismysecretdfsfdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfs";

class JwtService {
    static sign(payload, expiry = "60s", secret = GWT_SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }
}

module.exports = JwtService; 