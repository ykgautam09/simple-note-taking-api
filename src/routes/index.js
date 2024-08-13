import { Router } from "express";
const router = Router();
import * as controller from "./../controller/index.js"

router.get(('/'), controller.healthCheck)

/**
 * A Note
 * @typedef {object} Note
 * @property {string} title.required - The title
 * @property {string} body - The body
 */
/**
 * POST /notes
 * @summary Create a note
 * @tags Note
 * @param {Note} request.body.required - Note info
 * @return {object} 201 - Note response
 * @example response - 201 - success response example
  {
    "status": "CREATED",
    "message": null,
    "data": []
  }
*/
router.post(('/notes'), controller.createNote)

/**
 * GET /notes/{id}
 * @summary Fetch note by ID
 * @tags Note
 * @param {number} id.path.required - primary id of note
 * @return {object} 200 - Note response
 * @example response - 200 - success response example
{
  "status": "SUCCESS",
  "message": null,
  "data": [
    {
      "id": "1",
      "title": "note title",
      "body": "note body"
    }
  ]
}
*/
router.get(('/notes/:id'), controller.fetchNoteById)

/**
 * GET /notes/
 * @summary Search a note by title
 * @tags Note
 * @param {string} title.query.required - title substring of note
 * @param {number} page.path.optional - page of response (default 0)
 * @param {number} limit.path.optional - no of record to return (default 50)
 * @return {object} 200 - Note response
 * @example response - 200 - success response example
{
  "status": "SUCCESS",
  "message": null,
  "data": [
    {
      "id": "1",
      "title": "note title",
      "body": "note body"
    }
  ]
}
*/
router.get(('/notes/'), controller.searchNoteByTitle)

/**
 * PUT /notes/{id}
 * @summary Update a note by ID
 * @tags Note
 * @param {number} id.path.required - primary id of note
 * @param {Note} request.body.required - Note info
 * @return {object} 200 - Note response
 * @example response - 200 - success response example
  {
    "status": "SUCCESS",
    "message": null,
    "data": []
  }
*/
router.put(('/notes/:id'), controller.updateNoteById)

export default router;