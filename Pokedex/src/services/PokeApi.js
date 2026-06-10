const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit = 50) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=0`);
  
  if (!response.ok) {
    throw new Error(`Erro ao buscar lista: ${response.status}`);
  }

  const data = await response.json();

  const detailedList = await Promise.all(
    data.results.map(async (pokemon) => {
      const detailRes = await fetch(pokemon.url);
      const detail = await detailRes.json();
      return {
        id: detail.id,
        name: detail.name,
        image: detail.sprites.other['official-artwork'].front_default,
      };
    })
  );

  return detailedList;
}

export async function fetchPokemonById(id) {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar pokémon: ${response.status}`);
  }
  const detail = await response.json();
  return {
    id: detail.id,
    name: detail.name,
    image: detail.sprites.other['official-artwork'].front_default,
    height: detail.height,
    weight: detail.weight,
    types: detail.types.map((t) => t.type.name),
    abilities: detail.abilities.map((a) => a.ability.name),
  };
}

