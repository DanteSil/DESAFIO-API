const { hash } = require("bcryptjs");
const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");




class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(checkUserExists) {
      throw new AppError("Usuário já cadastrado.");
    }

    const hashedPassword = await hash(password, 5)

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [ name, email, hashedPassword]
    );

    return response.status(201).json();
  }

  async upDate(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

     const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    
    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE id = (?)", [email]);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este E-mail já existe")
    }

    user.name = name;
    user.email = email;

    database.run(`UPDATE users SET
    name = ?,
    email = ?,
    updated_at = ?
    WHERE id = ?`,
    [user.name, user.email, new Date(), id]);

    return response.json( )
  }
}

module.exports = UserController