import Joi from "joi";

export const validateCreateSchedule = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      "string.base": "Judul harus string.",
      "string.empty": "Judul tidak boleh kosong.",
      "string.min": "Judul harus memiliki setidaknya {#limit} karakter.",
      "string.max": "Judul tidak boleh melebihi {#limit} karakter.",
      "any.required": "Judul wajib diisi.",
    }),
    description: Joi.string().min(3).max(200).required().messages({
      "string.base": "Deskripsi harus string.",
      "string.empty": "Deskripsi tidak boleh kosong.",
      "string.min": "Deskripsi harus memiliki setidaknya {#limit} karakter.",
      "string.max": "Deskripsi tidak boleh melebihi {#limit} karakter.",
      "any.required": "Deskripsi wajib diisi.",
    }),
    date: Joi.date().iso().required().messages({
      "date.base": "Tanggal harus berupa tanggal yang valid.",
      "date.iso": "Format tanggal tidak valid (gunakan YYYY-MM-DD).",
      "date.empty": "Tanggal tidak boleh kosong",
      "any.required": "Tanggal wajib diisi.",
    }),
    time: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .required()
      .messages({
        "string.base": "Waktu harus string",
        "string.empty": "Waktu tidak boleh kosong.",
        "string.pattern.base": "Format waktu tidak valid (gunakan HH:MM).",
        "any.required": "Waktu wajib diisi.",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

export const validateUpdateSchedule = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      "string.base": "Deskripsi harus string.",
      "string.empty": "Deskripsi tidak boleh kosong.",
      "string.min": "Deskripsi harus memiliki setidaknya {#limit} karakter.",
      "string.max": "Deskripsi tidak boleh melebihi {#limit} karakter.",
      "any.required": "Deskripsi wajib diisi.",
    }),
    description: Joi.string().min(5).max(1000).required().messages({
      "string.base": "Deskripsi harus string.",
      "string.empty": "Deskripsi tidak boleh kosong.",
      "string.min": "Deskripsi harus memiliki setidaknya {#limit} karakter.",
      "string.max": "Deskripsi tidak boleh melebihi {#limit} karakter.",
      "any.required": "Deskripsi wajib diisi.",
    }),
    date: Joi.date().iso().required().messages({
      "date.base": "Tanggal harus berupa tanggal yang valid.",
      "date.iso": "Format tanggal tidak valid (gunakan YYYY-MM-DD).",
      "date.empty": "Tanggal tidak boleh kosong",
      "any.required": "Tanggal wajib diisi.",
    }),
    time: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .required()
      .messages({
        "string.base": "Waktu harus string.",
        "string.empty": "Waktu tidak boleh kosong.",
        "string.pattern.base": "Format waktu tidak valid (gunakan HH:MM).",
        "any.required": "Waktu wajib diisi.",
      }),
  })
    .min(1)
    .messages({
      "object.min":
        "Setidaknya satu field harus disediakan untuk pembaruan jadwal.",
    });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
