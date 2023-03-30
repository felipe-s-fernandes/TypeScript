var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import accountsRepositories from "../repositories/accounts.js";
import { validateUser } from "../../helpers/userValidators.js";
class AccountsServices {
    createNewAccount(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validateUser(user)) {
                return {
                    status: 403,
                    message: "Invalid credential(s)",
                    data: null,
                };
            }
            const response = yield accountsRepositories.insertNewAccount(user);
            return response;
        });
    }
    loginService(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validateUser(user)) {
                return {
                    status: 403,
                    message: "Invalid credential(s)",
                    data: null,
                };
            }
            const response = yield accountsRepositories.findAccount(user);
            return response;
        });
    }
    updateAccount(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validateUser(user)) {
                return {
                    status: 403,
                    message: "Invalid credential(s)",
                    data: null,
                };
            }
            const response = yield accountsRepositories.changeAccount(user, id);
            return response;
        });
    }
}
const accountsServices = new AccountsServices();
export default accountsServices;
