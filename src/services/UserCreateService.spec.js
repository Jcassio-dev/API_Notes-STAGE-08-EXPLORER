const UserCreateService = require('./UserCreateService');
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require('../utils/AppError');

describe("UserCreateService", () => {
    let userRepository = null;
    let userCreateService = null;

    beforeEach(() => {
         userRepository = new UserRepositoryInMemory();
         userCreateService = new UserCreateService(userRepository);
    });

    it("user should be create", async ()=> {
        const user = {
            name: "user test",
            email: "user@teste.com",
            password: "123"
        };
        
        const userCreated = await userCreateService.execute(user);
    
        expect(userCreated).toHaveProperty("id");
    });

    it("user not should be create with exists email", async ()=> {
        const user1 = {
            name: "user test 1",
            email: "user@teste.com",
            password: "123"
        };
        const user2 = {
            name: "user test 2",
            email: "user@teste.com",
            password: "456"
        };

        
        await userCreateService.execute(user1);
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."));

    })
})

