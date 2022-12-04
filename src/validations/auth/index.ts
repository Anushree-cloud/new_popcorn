import Joi from "joi";

const loginPayloadValidator = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export = {
    loginPayloadValidator
}