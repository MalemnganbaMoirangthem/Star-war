import { useQuery } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router-dom';




export function SpeciesDetailsPage() {
  const { id = '1' } = useParams();
  const { data: species, isLoading: isSpeciesLoading, isError, error } = useQuery({
    queryKey: ['species/details', id],
    queryFn: async () => {
      const res = await fetch(`https://swapi.dev/api/species/${id}`);

      if (res.ok) {
        return res.json();
      }

      return Promise.reject('Could not fetch data');
    }
  });
  const { data: homeworld, isLoading: isHomeWorldLoading } = useQuery({
    queryKey: ['homeworld/details', id],
    queryFn: async () => {
      const res = await fetch(species.homeworld);

      if (res.ok) {
        return res.json();
      }

      return Promise.reject('Could not fetch data');
    },
    enabled: !!species,
  });

  if (isSpeciesLoading || isHomeWorldLoading) {
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
        <h1>Species Details</h1>
          
      <br/>
        <h3>{species.name}</h3>
   
      <p>Classification : {species.classification}</p>
      <p>Average Lifespan: {species.average_lifespan}</p>
      Home World:
      <NavLink 
      to ={`/planets/${id}`}> {homeworld.name}
      </NavLink>
    </div>
  );
}