import { useEffect, useState } from 'react';
import AbsenceTable from './components/AbsenceTable';
import { AbsenceData } from './types';
import useFetch from './hooks/useFetch';

const App = () => {
  const [conflicts, setConflicts] = useState([]);
  const absences: AbsenceData[] = useFetch(
    'https://front-end-kata.brighthr.workers.dev/api/absences'
  );

  useEffect(() => {
    const fetchData = () => {
      const array = absences.map(async (absence) => {
        try {
          const res = await fetch(
            `https://front-end-kata.brighthr.workers.dev/api/conflict/${absence.id}`
          );
          const data = await res.json();
          return {
            id: absence.id,
            conflict: data
          }
        } catch (e) {
          console.log(e);
        }
        setConflicts(array);
      });
    };

    fetchData();
  }, [absences]);

  return (
    <div data-testid="app">
      <AbsenceTable absenceData={absences} />
    </div>
  );
};

export default App;
