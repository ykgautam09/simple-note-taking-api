import { generateResponse, errCode } from "./response.js";

/**
 *  Custom Application Error class
 */
export class AppError extends Error {
  constructor(errorCode, statusMessage, data = null) {
    super(errorCode);
    this.httpStatus = errorCode.HTTP_STATUS;
    this.statusName = errorCode.NAME;
    this.message = statusMessage;
    this.data = data;
  }
}

/**
 * Custom Error handler
 * @param {Error} err Error instance Generic/Custom
 * @param {Request} _req Express Request
 * @param {Response} res Express Response
 * @returns Express json Response
 */
export const handleError = (err, _req, res) => {
  // log application error
  console.error(err);
  if (err.statusName) {
    return generateResponse(
      res,
      err.httpStatus,
      err.statusName,
      err.message,
      err?.data || null
    );
  } else {
    return generateResponse(
      res,
      errCode.DEFAULT.HTTP_STATUS,
      errCode.DEFAULT.NAME,
      err?.message
    );
  }
};
