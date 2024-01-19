const pokeApi = {}

function convertPokeApiDetailsToPokemon(pokemonDetails) {
    const pokemon = new Pokemon()
    pokemon.id = pokemonDetails.id;
    pokemon.name = pokemonDetails.name;
    pokemon.types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name);
    pokemon.mainType = pokemon.types[0];
    pokemon.image = pokemonDetails.sprites.other.dream_world.front_default;
    return pokemon;
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailsToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((responseBody) => responseBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
            .then((detailsRequests) => Promise.all(detailsRequests))
            .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
        .finally(() => console.log('Requisição concluída!'))        
}

pokeApi.getPokemonById = (id) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
        .finally(() => console.log('Requisição de detalhes concluída!'))        
}

pokeApi.getPokemonEggGroups = (id) => {

    const url = `https://pokeapi.co/api/v2/egg-group/${id}/`;

    return fetch(url)
        .then((response) => response.json())
        .finally(() => console.log('Requisição de Egg Groups concluída!'))        
}

pokeApi.getPokemonSpecies = (id) => {

    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

    return fetch(url)
        .then((response) => response.json())
        .finally(() => console.log('Requisição de Species concluída!'))        
}