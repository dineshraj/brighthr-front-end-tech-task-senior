import { useEffect, useState } from 'react';
import AbsenceTable from './components/AbsenceTable';
import { AbsenceData, Conflict } from './types';

const App = () => {
  const { isLoading, absences, setAbsences } = useAbsenceFetch();
  const conflicts: Conflict[] = useConflictsFetch(absences);

  const handleSort = (key: HTMLElement) => {
    console.log('hellooo', key);
    
    const sortedAbsences = [...absences].sort((a, b) => {
      return a.employee.firstName.localeCompare(b.employee.firstName);
    });
    setAbsences(sortedAbsences);
  };

  return (
    <div data-testid="app">
      {isLoading && <p>Loading...</p>}
      {absences.length > 0 && (
        <AbsenceTable
          absenceData={absences}
          conflicts={conflicts}
          sortTable={handleSort}
        />
      )}
    </div>
  );
};

const useAbsenceFetch = () => {
  const [absences, setAbsences] = useState<AbsenceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://front-end-kata.brighthr.workers.dev/api/absences'
      );
      const absenceData = await response.json();
      setAbsences(absenceData);
      setIsLoading(false);
    } catch (e: any) {
      console.log('error', e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, absences, setAbsences };
};

const useConflictsFetch = (absences: AbsenceData[]) => {
  const [data, setData] = useState<Conflict[]>([]);

  const fetchData = async () => {
    const conflictsArray: Conflict[] = [];
    absences.forEach(async (absence) => {
      try {
        const response = await fetch(
          `https://front-end-kata.brighthr.workers.dev/api/conflict/${absence.id}`
        );
        const data = await response.json();
        conflictsArray.push({ id: absence.id, conflict: data.conflicts });
      } catch (e: any) {
        console.log(
          'Error fetching conflict for absence id',
          absence.id,
          e.message
        );
      }
    });
    setData(conflictsArray);
  };

  useEffect(() => {
    if (!absences.length) return;
    fetchData();
  }, [absences]);

  return data;
};

export default App;
