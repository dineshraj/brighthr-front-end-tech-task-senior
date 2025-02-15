import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import App from '../src/App';
import { AbsenceData } from '../src/types';

const mockAbsenceData: AbsenceData[] = [
  {
    id: 0,
    startDate: '2022-05-28T04:39:06.470Z',
    days: 9,
    absenceType: 'SICKNESS',
    employee: {
      firstName: 'Rahaf',
      lastName: 'Deckard',
      id: '2ea05a52-4e31-450d-bbc4-5a6c73167d17',
    },
    approved: true,
  },
  {
    id: 1,
    startDate: '2022-02-08T08:02:47.543Z',
    days: 5,
    absenceType: 'ANNUAL_LEAVE',
    employee: {
      firstName: 'Enya',
      lastName: 'Behm',
      id: '84502153-69e6-4561-b2de-8f21f97530d3',
    },
    approved: true,
  },
  {
    id: 2,
    startDate: '2020-12-31T03:08:19.146Z',
    days: 18,
    absenceType: 'ANNUAL_LEAVE',
    employee: {
      firstName: 'Amiah',
      lastName: 'Fenton',
      id: '6ebff517-f398-4d23-9ed3-a0f14bfa3858',
    },
    approved: true,
  },
];

global.fetch = vi.fn();

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockAbsenceData),
      } as unknown as Response)
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue({
          conflicts: true,
        }),
      } as unknown as Response)
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue({
          conflicts: false,
        }),
      } as unknown as Response)
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue({
          conflicts: false,
        }),
      } as unknown as Response);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render the App', async () => {
    render(<App />);

    const appContainer = await screen.findByTestId('app');
    expect(appContainer).toBeInTheDocument();
  });

  describe('absences', () => {
    it('fetches the absence data from the server', async () => {
      render(<App />);

      expect(fetch).toHaveBeenCalledWith(
        'https://front-end-kata.brighthr.workers.dev/api/absences'
      );

      const absenceItems = await screen.findAllByTestId('absence-item');
      expect(absenceItems).toHaveLength(mockAbsenceData.length);
    });
  });
  describe('conflicts', () => {
    it('fetches the conflicts for each user', async () => {
      render(<App />);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          'https://front-end-kata.brighthr.workers.dev/api/absences'
        );
        expect(fetch).toHaveBeenCalledWith(
          'https://front-end-kata.brighthr.workers.dev/api/conflict/0'
        );
        expect(fetch).toHaveBeenCalledWith(
          'https://front-end-kata.brighthr.workers.dev/api/conflict/1'
        );
        expect(fetch).toHaveBeenCalledWith(
          'https://front-end-kata.brighthr.workers.dev/api/conflict/2'
        );
      });
    });

    it('does not fetch conflicts if there are no absences', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue([]),
      } as unknown as Response);

      render(<App />);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          'https://front-end-kata.brighthr.workers.dev/api/absences'
        );
        expect(fetch).not.toHaveBeenCalledWith(
          'https://front-end-kata.brighthr.workers.dev/api/conflict/0'
        );
      });
    });
  });

  describe('sorting data', () => {
    it('sorts the table by employee name when clicking the Employee heading', async () => {
      render(<App />);

      const employeeHeading = await screen.findByText('Employee');
      await userEvent.click(employeeHeading);

      const rows = screen.getAllByTestId('absence-item');

      expect(rows[0]).toHaveTextContent('Amiah Fenton');
      expect(rows[1]).toHaveTextContent('Enya Behm');
      expect(rows[2]).toHaveTextContent('Rahaf Deckard');
    });

    it('sorts the table by absence type when clicking the Absence Type heading', async () => {
      render(<App />);

      const absenceTypeHeading = await screen.findByText('Absence Type');
      await userEvent.click(absenceTypeHeading);

      const rows = screen.getAllByTestId('absence-item');

      expect(rows[0]).toHaveTextContent('Enya Behm');
      expect(rows[1]).toHaveTextContent('Amiah Fenton');
      expect(rows[2]).toHaveTextContent('Rahaf Deckard');
    });

    it('sorts the table by start date when clicking the Start Date heading', async () => {
      render(<App />);

      const startDateHeading = await screen.findByText('Start Date');
      await userEvent.click(startDateHeading);

      const rows = screen.getAllByTestId('absence-item');

      expect(rows[0]).toHaveTextContent('Amiah Fenton');
      expect(rows[1]).toHaveTextContent('Enya Behm');
      expect(rows[2]).toHaveTextContent('Rahaf Deckard');
    });

    it('sorts the table by end date when clicking the End Date heading', async () => {
      render(<App />);

      const endDateHeading = await screen.findByText('End Date');
      await userEvent.click(endDateHeading);

      const rows = screen.getAllByTestId('absence-item');

      expect(rows[0]).toHaveTextContent('Amiah Fenton');
      expect(rows[1]).toHaveTextContent('Enya Behm');
      expect(rows[2]).toHaveTextContent('Rahaf Deckard');
    });

    it('toggles the ordering of employee name when clicking the same heading twice', async () => {
      render(<App />);

      const employeeHeading = await screen.findByText('Employee');
      await userEvent.click(employeeHeading);
      await userEvent.click(employeeHeading);

      const rows = screen.getAllByTestId('absence-item');

      expect(rows[0]).toHaveTextContent('Rahaf Deckard');
      expect(rows[1]).toHaveTextContent('Enya Behm');
      expect(rows[2]).toHaveTextContent('Amiah Fenton');
    });

    it('toggles the ordering of absence type when clicking the same heading twice', async () => {
      render(<App />);

      const absenceTypeHeading = await screen.findByText('Absence Type');
      await userEvent.click(absenceTypeHeading);
      await userEvent.click(absenceTypeHeading);

      const rows = screen.getAllByTestId('absence-item');

      expect(rows[0]).toHaveTextContent('Rahaf Deckard');
      expect(rows[1]).toHaveTextContent('Enya Behm');
      expect(rows[2]).toHaveTextContent('Amiah Fenton');
    });

    it('toggles the ordering of start date when clicking the same heading twice', async () => {
      render(<App />);

      const startDateHeading = await screen.findByText('Start Date');
      await userEvent.click(startDateHeading);
      await userEvent.click(startDateHeading);

      const rows = screen.getAllByTestId('absence-item');

      expect(rows[0]).toHaveTextContent('Rahaf Deckard');
      expect(rows[1]).toHaveTextContent('Enya Behm');
      expect(rows[2]).toHaveTextContent('Amiah Fenton');
    });

    it('toggles the ordering of end date when clicking the same heading twice', async () => {
      render(<App />);

      const endDateHeading = await screen.findByText('End Date');
      await userEvent.click(endDateHeading);
      await userEvent.click(endDateHeading);

      const rows = screen.getAllByTestId('absence-item');

      expect(rows[0]).toHaveTextContent('Rahaf Deckard');
      expect(rows[1]).toHaveTextContent('Enya Behm');
      expect(rows[2]).toHaveTextContent('Amiah Fenton');
    });
  });
});
