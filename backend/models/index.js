"use strict";

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import Sequelize from "sequelize";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
import config from "../config/config";
const db = {};
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		database: "tricking3d-test",
		username: "root",
		password: "tricking",
		host: "127.0.0.1",
		port: 3306,
		dialect: "mysql",
	}
);

try {
	await sequelize.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
	console.log("Config", config);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		const model = import(path.join(`file://${__dirname}`, file));
		if (typeof model != "function") return;
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
