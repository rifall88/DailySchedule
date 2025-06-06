import Joi from "joi";

export const validateCreateSchedule = (req, res, next) => {
  const schema = Joi.object({
    //user_id: Joi.number().integer().required(),
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).max(1000).required(),
    date: Joi.date().iso().required(), // Format YYYY-MM-DD
    time: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .optional(), // Format HH:MM
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

export const validateUpdateSchedule = (req, res, next) => {
  const schema = Joi.object({
    //user_id: Joi.number().integer().optional(),
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).max(1000).required(),
    date: Joi.date().iso().required(),
    time: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .required(),
  }).min(1); // Setidaknya satu field harus ada untuk update
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
