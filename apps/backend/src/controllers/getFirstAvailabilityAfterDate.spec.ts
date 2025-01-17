import { Request, Response } from 'express';
import getFirstAvailabilityAfterDate from './getFirstAvailabilityAfterDate';
import getFirstAvailability from '../lib/getFirstAvailability';

jest.mock('../lib/getFirstAvailability');

describe('getFirstAvailabilityAfterDate', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 400 if "date" query parameter is missing', async () => {
    await getFirstAvailabilityAfterDate(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'date parameter is required',
    });
  });

  it('should call getFirstAvailability with the "date" query parameter', async () => {
    req.query = { date: '2025-01-01' };
    (getFirstAvailability as jest.Mock).mockResolvedValue({
      date: '2025-01-01T10:00:00.000Z',
      available: true,
    });

    await getFirstAvailabilityAfterDate(req as Request, res as Response);

    expect(getFirstAvailability).toHaveBeenCalledWith('2025-01-01');
    expect(res.json).toHaveBeenCalledWith({
      date: '2025-01-01T10:00:00.000Z',
      available: true,
    });
  });

  it('should return availability data when the "date" query is valid', async () => {
    req.query = { date: '2025-01-01' };
    (getFirstAvailability as jest.Mock).mockResolvedValue({
      date: '2025-01-01T10:00:00.000Z',
      available: true,
    });

    const response = await getFirstAvailabilityAfterDate(
      req as Request,
      res as Response
    );

    expect(response).toBeUndefined(); // Should call res.json and end the response
    expect(res.json).toHaveBeenCalledWith({
      date: '2025-01-01T10:00:00.000Z',
      available: true,
    });
  });
});
