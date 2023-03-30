import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./api/router.js";
import { config } from "dotenv";
config();

export default class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
        this.router();
    }

    private middleware() {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(cookieParser(process.env.JWTSECRET || "senha secreta"));
        this.server.use(express.static("dist"));
    }

    private router() {
        this.server.use(router);
    }
}
