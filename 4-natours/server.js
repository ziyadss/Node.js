require('dotenv').config();

const app = require('./app');

const hostName = process.env.HOST_NAME || 'localhost';
const port = process.env.PORT || 8080;
// const baseURL = `http://${hostName}:${port}`;

//app.get('env')

app.listen(port, hostName);
