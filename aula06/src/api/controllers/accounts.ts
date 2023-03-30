import accountsServices from "../services/accounts.js";
import jwtLib, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { IUser, IResponse, ILogin } from "../../helpers/interfaces.js";

class AccountsController {
    public async create(req: Request, res: Response) {
        const userData = req.body;

        const user: IUser = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
        };

        const response: IResponse = await accountsServices.createNewAccount(
            user
        );

        res.status(response.status).send(response);
    }

    public async login(req: Request, res: Response) {
        const loginData = req.body;

        const user: ILogin = {
            email: loginData.email,
            password: loginData.password,
        };

        const response: IResponse = await accountsServices.loginService(user);

        if (response.data) {
            const jwt = jwtLib.sign(
                { data: response.data },
                process.env.JWTSECRET || "senha secreta"
            );
            res.cookie("session", jwt);
        }

        res.status(response.status).send(response);
    }

    public async edit(req: Request, res: Response) {
        const decodedJwt = jwtLib.verify(
            req.cookies["session"],
            process.env.JWTSECRET || "senha secreta"
        ) as JwtPayload;
        const userID = decodedJwt.data.id;

        const updatedUserData: IUser = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
        };

        const response: IResponse = await accountsServices.updateAccount(
            updatedUserData,
            userID
        );
        res.status(response.status).send(response);
    }
}

const accountsController = new AccountsController();

export default accountsController;
