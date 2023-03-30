var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import accountsServices from "../services/accounts.js";
import jwtLib from "jsonwebtoken";
class AccountsController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const user = {
                name: userData.name,
                email: userData.email,
                password: userData.password,
            };
            const response = yield accountsServices.createNewAccount(user);
            res.status(response.status).send(response);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginData = req.body;
            const user = {
                email: loginData.email,
                password: loginData.password,
            };
            const response = yield accountsServices.loginService(user);
            if (response.data) {
                const jwt = jwtLib.sign({ data: response.data }, process.env.JWTSECRET || "senha secreta");
                res.cookie("session", jwt);
            }
            res.status(response.status).send(response);
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedJwt = jwtLib.verify(req.cookies["session"], process.env.JWTSECRET || "senha secreta");
            const userID = decodedJwt.data.id;
            const updatedUserData = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
            };
            const response = yield accountsServices.updateAccount(updatedUserData, userID);
            res.status(response.status).send(response);
        });
    }
}
const accountsController = new AccountsController();
export default accountsController;
