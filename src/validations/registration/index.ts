import Joi from "joi";

const registrationPayload:any = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})

export = {
    registrationPayload
}