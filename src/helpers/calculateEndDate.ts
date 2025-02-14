const calculateEndDate = (date: string, days: number) => {
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + days);

  return endDate;
};

export default calculateEndDate;