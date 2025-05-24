import db from "../config/database.js";

export const getAllSchedules = (user, callback) => {
  const sql = "SELECT * FROM schedule WHERE user_id = ?";
  const values = [user.user_id];
  db.query(sql, values, callback);
};

export const insertSchedule = (user, callback) => {
  const sql =
    "INSERT INTO schedule (user_id, title, description, date, time) VALUES (?, ?, ?, ?, ?)";
  const values = [
    user.user_id,
    user.title,
    user.description,
    user.date,
    user.time,
  ];
  db.query(sql, values, callback);
};

export const updateSchedule = (user, callback) => {
  const sql =
    "UPDATE schedule SET title = ?, description = ?, date = ?, time = ? WHERE id = ? and user_id = ?";
  const values = [
    user.title,
    user.description,
    user.date,
    user.time,
    user.id,
    user.user_id,
  ];
  db.query(sql, values, callback);
};

export const deleteSchedule = (user, callback) => {
  const sql = "DELETE FROM schedule WHERE id = ? and user_id = ?";
  const values = [user.id, user.user_id];
  db.query(sql, values, callback);
};
