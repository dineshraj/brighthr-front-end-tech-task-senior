import { AbsenseData } from '../types';

interface AbsenseDataProps {
  absenseData: AbsenseData[];
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
}

const calculateEndDate = (date: string, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return formatDate(result.toISOString());
}

const AbsenceTable = ({ absenseData }: AbsenseDataProps) => {
  if (absenseData.length) {
    return (
      <table data-testid="absenses">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Absense Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody>
          {absenseData.map((absense) => (
            <tr key={absense.id} data-testid="absence-item">
              <td>
                {absense.employee.firstName} {absense.employee.lastName}
              </td>
              <td>{absense.absenceType}</td>
              <td>{formatDate(absense.startDate)}</td>
              <td>{calculateEndDate(absense.startDate, absense.days)}</td>
              <td>{absense.approved ? 'Yes' : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return <div>No absenses found</div>;
};

export default AbsenceTable;
