/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler';

import * as appHandler from '@/app/api/wine/route';
import wineApiSource from '@/app/api/wine/data.json'

it('the wine api route should respond with 200 and the wine data supplied', async () => {
  await testApiHandler({
    appHandler,
    async test({ fetch }) {
      const res = await fetch({ method: 'GET'});
      expect(res.status).toBe(200);
      await expect(res.json()).resolves.toStrictEqual(wineApiSource);
    }
  });
});