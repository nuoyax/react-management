import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { Loader } from '~/components/loader';
import { getPokemons } from '~/modules/pokemon/api';
import { PokemonCard } from '~/modules/pokemon/components/pokemon-card';
import { PokemonPagination } from '~/modules/pokemon/components/pokemon-pagination';

const searchSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(8),
});

const getPokemonsQueryOptions = (pagination: Pagination) =>
  queryOptions({
    queryKey: ['pokemons', pagination],
    queryFn: () => getPokemons(pagination),
    placeholderData: keepPreviousData,
  });

export const Route = createFileRoute('/_authenticated/pokemon/')<{
  search?: z.infer<typeof searchSchema>;
}>({
  component: RouteComponent,
  validateSearch: (search: Pagination) => searchSchema.parse(search),
  loaderDeps: opts => opts.search,
  loader({ context: { queryClient }, deps }) {
    queryClient.ensureQueryData(getPokemonsQueryOptions(deps));
  },
  context: () => ({
    breadcrumb: '宝可梦列表',
  }),
  head: () => ({
    meta: [{ title: '宝可梦列表' }],
  }),
});

function RouteComponent() {
  const { data, isLoading } = useQuery(getPokemonsQueryOptions(Route.useSearch()));

  if (isLoading) {
    return (
      <div className="flex h-10/12 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.pokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
      </div>
      <PokemonPagination total={data?.total || 0} />
    </>
  );
}
