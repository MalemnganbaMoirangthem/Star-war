import { useQuery } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router-dom';



export function PeopleDetailsPage() {
  const { id = '1' } = useParams();
  const { data: people, isLoading: ispeopleLoading, isError, error } = useQuery({
    queryKey: ['people/details', id],
    queryFn: async () => {
      const res = await fetch(`https://swapi.dev/api/people/${id}`);

      if (res.ok) {
        return res.json();
      }

      return Promise.reject('Could not fetch data');
    }
  });

  const { data: homeworld, isLoading: isHomeWorldLoading } = useQuery({
    queryKey: ['homeworld/details', id],
    queryFn: async () => {
      const res = await fetch(people.homeworld);

      if (res.ok) {
        return res.json();
      }

      return Promise.reject('Could not fetch data');
    },
    enabled: !!people,
  });

  if (ispeopleLoading || isHomeWorldLoading) {
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
    <div><h1>People Details</h1>
    <h3>{people.name}</h3>
    <h5>Height: {people.height}</h5>
    <h5>Birth Year: {people.birth_year}</h5>
    <h5>Gender: {people.gender}</h5>
      
      
         
    Home world :
          <NavLink
            to={`/planets/${id}`}>
             {homeworld.name}
          </NavLink>
          
          
          </div>
          
        );
}
        
      
          
   

      
      
      
    
     
            
      

