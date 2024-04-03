import { Router } from 'express';
import { AdaptersCollection } from '~/factories/types/AdaptersCollection';
import { createApplication } from '~/core/createApplication';
import { HttpError } from '~/core/errors/HttpError';

export function createApplicationRoute(adaptersCollection: AdaptersCollection) {
  const applicationRouter = Router();

  applicationRouter.post('/', async (req, res) => {
    const body = req.body;
    try {
      const savedApplication = await createApplication(body, adaptersCollection);
      return res.json(savedApplication);
    } catch (e: any) {
      const code = e instanceof HttpError ? e.code : 500;
      const message = e instanceof HttpError ? e.toString() : 'Unknow server error';
      console.log(e);
      return res.status(code).json({
        status: 'fail',
        error: message,
      });
    }
  });

  return applicationRouter;
}
