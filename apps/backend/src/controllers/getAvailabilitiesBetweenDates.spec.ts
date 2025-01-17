import { Request, Response } from 'express';
import getAvailabilitiesBetweenDates from './getAvailabilitiesBetweenDates';
import getListOfAvailabilities from '../lib/getListOfAvailabilities';

jest.mock('../lib/getListOfAvailabilities');

describe('getAvailabilitiesBetweenDates', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 400 if "from" and "to" are missing', async () => {
    await getAvailabilitiesBetweenDates(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "'from' and 'to' dates are required",
    });
  });

  it('should call getListOfAvailabilities with "from" and "to" dates', async () => {
    req.query = { from: '2025-01-01', to: '2025-01-05' };
    (getListOfAvailabilities as jest.Mock).mockResolvedValue([
      { date: '2025-01-01T10:00:00.000Z', available: true },
    ]);

    await getAvailabilitiesBetweenDates(req as Request, res as Response);

    expect(getListOfAvailabilities).toHaveBeenCalledWith(
      '2025-01-01',
      '2025-01-05'
    );
    expect(res.json).toHaveBeenCalledWith([
      { date: '2025-01-01T10:00:00.000Z', available: true },
    ]);
  });
});
