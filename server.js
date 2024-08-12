import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { configDotenv } from 'dotenv';
import indexRoute from './src/routes/index.js';
import { AppError, handleError } from './src/util/error.js';
import { errCode, generateResponse, validStatus } from './src/util/response.js';



// configurations
configDotenv()
const SERVER_PORT = parseInt(process.env.SERVER_PORT) || 3000
const SERVER_HOST = process.env?.SERVER_HOST

const app = express();
app.use(bodyParser.json({ limit: "20mb" }));
app.use(logger('dev'));


// Routes
app.use('/', indexRoute);


// Server Set-up
app.listen(SERVER_PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server Up and Running at ${SERVER_HOST}:${SERVER_PORT}`);
})

// Error Handler middleware
// Not Found
app.use((req, res, next) => {
  if (!req.route) {
    next(new AppError(errCode.NOT_FOUND, validStatus.NOT_FOUND))
    return generateResponse(res, errCode.NOT_FOUND.HTTP_STATUS, errCode.NOT_FOUND.NAME, "Resource does not exists")
  }
})

// default err handler
app.use((err, req, res, _next) => {
  handleError(err, req, res);
})

// Set-up Graceful shutdown
process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed')
  })
})

export default app;