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
        return new CustomErrorHandler(400, "User already exists");
    }
}

module.exports = CustomErrorHandler;
