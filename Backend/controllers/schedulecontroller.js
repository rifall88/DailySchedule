import {
  getAllSchedules,
  insertSchedule,
  updateSchedule,
  deleteSchedule,
} from "../models/schedulemodel.js";

export const tampil = (req, res) => {
  const user = req.user;
  getAllSchedules({ user_id: user.id }, (err, data) => {
    if (err) return res.status(404).json({ message: "Jadwal Tidak Ada" });
    res.json(data);
  });
};

export const tambah = (req, res) => {
  const user = req.body;
  const userid = req.user.id;

  const newSchedule = {
    user_id: userid,
    title: user.title,
    description: user.description,
    date: user.date,
    time: user.time,
  };

  insertSchedule(newSchedule, (err, data) => {
    if (err) return res.status(400).json({ message: "Input Gagal" });
    res.json(data);
  });
};

// export const update = (req, res) => {
//   const { kd_produk } = req.params;
//   const produk = req.body;
//   updateProduk(kd_produk, produk, (err, data) => {
//     if (err) return res.status(500).json({ message: "Update Gagagl" });
//     res.json(data);
//   });
// };

// export const hapus = (req, res) => {
//   const produk = req.body;
//   deleteProduk(produk, (err, data) => {
//     if (err) return res.status(404).json({ message: "Data Tidak Ada" });
//     res.json(data);
//   });
// };
