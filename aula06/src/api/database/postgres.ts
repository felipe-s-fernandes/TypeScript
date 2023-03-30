import { config } from "dotenv";
config();
import pg from "pg";
const { Pool } = pg;

export default class ConnectDB {
    private _pool;
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

    public async query(command: string, array?: Array<string | null>) {
        const client = await this._pool.connect();
        try {
            await client.query("BEGIN");
            const response = await client.query(command, array);
            await client.query("COMMIT");
            client.release();
            return response.rows;
        } catch (error) {
            await client.query("ROLLBACK");
            client.release();
            throw error;
        }
    }
}
