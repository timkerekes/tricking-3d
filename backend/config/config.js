const username = "root";
const password = "tricking";
const database = "tricking3d-test";
const host = "127.0.0.1";
const port = 3306;
const dialect = "mysql";
export const config = {
	username,
	password,
	database,
	host,
	dialect,
	port,
	logging: console.log,
};