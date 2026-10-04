import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import projectsRoutes from './routes/projects.routes';
import progressRoutes from './routes/progress.routes';
import notesRoutes from './routes/notes.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/notes', notesRoutes);

app.use(errorHandler);

export default app;
