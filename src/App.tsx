import { useEffect, useState } from 'react';
import AbsenceTable from './components/AbsenceTable';

const App = () => {
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://front-end-kata.brighthr.workers.dev/api/absences'
      );
      const data = await response.json();
      setAbsences(data);
    };

    fetchData();
  }, []);

  return (
    <div data-testid="app">
      <AbsenceTable absenseData={absences} />
    </div>
  );
};

export default App;
