import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import AbsenceTable from '../src/components/AbsenceTable';
import { AbsenseData } from '../src/types';

const mockAbsenceData: AbsenseData[] = [
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

describe('Table', () => {

  it('displays a message when there are no absenses', () => {
    render(<AbsenceTable absenseData={[]} />);
    expect(screen.getByText('No absenses found')).toBeInTheDocument();
  });

  it('displays the absense data', () => {
    render(<AbsenceTable absenseData={mockAbsenceData} />);
    const absenseTable = screen.getByTestId('absenses');

    expect(absenseTable).toBeInTheDocument();

    expect(screen.getByText('Rahaf Deckard')).toBeInTheDocument();
    expect(screen.getByText('Enya Behm')).toBeInTheDocument();
    expect(screen.getByText('Amiah Fenton')).toBeInTheDocument();

    expect(screen.getByText('SICKNESS')).toBeInTheDocument();
    expect(screen.getByText('ANNUAL_LEAVE')).toBeInTheDocument();
    expect(screen.getByText('GARDENING_LEAVE')).toBeInTheDocument();

    expect(screen.getByText('28th May 2022')).toBeInTheDocument();
    expect(
      screen.getByText('8th February 2022')
    ).toBeInTheDocument();
    expect(
      screen.getByText('31st December 2020')
    ).toBeInTheDocument();

    expect(screen.getByText('6th June 2022')).toBeInTheDocument();
    expect(
      screen.getByText('13th February 2022')
    ).toBeInTheDocument();
    expect(screen.getByText('18th January 2021')).toBeInTheDocument();

    expect(screen.getAllByText('Yes')).toHaveLength(3);
  });
});
