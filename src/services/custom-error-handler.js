class CustomErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }

    static createError(statusCode, message) {
        return new CustomErrorHandler(statusCode, message);
    }

    static userExists() {
        return new CustomErrorHandler(400, message);
    }

    static wrongCredentials(message = "Email or Password is wrong!") {
        return new customErrorHandler(401, message);
    }
}

module.exports = CustomErrorHandler;
