const UserRepository = require("../repositories/userRepository");
const UserCreateService = require("../services/user/UserCreateService");
const UserUpdateService = require('../services/user/UserUpdateService');

const userRepository = new UserRepository();


class UsersController {
    async create(request, response) {
        const { name, email, password} = request.body;

        const userCreateService = new UserCreateService(userRepository);

        await userCreateService.execute({name, email, password});

        return response.status(201).json();
    }

    async update(request, response) {
        const {name, email, password, old_password} = request.body;
        const user_id = request.user.id;

        const userUpdateService = new UserUpdateService(userRepository);

        await userUpdateService.execute({name, email, password, old_password, user_id})
        
        return response.status(200).json();
    }
}

module.exports = UsersController;