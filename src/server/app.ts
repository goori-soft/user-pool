import express from 'express';
import cors from 'cors';
import { createApplicationRoute } from './routes/application';
import { AdaptersCollection } from '~/factories/types/AdaptersCollection';

export function createApp(adaptersColletion: AdaptersCollection) {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use('/api/app', createApplicationRoute(adaptersColletion));

  return app;
}
