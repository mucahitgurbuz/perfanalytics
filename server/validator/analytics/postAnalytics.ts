import { celebrate, Joi } from "celebrate";

export default celebrate({
  body: Joi.object()
    .keys({
      appCode: Joi.string()
        .min(2)
        .max(64)
        .required(),
      fcp: Joi.number()
        .min(0)
        .max(124)
        .required(),
      ttfb: Joi.number()
        .min(0)
        .max(124)
        .required(),
      domLoad: Joi.number()
        .min(0)
        .max(124)
        .required(),
      windowLoad: Joi.number()
        .min(0)
        .max(124)
        .required(),
      file: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          type: Joi.string(),
          value: Joi.number()
            .min(0)
            .max(124)
            .required(),
        })
      ),
    })
    .unknown(false),
});
