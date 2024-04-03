import { Client } from "pg";
// import { DB_URL } from "./config";

export const client = new Client({
  connectionString:
    "postgres://zyqkyugy:pRqT1DNsgD65GUy3UTdNwaTsAJQCJ1Q9@kiouni.db.elephantsql.com/zyqkyugy",
});
