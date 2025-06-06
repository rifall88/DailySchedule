import Joi from "joi";

// Validator untuk data registrasi user
export const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50).messages({
      "string.empty": "Nama pengguna tidak boleh kosong",
      "string.min":
        "Nama pengguna harus memiliki setidaknya {#limit} karakter.",
      "string.max": "Nama pengguna tidak boleh melebihi {#limit} karakter",
      "any.required": "Nama Pengguna Harus Di Isi",
    }),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    // Jika adrequiredvalidasi, kirim respons 400 dengan pesan error
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages });
  }
  // Jika validasi berhasil, lanjutkan ke middleware atau controller berikutnya
  next();
};

// Validator untuk data login user
export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    // Jika ada error validasi, kirim respons 400 dengan pesan error
    return res.status(400).json({ message: error.details[0].message });
  }
  // Jika validasi berhasil, lanjutkan ke middleware atau controller berikutnya
  next();
};
