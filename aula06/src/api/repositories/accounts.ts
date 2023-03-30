import ConnectDB from "../database/postgres.js";
import { v4 as uuidv4 } from "uuid";
import { IUser, IResponse, ILogin } from "../../helpers/interfaces.js";

class AccountsRepositories {
    private db: ConnectDB;

    constructor() {
        this.db = new ConnectDB();
    }

    public async insertNewAccount(user: IUser): Promise<IResponse> {
        try {
            const accountData = await this.db.query(
                `
            INSERT INTO accounts (id, email, name, password)
            VALUES($1, $2, $3, $4)
            RETURNING id, email, name;
            `,
                [uuidv4(), user.email, user.name, user.password]
            );
            return {
                status: 201,
                message: "New account created successfully",
                data: accountData[0],
            };
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Error creating new account",
                data: null,
            };
        }
    }

    public async findAccount(user: ILogin): Promise<IResponse> {
        try {
            const userID = await this.db.query(
                `
            SELECT id FROM accounts
            WHERE email = $1 AND password = $2;`,
                [user.email, user.password]
            );
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
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Database error, please try again",
                data: null,
            };
        }
    }

    public async changeAccount(user: IUser, id: string) {
        try {
            const accountData = await this.db.query(
                `
                UPDATE accounts
                SET name = $1, email = $2, password = $3
                WHERE id = $4
                RETURNING id, email, name;  
                `,
                [user.name, user.email, user.password, id]
            );
            return {
                status: 201,
                message: "User updated successfully",
                data: accountData[0],
            };
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Error updating account",
                data: null,
            };
        }
    }
}

const accountsRepositories = new AccountsRepositories();

export default accountsRepositories;
