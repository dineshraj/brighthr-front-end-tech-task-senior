import { AbsenceData } from '../types';
import calculateEndDate from '../helpers/calculateEndDate';

import '../style/AbsenceTable.css';
interface AbsenceDataProps {
  absenceData: AbsenceData[];
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

const AbsenceTable = ({ absenceData, sortTable }: AbsenceDataProps) => {

  const sortBy = ({ target }: React.MouseEvent<HTMLTableCellElement>) => {
    const text = (target as HTMLElement).textContent;
    if (text) sortTable(text);
  };

  return (
    <table data-testid="absences" className="absences">
      <thead>
        <tr>
          <th onClick={sortBy}>Employee</th>
          <th onClick={sortBy}>Absence Type</th>
          <th onClick={sortBy}>Start Date</th>
          <th onClick={sortBy}>End Date</th>
          <th onClick={sortBy}>Approved</th>
        </tr>
      </thead>
      <tbody>
        {absenceData.map((absence) => {

          const hasConflict = absence.conflict;
          const style = hasConflict ? { backgroundColor: '#f1a5a5' } : {};
          const endDateString = calculateEndDate(
            absence.startDate,
            absence.days
          ).toISOString();
          return (
            <tr key={absence.id} data-testid="absence-item" style={style}>
              <td>
                {absence.employee.firstName} {absence.employee.lastName}
              </td>
              <td>{absence.absenceType}</td>
              <td>{formatDate(absence.startDate)}</td>
              <td>{formatDate(endDateString)}</td>
              <td>{absence.approved ? 'Yes' : 'Pending'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AbsenceTable;
