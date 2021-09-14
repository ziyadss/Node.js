require('dotenv').config();

const app = require('./config/app');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DB_STRING.replace('<password>', process.env.DB_PASSWORD))
  .then(() => null)
  .catch(() => null);

const hostName = process.env.HOST_NAME || 'localhost';
const port = process.env.PORT || 8080;
// const baseURL = `http://${hostName}:${port}`;

//app.get('env')

app.listen(port, hostName);
