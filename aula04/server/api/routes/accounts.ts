import express from "express";
const accountsRouter = express.Router();
import accountsController from "../controllers/accounts";

accountsRouter.post("/", accountsController.postAccount);
accountsRouter.post("/login", accountsController.login);
accountsRouter.patch("/", accountsController.patchAccount);

export default accountsRouter;
