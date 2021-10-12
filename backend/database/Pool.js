import pg from "pg";
const Pool = pg.Pool;

const pool = new Pool(
    {
        user: "postgres",
        password: "12345678gg1",
        host: "localhost",
        port: "5432",
        database: "pgeeblog"

    }
);

export default pool;