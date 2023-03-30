var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ConnectDB from "../database/postgres.js";
import { v4 as uuidv4 } from "uuid";
class AccountsRepositories {
    constructor() {
        this.db = new ConnectDB();
    }
    insertNewAccount(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountData = yield this.db.query(`
            INSERT INTO accounts (id, email, name, password)
            VALUES($1, $2, $3, $4)
            RETURNING id, email, name;
            `, [uuidv4(), user.email, user.name, user.password]);
                return {
                    status: 201,
                    message: "New account created successfully",
                    data: accountData[0],
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    message: "Error creating new account",
                    data: null,
                };
            }
        });
    }
    findAccount(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = yield this.db.query(`
            SELECT id FROM accounts
            WHERE email = $1 AND password = $2;`, [user.email, user.password]);
                if (userID.length === 0) {
                    return {
                        status: 403,
                        message: "Invalid credential(s)",
                        data: null,
                    };
                }
                return {
                    status: 201,
                    message: "User logged in successfully",
                    data: userID[0],
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    message: "Database error, please try again",
                    data: null,
                };
            }
        });
    }
    changeAccount(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountData = yield this.db.query(`
                UPDATE accounts
                SET name = $1, email = $2, password = $3
                WHERE id = $4
                RETURNING id, email, name;  
                `, [user.name, user.email, user.password, id]);
                return {
                    status: 201,
                    message: "User updated successfully",
                    data: accountData[0],
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    message: "Error updating account",
                    data: null,
                };
            }
        });
    }
}
const accountsRepositories = new AccountsRepositories();
export default accountsRepositories;
