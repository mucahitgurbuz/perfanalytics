import { celebrate, Joi } from "celebrate";

export default celebrate({
  body: Joi.object()
    .keys({
      appCode: Joi.string()
        .min(4)
        .max(16)
        .required(),
      appName: Joi.string()
        .min(2)
        .max(64)
        .required(),
      password: Joi.string()
        .min(64)
        .max(64)
        .required(),
    })
    .unknown(false),
});
