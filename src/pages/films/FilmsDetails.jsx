import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function FilmsDetailsPage() {
  const { id = '1' } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['films/details', id],
    queryFn: async () => {
      const res = await fetch(`https://swapi.dev/api/films/${id}`);

      if (res.ok) {
        return res.json();
      }

      return Promise.reject('Could not fetch data');
    }
  });

  if (isLoading) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span className="loader"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p>{String(error)}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Films Details</h1>
      <h4>{data.title}</h4>
      <p>Director: {data.directo}</p>
      <p>Producer : {data.producer}</p>
      <p>Release Date: {data.release_date}</p>
    </div>
  );
}