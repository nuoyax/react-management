export async function getPokemons(params: Pagination) {
  const { page = 1, limit = 8 } = params;
  const offset = (page - 1) * limit;

  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    const total = Math.ceil(data.count / limit);

    const pokemons = await Promise.all(
      data.results.map(async (pokemon: any) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return {
          id: data.id,
          name: data.name,
          image: data.sprites.other?.['official-artwork'].front_default,
          types: data.types.map((type: any) => type.type.name),
          move: data.moves[0].move.name,
        };
      }),
    );

    return {
      pokemons,
      total,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching pokemons');
  }
}

export async function getPokemonByTerm(nameOrId: string) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching pokemon');
  }
}
