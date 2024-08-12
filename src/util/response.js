// Valid HTTP Status codes returned from API Server
export const validStatus = {
  OK: 200,
  CREATED: 201,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
}

class Status {
  constructor(name, status, message = '') {
    this.NAME = name
    this.HTTP_STATUS = status
    this.MESSAGE = message
  }
}

// Custom Error templates
export const errCode = {
  DEFAULT: new Status("INTERNAL SERVER ERROR", validStatus.INTERNAL_SERVER_ERROR, "Something goes wrong"),
  NOT_FOUND: new Status("NOT FOUND", validStatus.NOT_FOUND, "Resource doesn't exists"),
  FAILED: new Status("FAILED", validStatus.BAD_REQUEST, "Failed to complete the request"),
  OK: new Status("SUCCESS", validStatus.OK, null),
  CREATED: new Status("CREATED", validStatus.CREATED, null),
  VALIDATION_ERROR: new Status("VALIDATION FAILURE", validStatus.UNPROCESSABLE_ENTITY, "Request can not be processed"),
}

/**
 * Express JSON Response generator
 * @param {Response} res Express Response
 * @param {Number} statusCode Status codes
 * @param {String} status http status
 * @param {String} message Error message (optional)
 * @param {String} data Response data (optional)
 * @returns Express json Response
 */
export const generateResponse = (res, statusCode, status, message = null, data = null) => {
  return res.status(statusCode).json({
    status, message, data
  })
} 