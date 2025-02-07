import useFetch from "../hooks/useFetch"

const Conflict = ({ id }: { id: number }) => {
  const data = useFetch(`https://front-end-kata.brighthr.workers.dev/api/conflict/${id}`);

  return data;
}

export default Conflict;