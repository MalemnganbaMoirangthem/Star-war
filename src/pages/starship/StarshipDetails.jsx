import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function StarshipsDetailsPage() {
  const { id = '1' } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['starships/details', id],
    queryFn: async () => {
      const res = await fetch(`https://swapi.dev/api/starships/${id}`);

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
      <h1>Star ship Details</h1>
      <br/>
      <h4>{data.name}</h4>
      <p>Model: {data.model}</p>
      <p>Manufacturer : {data.manufacturer}</p>
      <p>Starship Class: {data.starship_class}</p>
    </div>
  );
}