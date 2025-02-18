import { AbsenceData } from '../types';
import calculateEndDate from '../helpers/calculateEndDate';

import '../style/AbsenceTable.css';
import { Link } from 'react-router-dom';
import AbsenceTableHeading from './AbsenceTableHeading';
import AbsenceTableRow from './AbsenceTableRow';
interface AbsenceDataProps {
  absenceData: AbsenceData[];
  employeeId: string;
  sortTable: (key: string) => void;
}

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getFullYear();

  const daySuffix = (d: number) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${day}${daySuffix(day)} ${month} ${year}`;
};

const AbsenceTable = ({
  absenceData,
  employeeId,
  sortTable,
}: AbsenceDataProps) => {
  const sortBy = ({ target }: React.MouseEvent<HTMLTableCellElement>) => {
    const text = (target as HTMLElement).textContent;
    if (text) sortTable(text);
  };

  return (
    <table data-testid="absences" className="absences">
      <AbsenceTableHeading sortBy={sortBy} />
      <tbody>
        {absenceData.map((absence) => {
          const endDateString = calculateEndDate(
            absence.startDate,
            absence.days
          ).toISOString();
          const formattedStartDate = formatDate(absence.startDate)
          const formattedEndDate = formatDate(endDateString)

          return (
            <AbsenceTableRow
              absence={absence}
              employeeId={employeeId}
              startDate={formattedStartDate}
              endDate={formattedEndDate}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default AbsenceTable;
