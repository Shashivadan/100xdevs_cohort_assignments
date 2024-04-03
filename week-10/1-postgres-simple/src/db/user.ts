import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(
  username: string,
  password: string,
  name: string
) {
  const query: string =
    "INSERT INTO users (username , password , name ) VALUES ($1,$2,$3);";

  const result = await client.query(query, [username, password, name]);

  return result.rows[0];
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  const query: string = "SELECT * FROM users WHERE id = $1";
  const result = await client.query(query, [userId]);
  return result.rows[0];
}
