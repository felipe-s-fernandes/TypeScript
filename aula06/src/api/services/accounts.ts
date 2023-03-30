import accountsRepositories from "../repositories/accounts.js";
import { IUser, ILogin, IResponse } from "../../helpers/interfaces.js";
import { validateUser } from "../../helpers/userValidators.js";

class AccountsServices {
    public async createNewAccount(user: IUser): Promise<IResponse> {
        if (validateUser(user)) {
            return {
                status: 403,
                message: "Invalid credential(s)",
                data: null,
            };
        }

        const response: IResponse = await accountsRepositories.insertNewAccount(
            user
        );
        return response;
    }

    public async loginService(user: ILogin): Promise<IResponse> {
        if (validateUser(user)) {
            return {
                status: 403,
                message: "Invalid credential(s)",
                data: null,
            };
        }

        const response: IResponse = await accountsRepositories.findAccount(
            user
        );
        return response;
    }

    public async updateAccount(user: IUser, id: string) {
        if (validateUser(user)) {
            return {
                status: 403,
                message: "Invalid credential(s)",
                data: null,
            };
        }

        const response: IResponse = await accountsRepositories.changeAccount(
            user,
            id
        );
        return response;
    }
}

const accountsServices = new AccountsServices();
export default accountsServices;
