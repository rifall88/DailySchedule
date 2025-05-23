import bcrypt, { hash } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { createUser, findbyemail } from "../models/usermodel.js";

const myjwtsecret = "f6789gh11";

export const register = (req, res) => {
  const user = req.body;
  if (!user.name || !user.email || !user.password) {
    return res.status(400).json({ message: "Semua Harus Di Isi" });
  }
  findbyemail(user, (err, data) => {
    if (err) return res.status(500).json({ message: "Server Error" });
    if (data.length > 0) {
      return res.status(400).json({ message: "Email Sudah Ada" });
    }

    //10 menandakan seberapa kuat password hashnya
    bcrypt.hash(user.password, 10, (err, hashedpassword) => {
      if (err) return res.status(500).json({ message: "Server Error" });
      user.password = hashedpassword;

      createUser(user, (err, data) => {
        console.log(user);
        if (err)
          return res.status(500).json({ message: "Gagal Membuat Users" });
        res.status(201).json({ message: "Registrasi Berhasil" });
      });
    });
  });
};

export const login = (req, res) => {
  const user = req.body;
  if (!user.email || !user.password) {
    return res.status(400).json({ message: "Semua Harus Di Isi" });
  }
  findbyemail(user, (err, data) => {
    if (err) return res.status(500).json({ message: "Server Error" });
    if (data.length === 0) {
      return res.status(400).json({ message: "Email tidak ditemukan" });
    }

    //Ambil data[0].password sebagai password yang sudah di-hash dari database
    const hashedpassword = data[0].password;

    //membandingkan pasword yang di input user dengan password yang ada di database
    bcrypt.compare(user.password, hashedpassword, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Server Error" });
      if (!isMatch) {
        return res.status(401).json({ message: "Password Salah" });
      }
      const userdata = data[0];
      //sign digunakan untuk membuat token
      const token = jsonwebtoken.sign(
        { id: userdata.id, email: userdata.email }, //payload: data user yang akan di simpan di token
        myjwtsecret,
        {
          expiresIn: "1h", //digunakan untuk mengatur masa kadaluarsa token
        }
      );
      res.status(200).json({
        message: "Login Berhasil",
        token,
      });
    });
  });
};
