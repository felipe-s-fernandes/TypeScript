import authenticate from "../middleware/authenticate.js";
import express from "express";
const accountsRouter = express.Router();
import accountsController from "../controllers/accounts.js";

accountsRouter.post("/", accountsController.create);
accountsRouter.post("/login", accountsController.login);
accountsRouter.patch("/", authenticate, accountsController.edit);

export default accountsRouter;
