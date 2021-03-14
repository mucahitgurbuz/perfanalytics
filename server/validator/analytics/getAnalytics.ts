import { celebrate, Joi } from "celebrate";

export default celebrate({
  query: Joi.object()
    .keys({
      appCode: Joi.string()
        .min(4)
        .max(16)
        .required(),
      start: Joi.date()
        .iso()
        .required(),
      end: Joi.date()
        .iso()
        .min(Joi.ref("start"))
        .required(),
    })
    .unknown(false),
});
