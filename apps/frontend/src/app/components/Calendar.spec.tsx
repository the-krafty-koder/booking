import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import Calendar, { generateRow } from './Calendar';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        availabilities: [
          {
            date: '2025-01-16T23:00:00.000Z',
            availabilities: [
              {
                date: '2025-01-16T09:00:00.000Z',
                endDate: '2025-01-16T09:30:00.000Z',
              },
            ],
          },
        ],
        hasFutureAvailabilities: true,
        hasPreviousAvailabilities: true,
      }),
  })
) as jest.Mock;

describe('getRows', () => {
  const entries = Object.entries({
    'Wed Jan 15': ['08.00-08.30'],
    'Thu Jan 16': ['09.00-09.30'],
  });

  it('generates a row of cells for each day', () => {
    const row = generateRow(entries, 8);
    expect(row).toHaveLength(2);
  });

  it('should generate row cells with matching date for available period', () => {
    const startIndex = 8;

    const rowCells = generateRow(entries, startIndex);
    render(rowCells);

    expect(screen.getByText('08.00')).toBeInTheDocument();
  });

  it('should generate row cells with "not available" if no matching date is found', () => {
    const startIndex = 8; // This will have no match for `09.00-09.30`

    const rowCells = generateRow(entries, startIndex);
    const { getByText } = render(rowCells);

    // Test for unavailable periods
    expect(getByText('---')).toBeInTheDocument();
  });

  it('should handle periods with .5 correctly', () => {
    const singleEntry = Object.entries({
      'Thu Jan 16': ['09.30-10.00'],
    });
    const startIndex = 9.5; // This corresponds to `09.30-10.00`

    const rowCells = generateRow(singleEntry, startIndex);
    const { getByText } = render(rowCells);

    // Test for correct period when .5 is included in the index
    expect(getByText('09.30')).toBeInTheDocument();
  });
});

describe('Calendar Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the calendar correctly', async () => {
    const { getByText } = render(<Calendar firstAppointmentChecked={true} />);
    waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(getByText('Thu Jan 16')).toBeInTheDocument();
      expect(getByText('09.00')).toBeInTheDocument();
      expect(getByText('---')).toBeInTheDocument();
    });
  });

  it('should handle previous and next buttons correctly', async () => {
    render(<Calendar firstAppointmentChecked={true} />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);

      const previousButton = screen.getAllByRole('button')[0];
      const nextButton = screen.getAllByRole('button')[1];

      expect(previousButton).not.toBeDisabled();
      expect(nextButton).not.toBeDisabled();

      fireEvent.click(nextButton);

      fireEvent.click(previousButton);
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});
