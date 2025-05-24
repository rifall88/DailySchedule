import jwt from "jsonwebtoken";
const myjwtsecret = "f6789gh11"; //digunakan sebagai kunci rahasia untuk mengenkripsi dan memverifikasi token JWT

const autmiddleware = (req, res, next) => {
  const autheader = req.headers.authorization; //digunakan untuk mengambil token jwt dan menyimpannya ke variabel autheaderHeader

  //Jika autheader kosong atau autheader ada isinya tetapi tidak di mulai dengan kata "Bearer "
  if (!autheader || !autheader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token Tidak Valid " });
  }

  const token = autheader.split(" ")[1]; //digunakan untuk memisahkan token dan kata bearer menjadi array dan mengambil arraynya

  try {
    const decoded = jwt.verify(token, myjwtsecret); //digunakan untuk memverivikasi isi token (valid atau tidak)
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token Tidak Valid" });
  }
};

export default autmiddleware;
