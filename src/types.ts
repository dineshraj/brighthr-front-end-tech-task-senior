export interface AbsenceData {
  id: number;
  startDate: string;
  days: number;
  absenceType: string;
  employee: {
    firstName: string;
    lastName: string;
    id: string;
  };
  approved: boolean;
}

export interface Conflicts {
  conflicts: boolean;
}