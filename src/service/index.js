import sql from "./../config/db.js"
import { errCode } from "../util/response.js";
import { AppError } from "../util/error.js";

export const createNote = async (note) => {
  try {
    return await sql`INSERT INTO "note" ${sql(note, 'title', 'body')}`
  } catch (error) {
    if (error.statusName) {
      throw error;
    }
    else {
      throw new AppError(errCode.FAILED.HTTP_STATUS, errCode.FAILED.NAME, errCode.FAILED.MESSAGE)
    }
  }
}