import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { configDotenv } from 'dotenv';
import indexRoute from './src/routes/index.js';



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

export default app;