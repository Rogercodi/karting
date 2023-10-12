import { API } from "../../API";
import { UserApp } from "../../Repositories/appUser";

export interface IClientRepositories {
  postUser(user: UserApp): Promise<number>;
  getUser(email: string): Promise<UserApp> ;
}

export class ClientSqlRepositories implements IClientRepositories {
  constructor() {}

  async postUser(user: UserApp): Promise<number> {
    console.log("FACADE");
    let {
      id,
      email,
      lastLogin,
      name,
      password,
      role,
      surname,
      username,
      phone,
    } = user;
    let query =
      "INSERT INTO users (username, password, email, name, surname, contact, role_name, registerdate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    let values = [
      username,
      password,
      email,
      name,
      surname,
      phone,
      role,
      lastLogin,
    ];
    let result = await API.poolConnection.query(query, values);
    console.log(result);
    return result.rowCount;
  }

  async getUser(email: string): Promise<UserApp> {
    console.log(email)
    console.log("FACADE");
    let query = "SELECT * FROM users u WHERE u.email = $1";
    let values = [email]
    let result: UserApp = (await API.poolConnection.query(query, values)).rows[0]
    console.log(result)
    return result
}
}