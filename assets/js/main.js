//console.log("Sucesso!");

const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonFrame = document.querySelector('.modal');
const pokemonDetail = document.querySelector('.profile');
const pokemonAbout = document.querySelector('.about');
const pokemonBreeding = document.querySelector("resultsBreeding");
let limit = 6;
let offset = 0;
const maxRecords = 151;
let eggGroupHtml = "";
let breedingHtml = "";

function idDisplay(id) {
    if(id < 10) {
        return `00${id}`;
    }else if(id < 100) {
        return `0${id}`;
    }else {
        return id;
    }
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            // debugger
            console.log(pokemons);
            const newHtml =  pokemons.map((pokemon) =>
               `<li class="pokemon ${pokemon.mainType}">
                    <span class="number">#${idDisplay(pokemon.id)}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="details">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.image}">
                    </div>                
                </li>`
               ).join('');
            pokemonList.innerHTML += newHtml;
  

            for(let i = 0; i < pokemonList.children.length; i++) {
                pokemonList.children[i].addEventListener('click', function() {
                    loadPokemonDetails(i + 1);
                    pokemonFrame.style.display = "block";
                })
            }
    });
}

function loadPokemonDetails(id) {
    pokeApi.getPokemonById(id)
        .then((pokemon) => {
            // debugger
            console.log(pokemon);
            const type1 = pokemonFrame.classList.item(1);
            pokemonFrame.classList.remove(type1);
            pokemonFrame.classList.add(pokemon.types[0].type.name);
            const newHtml =
               `<div class="${pokemon.types[0].type.name}">
                    <span class="name"><h1>${pokemon.name}</h1></span>
                    <div class="number">#${idDisplay(pokemon.id)}</div>
                    <div class="details">
                        <ol class="types">
                                ${pokemon.types.map((typeSlot) => `<li class="profile-type ${typeSlot.type.name}">${typeSlot.type.name}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="imagem">
                        <img class="photo" src="${pokemon.sprites.other.dream_world.front_default}">
                    </div>
                <div>`
            ;
            let newHtmlInfo =
               `<div class="divAbout">
                    <div class="titles">
                        <span class="titleMain"><h5>About</h5></span>
                        <span class="titleSub"><h5>Base Stats</h5></span>
                        <span class="titleSub"><h5>Evolution</h5></span>
                        <span class="titleSub"><h5>Moves</h5></span>
                    </div>
                    <div class="info-box">
                        <section id="itens">
                            <p class="info">Species</p> 
                            <p class="info">Height</p> 
                            <p class="info">Weight</p> 
                            <p class="info">Abilities</p> 
                        </section>
                        <section id="results">
                            <p class="info">${pokemon.species.name}</p>
                            <p class="info-medidas">${(pokemon.height)*10} cm</p>
                            <p class="info-medidas">${(pokemon.weight)/10} kg</p>
                            <p class="info">${pokemon.abilities.map((abilitySlot) => `${abilitySlot.ability.name}`)}</p>
                        </section>
                    </div>
                    <span class="titleMain"><h5>Breeding</h5></span>
                    
                        
             `
            ;

            pokeApi.getPokemonSpecies(id)
                .then((breedingInfo) => {
                    // debugger
                    console.log(breedingInfo);
                    if(breedingInfo.gender_rate < 0) {
                        genderRate = 'No gender'
                    } else {
                        genderRate = `<img class="icone" src="/assets/images/male.png"> ${((8 - breedingInfo.gender_rate)/8) * 100}% &emsp; <img class="icone" src="/assets/images/female.png"> ${(breedingInfo.gender_rate/8) * 100}%`;
                    }
                    breedingHtml =
                    `       
                        <div class="info-box">
                            <section id="itensBreeding">
                                <p class="info">Gender</p> 
                                <p class="info">Egg Groups</p> 
                                <p class="info">Generation</p> 
                            </section>
                            <section id="resultsBreeding" class="resultsBreeding">
                                <p class="info">${genderRate}</p> 
                                <p class="info">${breedingInfo.egg_groups.map((eggGroupSlot) => `${eggGroupSlot.name}`)}</p>
                                <p class="info">${breedingInfo.generation.name}</p> 
                            </section>
                        </div>
                    <div>
                    `;
                    newHtmlInfo += breedingHtml;
                    pokemonDetail.innerHTML = newHtml;
                    pokemonAbout.innerHTML = newHtmlInfo;
                });
                
        });  
                                   
}


loadPokemonItens(offset, limit);
// loadPokemonDetails(25);

loadMoreButton.addEventListener('click', () => {
    // debugger;
    offset += limit;
    if((offset + limit) > maxRecords) {
        limit = maxRecords % limit;
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
    loadPokemonItens(offset, limit);
})


pokemonFrame.addEventListener('click', () => {
    pokemonFrame.style.display = "none";
})





