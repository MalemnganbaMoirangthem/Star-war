import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { PlanetListPage } from './pages/planets/PlanetList';
import { PlanetDetailsPage } from './pages/planets/PlanetDetails';
import { RootPage } from './pages/RootPage';
import { PeopleDetailsPage } from './pages/people/PeopleDetails';
import { PeopleListPage } from './pages/people/PeopleList';
import { FilmListPage } from './pages/films/Filmlist';
import { FilmsDetailsPage } from './pages/films/FilmsDetails';
import { StarshipListPage } from './pages/starship/StarshipList';
import { StarshipsDetailsPage } from './pages/starship/StarshipDetails';
import { SpeciesListPage } from './pages/species/SpeciesList';
import { SpeciesDetailsPage } from './pages/species/SpeciesDetails';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: 'planets',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <PlanetListPage />
          },
          {
            path: ':id',
            element: <PlanetDetailsPage />
          }
        ]
      },
      {
        path: 'people',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <PeopleListPage />
          },
          {
            path: ':id',
            element: <PeopleDetailsPage />
          }
        ]
      },
      {
        path: 'films',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <FilmListPage />
          },
          {
            path: ':id',
            element: <FilmsDetailsPage />
          }
        ]
      },
      {
        path: 'starships',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <StarshipListPage />
          },
          {
            path: ':id',
            element: <StarshipsDetailsPage />
          }
         
        ]
      },
      {
        path: 'species',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <SpeciesListPage />
          },
          {
            path: ':id',
            element: <SpeciesDetailsPage />
          }
         
        ]
      }

    ]
  }
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

