import { useEffect, useState } from 'react';
import AbsenceTable from './components/AbsenceTable';
import { AbsenceData } from './types';

import calculateEndDate from './helpers/calculateEndDate';

const App = () => {
  const { absencesLoading, absences, setAbsences } = useAbsenceFetch();
  const [sortedBy, setSortedBy] = useState('');
  const [isAscending, setIsAscending] = useState(false);

  const handleSort = (key: string) => {
    const sortedAbsences = [...absences].sort((a, b) => {
      let compareValue = 0;
      if (key === 'Employee') {
        compareValue = isAscending
          ? b.employee.firstName.localeCompare(a.employee.firstName)
          : a.employee.firstName.localeCompare(b.employee.firstName);
      } else if (key === 'Absence Type') {
        compareValue = isAscending
          ? b.absenceType.localeCompare(a.absenceType)
          : a.absenceType.localeCompare(b.absenceType);
      }

      // do Start Date and End Date

      return compareValue;
    });

    setAbsences(sortedAbsences);
    setSortedBy(key);
    setIsAscending(key === sortedBy ? !isAscending : false);
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
