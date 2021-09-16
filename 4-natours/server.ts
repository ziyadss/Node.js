import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './config/app';

dotenv.config();
const DB_STRING = process.env.DB_STRING as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;

mongoose.connect(DB_STRING.replace('<password>', DB_PASSWORD));
// .then(() => {})
// .catch(() => {});

const hostName = process.env.HOST_NAME ?? 'localhost';
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
// const baseURL = `http://${hostName}:${port}`;

app.listen(port, hostName);
