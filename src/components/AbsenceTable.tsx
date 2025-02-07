import { AbsenceData } from '../types';

import '../style/AbsenceTable.css';
import useFetch from '../hooks/useFetch';
import Conflict from './Conflict';

interface AbsenceDataProps {
  absenceData: AbsenceData[];
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

const calculateEndDate = (date: string, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return formatDate(result.toISOString());
};

const checkConflict = async (id: number) => {
  const response = await fetch(
    `https://front-end-kata.brighthr.workers.dev/api/conflict/${id}`
  );
  const data = await response.json();
  return data;
};

const AbsenceTable = ({ absenceData }: AbsenceDataProps) => {
  if (absenceData.length) {
    // const naiveArray = [];
    
    // absenceData.map((absence) => {
    //   const c = checkConflict(absence.id);
    //   naiveArray.push({
    //     id: absence.id,
    //     conflict: c,
    //   });
    // });
    // console.log("🚀 ~ AbsenceTable ~ naiveArray:", naiveArray)

    return (
      <table data-testid="absences" className="absences">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Absence Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody>
          {absenceData.map((absence) => {
            return (
              <>
                <tr key={absence.id} data-testid="absence-item">
                  <td>
                    {absence.employee.firstName} {absence.employee.lastName}
                  </td>
                  <td>{absence.absenceType}</td>
                  <td>{formatDate(absence.startDate)}</td>
                  <td>{calculateEndDate(absence.startDate, absence.days)}</td>
                  <td>{absence.approved ? 'Yes' : 'Pending'}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    );
  }
  return <div>No absences found</div>;
};

export default AbsenceTable;
