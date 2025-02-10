import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import userEvent from '@testing-library/user-event';

import AbsenceTable from '../src/components/AbsenceTable';
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
    absenceType: 'GARDENING_LEAVE',
    employee: {
      firstName: 'Amiah',
      lastName: 'Fenton',
      id: '6ebff517-f398-4d23-9ed3-a0f14bfa3858',
    },
    approved: true,
  },
];

const mockConflicts = [
  {
    id: 0,
    conflict: false,
  },
  {
    id: 1,
    conflict: true,
  },
  {
    id: 2,
    conflict: false,
  },
];

const renderAbsenceTable = (sortMethod = () => {}) => {
  render(
    <AbsenceTable
      absenceData={mockAbsenceData}
      conflicts={mockConflicts}
      sortTable={sortMethod}
    />
  );
};

describe('Table', () => {
  it('renders the component', () => {
    renderAbsenceTable();
    const absenceTable = screen.getByTestId('absences');

    expect(absenceTable).toBeInTheDocument;
  });

  it('displays the absence headings', () => {
    renderAbsenceTable();

    expect(screen.getByText('Employee')).toBeInTheDocument();
    expect(screen.getByText('Absence Type')).toBeInTheDocument();
    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('End Date')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument;
  });

  it('displays the absence data', () => {
    renderAbsenceTable();
    const absenceTable = screen.getByTestId('absences');

    expect(absenceTable).toBeInTheDocument();

    expect(screen.getByText('Rahaf Deckard')).toBeInTheDocument();
    expect(screen.getByText('Enya Behm')).toBeInTheDocument();
    expect(screen.getByText('Amiah Fenton')).toBeInTheDocument();

    expect(screen.getByText('SICKNESS')).toBeInTheDocument();
    expect(screen.getByText('ANNUAL_LEAVE')).toBeInTheDocument();
    expect(screen.getByText('GARDENING_LEAVE')).toBeInTheDocument();

    expect(screen.getByText('28th May 2022')).toBeInTheDocument();
    expect(screen.getByText('8th February 2022')).toBeInTheDocument();
    expect(screen.getByText('31st December 2020')).toBeInTheDocument();

    expect(screen.getByText('6th June 2022')).toBeInTheDocument();
    expect(screen.getByText('13th February 2022')).toBeInTheDocument();
    expect(screen.getByText('18th January 2021')).toBeInTheDocument();

    expect(screen.getAllByText('Yes')).toHaveLength(3);
  });

  it('highlights any rows that have conflicts', () => {
    renderAbsenceTable();

    const rows = screen.getAllByTestId('absence-item');

    expect(rows[0]).not.toHaveStyle('background-color: #f1a5a5');
    expect(rows[1]).toHaveStyle('background-color: #f1a5a5');
    expect(rows[2]).not.toHaveStyle('background-color: #f1a5a5');
  });

  describe('sorting data', () => {
    it('calls the sorting method with the right param when sorting', async () => {
      const sortMethodMock = vi.fn();
      renderAbsenceTable(sortMethodMock);

      const employeeHeading = await screen.findByText('Employee');
      const AbsenceTypeHeading = await screen.findByText('Absence Type');
      const startDateHeading = await screen.findByText('Start Date');
      const endDateHeading = await screen.findByText('End Date');

      await userEvent.click(employeeHeading);
      await userEvent.click(AbsenceTypeHeading);
      await userEvent.click(startDateHeading);
      await userEvent.click(endDateHeading);

      expect(sortMethodMock).toHaveBeenCalledTimes(4);

      expect(sortMethodMock).toHaveBeenCalledWith('Employee');
      expect(sortMethodMock).toHaveBeenCalledWith('Absence Type');
      expect(sortMethodMock).toHaveBeenCalledWith('Start Date');
      expect(sortMethodMock).toHaveBeenCalledWith('End Date');
    });
  });
});
