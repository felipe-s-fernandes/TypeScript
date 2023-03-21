import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

interface IResponse {
    data: any;
    error: string[] | null;
}

const postAccount = async (req: Request, res: Response) => {
    const user = req.body;

    const userData = {
        id: uuidv4(),
        email: user.email,
        name: user.name,
    };

    const response: IResponse = {
        data: userData,
        error: null,
    };

    res.status(200).send(response);
};

const patchAccount = async (req: Request, res: Response) => {
    const userData = req.body;

    const updatedUserData = {
        email: userData.email,
        name: userData.name,
    };

    const response: IResponse = {
        data: updatedUserData,
        error: null,
    };

    res.status(200).send(response);
};

const login = async (req: Request, res: Response) => {
    const response: IResponse = {
        data: { id: uuidv4() },
        error: null,
    };

    res.status(200).send(response);
};

const accountsController = {
    postAccount: postAccount,
    login: login,
    patchAccount: patchAccount,
};

export default accountsController;
