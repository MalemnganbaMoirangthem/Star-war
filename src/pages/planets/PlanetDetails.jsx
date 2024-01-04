import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function PlanetDetailsPage() {
  const { id = '1' } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['planets/details', id],
    queryFn: async () => {
      const res = await fetch(`https://swapi.dev/api/planets/${id}`);

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
      <h1>Planet Details</h1>
      <h4>{data.name}</h4>
      <p>Population: {data.population}</p>
      <p>Gravity: {data.gravity}</p>
      <p>Climate: {data.climate}</p>
    </div>
  );
}