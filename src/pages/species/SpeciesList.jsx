import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { getPageNoFromUrl } from '../../utils';



export function SpeciesListPage() {
  
    const [searchParam] = useSearchParams();
    const pageNo = searchParam.get('page') || '1';
  

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['species/list',pageNo],
    queryFn: async () => {
      const res = await fetch(`https://swapi.dev/api/species/?page=${pageNo}`);

      if (res.ok) {
        return res.json();
      }

      return Promise.reject('Could not fetch data');
    }
  });
  
  const prevPage = getPageNoFromUrl(data?.previous);
  const nextPage = getPageNoFromUrl(data?.next);



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
      <h1>Species List</h1>
      <div>
        {data?.results?.map(p => {
          const id = p.url
            .replace('https://swapi.dev/api/species/', '')
            .replace('/', '');

          return (
            <p key={id}>
              <Link to={`/species/${id}`}>{id} - {p.name}</Link>
            </p>
          );
        })}
      </div>
      <br />
      <div>
        {prevPage && <Link to={`?page=${prevPage}`}>Prev</Link>}

        <br />

        {nextPage && <Link to={`?page=${nextPage}`}>Next</Link>}
      </div>

    </div>
  );
}