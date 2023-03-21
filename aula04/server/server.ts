import express from "express";
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 8000;
const HOSTNAME = process.env.HOST || "localhost";

const app = express();

app.use(express.json());
app.use(express.static("dist"));

import router from "./api/router";
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on http://${HOSTNAME}:${PORT}`);
});
