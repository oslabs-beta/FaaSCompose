import { createMocks } from 'node-mocks-http';
import handleSave from '../pages/api/composition/agnosticsave/[compositionname]';

jest.mock('next-auth/client', () => ({
  getSession: jest.fn(() => ({ user: { name: 'user1' } })),
}));

jest.mock('../data/db', () => ({
  task: jest.fn(),
}));

import db from '../data/db';
import { getSession } from 'next-auth/client';

describe('/api/composition/agnosticsave/[compositionName]', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });
  it('returns status code 500 if there is no body', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        compositionname: 'demo',
      },
    });

    await handleSave(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toEqual('Composition Save: Missing Body');
  });
  it('returns status code 500 if there is no composition name passed', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { name: 'name' },
    });

    await handleSave(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toEqual(
      'Composition Save: Missing Composition Name'
    );
  });
  it('if there is valid composition name and body, get the user from the session and call a DB operation', async () => {
    const compositionname = 'demo';
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        compositionname: compositionname,
      },
      body: { name: 'name' },
    });

    await handleSave(req, res);

    expect(getSession).toHaveBeenCalled();
    expect(db.task).toHaveBeenCalled();
  });
});
