
class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async getUserByEmail(email) {
        return await this.userModel.findOne({ email });
    }

    async createUser(user) {
        return await this.userModel.create({ email });
    }
}

module.exports = AuthService;
