import express from 'express';
import morgan from 'morgan';
import routes from './routes';

const app = express();

if (app.get('env') === 'development') app.use(morgan('dev'));

app
  .use(express.json())
  .use(express.static(`${__dirname}/../public`))
  .use(routes);

export default app;
