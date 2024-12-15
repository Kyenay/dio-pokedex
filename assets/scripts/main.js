const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 2000;
const limit = 20;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function renderPokemonDetails(pokemon) {
    document.getElementById('pokemonName').textContent = `${pokemon.name} (#${pokemon.number})`;
    document.getElementById('pokemonImage').src = pokemon.photo;
    document.getElementById('pokemonNumber').textContent = `#${pokemon.number}`;
    document.getElementById('pokemonNameInfo').textContent = pokemon.name;

    const typesContainer = document.getElementById('pokemonTypes');
    typesContainer.innerHTML = pokemon.types
        .map((type) => `<span class="type ${type}">${type}</span>`)
        .join('');
}