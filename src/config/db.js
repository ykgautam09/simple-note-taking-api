import postgres from "postgres";
import { configDotenv } from 'dotenv';

configDotenv()
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const connection = postgres(DB_CONNECTION_STRING)

export default connection;