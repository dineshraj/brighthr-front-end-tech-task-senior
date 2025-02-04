import { RequestLike, Router } from 'itty-router';

import Absences from './handlers/absences';
import Conflict from './handlers/conflicts';

const router = Router();

const handleRender = () => new Response('Hello from the server!');

router
  .get('/api/absences', Absences)
  .get('/api/conflict/:id', Conflict)
  .get('/', handleRender)
  .get('*', () => new Response('Not found dude', { status: 404 }));

export default {
  async fetch(request: RequestLike) {
    return router.handle(request);
  },
};
