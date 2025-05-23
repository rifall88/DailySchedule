import db from "../config/database.js";

export const createUser = (user, callback) => {
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const values = [user.name, user.email, user.password];
  db.query(sql, values, callback);
};

export const findbyemail = (user, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const values = [user.email];
  db.query(sql, values, callback);
};
