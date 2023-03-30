import { NextFunction, Request, Response } from "express";
import jwtLib from "jsonwebtoken";

export default async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        jwtLib.verify(
            req.cookies["session"],
            process.env.JWTSECRET || "senha secreta"
        );
        next();
    } catch (error) {
        res.status(403).send({
            status: 403,
            message: "Failed authentication: user is not logged in",
            data: null,
        });
    }
}
