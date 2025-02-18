interface AbsenceTableProps {
  sortBy: (target: React.MouseEvent<HTMLTableCellElement>) => void;
}

const AbsenceTableHeading = ({ sortBy }: AbsenceTableProps) => {
  return (
    <thead>
      <tr>
        <th onClick={sortBy}>Employee</th>
        <th onClick={sortBy}>Absence Type</th>
        <th onClick={sortBy}>Start Date</th>
        <th onClick={sortBy}>End Date</th>
        <th onClick={sortBy}>Approved</th>
      </tr>
    </thead>
  );
};

export default AbsenceTableHeading;