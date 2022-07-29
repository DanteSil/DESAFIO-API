const createUser = `
  CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR,
	email VARCHAR,
	password INTEGER,
	avatar VARCHAR NULL,
	created_at DATE,
	updated_at DATE 
)`

module.exports = createUser