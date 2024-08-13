import sql from "./../config/db.js"
import { errCode } from "../util/response.js";
import { AppError } from "../util/error.js";

export const createNote = async (note) => {
  try {
    return await sql`INSERT INTO "note" ${sql(note, 'title', 'body')};`
  } catch (error) {
    if (error.statusName) {
      throw error;
    }
    else {
      throw new AppError(errCode.DEFAULT.HTTP_STATUS, errCode.DEFAULT.NAME, errCode.DEFAULT.MESSAGE)
    }
  }
}

export const fetchNoteById = async (id) => {
  try {
    const columns = ['id', 'title', 'body']
    return await sql`SELECT  ${sql(columns)} FROM "note" WHERE "id" = ${id};`
  } catch (error) {
    if (error.statusName) {
      throw error;
    }
    else {
      throw new AppError(errCode.DEFAULT.HTTP_STATUS, errCode.DEFAULT.NAME, errCode.DEFAULT.MESSAGE)
    }
  }
}

export const searchNoteByTitle = async (params) => {
  try {
    const { title, page, limit } = params;

    const columns = ['id', 'title', 'body']
    return await sql`SELECT ${sql(columns)} FROM "note" WHERE "title" like ${`%${title}%`} ORDER BY "id" limit ${limit} OFFSET ${page * limit};`
  } catch (error) {
    console.log({ error });

    if (error.statusName) {
      throw error;
    }
    else {
      throw new AppError(errCode.DEFAULT.HTTP_STATUS, errCode.DEFAULT.NAME, errCode.DEFAULT.MESSAGE)
    }
  }
}