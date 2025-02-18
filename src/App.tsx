import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AbsenceTable from './components/AbsenceTable';
import { AbsenceData } from './types';


import calculateEndDate from './helpers/calculateEndDate';

const App = () => {
  const { absencesLoading, absences, setAbsences } = useAbsenceFetch();
  const [sortedBy, setSortedBy] = useState('');
  const [isAscending, setIsAscending] = useState(true);
  const employeeId = useSelectEmployee();

  const handleSort = (key: string) => {
    // should this be in a useCallback?
    const ascendingValue = key === sortedBy ? !isAscending : true;

    const sortedAbsences = [...absences].sort((a, b) => {
      let compareValue = 0;

      if (key === 'Employee') {
        compareValue = a.employee.firstName.localeCompare(b.employee.firstName);
      } else if (key === 'Absence Type') {
        compareValue = a.absenceType.localeCompare(b.absenceType);
      } else if (key === 'Start Date') {
        compareValue =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      } else if (key === 'End Date') {
        const endDateA = calculateEndDate(a.startDate, a.days);
        const endDateB = calculateEndDate(b.startDate, b.days);
        compareValue =
          new Date(endDateA).getTime() - new Date(endDateB).getTime();
      }

      return ascendingValue ? compareValue : -compareValue;
    });

    setAbsences(sortedAbsences);
    setSortedBy(key);
    setIsAscending(ascendingValue);
  };

  /*
    How do I stop the data from re-fetching when I click the back button
  */

  return (
    <div data-testid="app">
      {absencesLoading && <p>Loading...</p>}
      {!absencesLoading && (
        <AbsenceTable absenceData={absences} sortTable={handleSort} employeeId={employeeId}  />
      )}
      {employeeId && <a href='/'>Back</a>}
    </div>
  );
};

const useSelectEmployee = () => {
  const location = useLocation();
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const employeeId = params.get('id') || '';
    setSelectedEmployee(employeeId);

   }, [location.search]);

  return selectedEmployee;
}

const useAbsenceFetch = () => {
  const [absences, setAbsences] = useState<AbsenceData[]>([]);
  const [absencesLoading, setAbsencesLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://front-end-kata.brighthr.workers.dev/api/absences'
      );
      const absenceData: AbsenceData[] = await response.json();
      const mutatedAbsenceData = [];
      for (const absence of absenceData) {
        const conflictResponse = await fetch(
          `https://front-end-kata.brighthr.workers.dev/api/conflict/${absence.id}`
        );
        const conflictData = await conflictResponse.json();

        mutatedAbsenceData.push({
          ...absence,
          conflict: conflictData.conflicts,
        });
      }

      setAbsences(mutatedAbsenceData);
      setAbsencesLoading(false);
    } catch (e: any) {
      console.log('error', e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { absencesLoading, absences, setAbsences };
};

export default App;
