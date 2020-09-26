import { createMocks } from 'node-mocks-http';
import handleSave from '../pages/api/composition/agnosticsave/[compositionName]';
const fs = require('fs');

jest.mock('fs');

describe('/api/composition/agnosticsave/[compositionName]', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });
  it('returns status code 500 if there is no body', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        compositionName: 'demo',
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
  it('returns status code 200 if passed a body and composition name', async () => {
    const compositionName = 'demo';
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        compositionName: compositionName,
      },
      body: { name: 'name' },
    });

    await handleSave(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(fs.writeFile).toHaveBeenCalled();
    expect(fs.writeFile.mock.calls[0][0]).toContain(
      `${compositionName}-agnostic.json`
    );
  });
});
