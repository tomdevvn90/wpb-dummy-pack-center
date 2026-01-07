import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
// import errorMiddleware from './middlewares/error.middleware';
import { authMiddleware } from './middlewares/auth.middleware';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(authMiddleware);
app.use('/api', routes);


export default app;