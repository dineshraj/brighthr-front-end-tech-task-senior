import { Link } from "react-router-dom";
import { AbsenceData } from "../types";

interface AbsenceTableRowsProps {
  absence: AbsenceData;
  employeeId: string;
  startDate: string;
  endDate: string;
}

const AbsenceTableRow = ({ absence, employeeId, startDate, endDate }: AbsenceTableRowsProps) => {
  // should be employeeId !== '' but that breaks, look at why
  if (employeeId !== '' && absence.employee.id !== employeeId) return null;

  const hasConflict = absence.conflict;
  const style = hasConflict ? { backgroundColor: '#f1a5a5' } : {};
  return (
    <tr key={absence.id} data-testid="absence-item" style={style}>
      <td>
        <Link to={`?id=${absence.employee.id}`}>
          {absence.employee.firstName} {absence.employee.lastName}
        </Link>
      </td>
      <td>{absence.absenceType}</td>
      <td>{startDate}</td>
      <td>{endDate}</td>
      <td>{absence.approved ? 'Yes' : 'Pending'}</td>
    </tr>
  );
};

export default AbsenceTableRow;