var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwtLib from "jsonwebtoken";
export default function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            jwtLib.verify(req.cookies["session"], process.env.JWTSECRET || "senha secreta");
            next();
        }
        catch (error) {
            res.status(403).send({
                status: 403,
                message: "Failed authentication: user is not logged in",
                data: null,
            });
        }
    });
}
