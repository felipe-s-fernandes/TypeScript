var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from "dotenv";
config();
import pg from "pg";
const { Pool } = pg;
export default class ConnectDB {
    constructor() {
        this._pool = new Pool({
            user: process.env.DBUSER,
            host: process.env.DBHOST,
            database: process.env.DBNAME,
            password: process.env.DBPASSWORD,
            port: Number(process.env.DBPORT),
            max: 20,
            idleTimeoutMillis: 100,
        });
    }
    query(command, array) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this._pool.connect();
            try {
                yield client.query("BEGIN");
                const response = yield client.query(command, array);
                yield client.query("COMMIT");
                client.release();
                return response.rows;
            }
            catch (error) {
                yield client.query("ROLLBACK");
                client.release();
                throw error;
            }
        });
    }
}
