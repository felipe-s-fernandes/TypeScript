//@Autor {Felipe Fernandes}
import express from "express";
import accountsRouter from "./routes/accounts";

const router = express.Router();

router.use("/accounts", accountsRouter);

export default router;
