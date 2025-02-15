import { useEffect, useState } from 'react';
import AbsenceTable from './components/AbsenceTable';
import { AbsenceData } from './types';

import calculateEndDate from './helpers/calculateEndDate';
import { b } from 'vitest/dist/chunks/suite.BJU7kdY9';

const App = () => {
  const { absencesLoading, absences, setAbsences } = useAbsenceFetch();
  const [sortedBy, setSortedBy] = useState('');
  const [isAscending, setIsAscending] = useState(true);

  const handleSort = (key: string) => {
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

  return (
    <div data-testid="app">
      {absencesLoading && <p>Loading...</p>}
      {!absencesLoading && (
        <AbsenceTable absenceData={absences} sortTable={handleSort} />
      )}
    </div>
  );
};

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
