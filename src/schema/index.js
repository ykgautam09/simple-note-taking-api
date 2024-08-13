import Joi from "joi";

export const createNoteSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200).required(),
  body: Joi.string().trim().min(1).required()
})

export const noteIdSchema = Joi.number().integer().min(1).max(Number.MAX_SAFE_INTEGER).required()