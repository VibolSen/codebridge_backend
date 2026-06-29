import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import packagesRoutes from './routes/packages.routes';
import servicesRoutes from './routes/services.routes';
import teamMembersRoutes from './routes/teamMembers.routes';
import usersRoutes from './routes/users.routes';
import projectsRoutes from './routes/projects.routes';
import projectRequestsRoutes from './routes/projectRequests.routes';
import contactRoutes from './routes/contact.routes';
import adminRoutes from './routes/admin.routes';
import { setupSwagger } from './lib/swagger';

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/team-members', teamMembersRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/project-requests', projectRequestsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
