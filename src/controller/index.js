import * as service from "./../service/index.js"
import { errCode, generateResponse, validStatus } from "../util/response.js";
import { AppError } from "../util/error.js";
import { createNoteSchema, noteIdSchema, noteTitleSchema } from "../schema/index.js";

export const healthCheck = (_req, res, next) => {
  try {
    return generateResponse(res, errCode.OK.HTTP_STATUS, errCode.OK.NAME, "Server up and running...")
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const createNote = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const { error, value } = createNoteSchema.validate(reqBody, { abortEarly: false })
    if (error) {
      throw new AppError(errCode.VALIDATION_ERROR, error.message, reqBody)
    }

    const response = await service.createNote(value);

    return generateResponse(res, errCode.CREATED.HTTP_STATUS, errCode.CREATED.NAME, null, response)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const fetchNoteById = async (req, res, next) => {
  try {
    const reqId = req.params.id;
    const { error, value } = noteIdSchema.validate(reqId, { abortEarly: false })
    if (error) {
      throw new AppError(errCode.VALIDATION_ERROR, error.message, reqId)
    }

    const response = await service.fetchNoteById(value);

    return generateResponse(res, errCode.OK.HTTP_STATUS, errCode.OK.NAME, null, response)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const searchNoteByTitle = async (req, res, next) => {
  try {
    const reqTitle = req.query;
    const { error, value } = noteTitleSchema.validate(reqTitle, { abortEarly: false })
    if (error) {
      throw new AppError(errCode.VALIDATION_ERROR, error.message, reqTitle)
    }

    const response = await service.searchNoteByTitle(value);

    return generateResponse(res, errCode.OK.HTTP_STATUS, errCode.OK.NAME, null, response)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const updateNoteById = async (req, res, next) => {
  try {
    const reqId = req.params.id, reqBody = req.body;

    const { error: idError, value: idValue } = noteIdSchema.validate(reqId, { abortEarly: false })
    const { error: bodyError, value: bodyValue } = createNoteSchema.validate(reqBody, { abortEarly: false })
    if (idError || bodyError) {
      throw new AppError(errCode.VALIDATION_ERROR, idError.message || bodyError.message, idError ? reqId : reqBody)
    }

    const response = await service.updateNoteById(idValue, bodyValue);

    return generateResponse(res, errCode.OK.HTTP_STATUS, errCode.OK.NAME, null, response)
  } catch (error) {
    console.error(error)
    next(error)
  }
}