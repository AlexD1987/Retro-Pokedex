let typeMapping = {
    'grass': 'bg-green',
    'bug': 'bg-bug',
    'water': 'bg-water',
    'fire': 'bg-fire',
    'electric': 'bg-electro',
    'normal': 'bg-normal',
    'poison': 'bg-poison',
    'ground': 'bg-ground',
    'fighting': 'bg-fighting',
    'psychic': 'bg-psychic',
    'fairy': 'bg-fairy',
    'rock': 'bg-ground',
    'ghost': 'bg-psychic',
    'ice': 'bg-ice',
    'dragon': 'bg-dragon',
    'dark': 'bg-psychic',
    'steel': 'bg-steel',
    'flying': 'bg-flying'
};
let nextCardIndex = 20;
let loadUrl;
let completePokemonData;
let nextPokemonData;
let currentPokemonInfo = [];
let currentPokemonUrl = [];
let newPokemonInfo = [];
let newPokemonUrl = [];


async function loadPokemonData() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';
    let response = await fetch(url);
    completePokemonData = await response.json();
    loadPokemonInfo();
}

function loadPokemonInfo() {
    for (let j = 0; j < completePokemonData['results'].length; j++) {
        const data = completePokemonData['results'][j];

        let url = data['url'];
        currentPokemonUrl.push(url);
    }
    loadEachPokemon();
}

async function loadEachPokemon() {
    for (let k = 0; k < currentPokemonUrl.length; k++) {
        const each = currentPokemonUrl[k];

        let url = each;
        let response = await fetch(url);
        currentPokemonInfo.push(await response.json());
    }
    renderPokemon();
}



function renderPokemon() {
    for (let l = 0; l < currentPokemonInfo.length; l++) {
        const index = currentPokemonInfo[l];

        const cardIndex = nextCardIndex;
        nextCardIndex++;

        const cardHTML = renderHTML(index, cardIndex);
        document.getElementById('pokedex').innerHTML += cardHTML;
        pokemonType(index, cardIndex);
        renderTypeInfos(index, cardIndex);
    }
    document.getElementById('loading').classList.toggle('d-none');
    document.getElementById('nextButton').classList.toggle('d-none')
    document.getElementById('goToTop').classList.toggle('d-none');
}

function renderTypeInfos(index, i) {
    const typeContainer = document.getElementById(`type${i}`);
    for (let m = 0; m < index['types'].length; m++) {
        const type = index['types'][m];
        typeContainer.innerHTML += `<span>${type['type']['name']}</span>`;
    }
    document.getElementById('loading').classList.toggle('d-none');
    document.getElementById('nextButton').classList.toggle('d-none');
}


function nextPokemon() {
    document.getElementById('nextButton').classList.add('d-none');
    document.getElementById('loading').classList.toggle('d-none');
    loadUrl = completePokemonData['next'];
    loadNextPokemon();
}

async function loadNextPokemon() {
    newPokemonInfo.length = 0;
    newPokemonUrl.length = 0;
    let url = loadUrl;
    let response = await fetch(url);
    nextPokemonData = await response.json();
    completePokemonData = nextPokemonData;
    loadNextInfo();
}

function loadNextInfo() {
    for (let n = 0; n < nextPokemonData['results'].length; n++) {
        const data = nextPokemonData['results'][n];

        newPokemonUrl.push(data['url']);
    }
    eachNextPokemon();
}

function eachNextPokemon() {
    loadNewPokemon();
}

async function loadNewPokemon() {
    for (let o = 0; o < newPokemonUrl.length; o++) {
        const url = newPokemonUrl[o];

        let response = await fetch(url);
        newPokemonInfo.push(await response.json());
    }
    renderNewPokemon();
}

function renderNewPokemon() {
    for (let p = 0; p < newPokemonInfo.length; p++) {
        const index = newPokemonInfo[p];

        const cardIndex = nextCardIndex;
        nextCardIndex++;

        document.getElementById('pokedex').innerHTML += renderHTML(index, cardIndex);
        pokemonType(index, cardIndex);
        renderTypeInfos(index, cardIndex);
    }
    document.getElementById('loading').classList.toggle('d-none');
    document.getElementById('nextButton').classList.toggle('d-none');
}

function pokemonType(index, l) {
    const typeName = index['types'][0]['type']['name'];
    if (typeMapping[typeName]) {
        document.getElementById(`pokeCard${l}`).classList.add(typeMapping[typeName]);
    }
}

function renderHTML(index, i) {
    return `
    <div class="outerCard">
        <div id="pokeCard${i}" class="card">
            <div class="front" onclick="toggleCard(${i})">
                <h3>${index['name']}</h3>
                <img src="${index['sprites']['other']['official-artwork']['front_default']}" alt="Pokemon Artwork">
            </div>
            <div class="back">
                <p>${index['name']}</p>
                <div class="info width-96">
                    <div class="typeInfo width-96 pdl-10" id="type${i}">
                    <span><b>Type</b></span>
                    </div>
                    <div>
                        <span><b>ID:${index['id']}</b></span>
                    </div>
                </div>
                <div class="stats width-96 pdl-10">
                    <span><b>Height:</b>${index['height'] / 10}m</span>
                    <span><b>Weight:</b>${index['weight'] / 10}kg</span>
                </div>
                <div class="stats width-96 pdl-10">
                    <span><b>HP:</b> ${index['stats']['0']['base_stat']}</span>
                    <span><b>Attack:</b> ${index['stats']['1']['base_stat']}</span>
                    <span><b>Defense:</b> ${index['stats']['2']['base_stat']}</span>
                </div>
            </div>
            
        </div>
    </div>
`;
}








