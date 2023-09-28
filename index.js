const input = document.querySelector('#input');
const button = document.querySelector('#search-button');
const listContainer = document.querySelector('#search-list');
const heroGrid = document.querySelector('#hero-grid');

const ts = '1694407684017';
const publicKey = '7086793dcb0eb11d2088ebb2002b331f';
const hashVal = 'ccd2f5cca242e00a60e48ca8bd62cc16';

const timestamp = ts;
const apiKey = publicKey;
const hashValue = hashVal;

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = '';
}

// Auto complete functionality

input.addEventListener('keyup', async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }
  try {
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data.results.forEach((result) => {
      const name = result.name;
      const div = document.createElement('div');
      div.style.cursor = 'pointer';
      div.classList.add('autocomplete-items');
      div.addEventListener('click', () => {
        input.value = name;
        removeElements();
      });
      const word = `<b>${name.substr(0, input.value.length)}</b>${name.substr(input.value.length)}`;
      div.innerHTML = `<p class="item">${word}</p>`;
      listContainer.appendChild(div);
    });
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
});


//Search function
button.addEventListener('click', async () => {
  if (input.value.trim().length < 1) {
    alert('Input cannot be blank');
    return;
  }
  listContainer.innerHTML = '';
  try {
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data.results.forEach((element) => {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'card-container';

      const characterImageContainer = document.createElement('div');
      characterImageContainer.className = 'container-character-image';

      const img = document.createElement('img');
      img.src = `${element.thumbnail.path}.${element.thumbnail.extension}`;
      img.alt = element.name;
      img.className = 'index-img';

      const characterName = document.createElement('div');
      characterName.className = 'character-name';
      characterName.innerHTML = element.name;

      const characterDescription = document.createElement('div');
      characterDescription.className = 'character-description';
      characterDescription.innerHTML = element.description;

      characterImageContainer.appendChild(img);
      cardContainer.appendChild(characterImageContainer);
      cardContainer.appendChild(characterName);
      cardContainer.appendChild(characterDescription);
      listContainer.appendChild(cardContainer);
    });
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
});

window.onload = () => {
  button.click();
};

// Hero index

async function fetchSuperHero() {
  try {
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data.results.forEach((element) => {
      const card = document.createElement('div');
      card.className = 'hero-card';

      const img = document.createElement('img');
      img.src = `${element.thumbnail.path}.${element.thumbnail.extension}`;
      img.alt = element.name;
      img.className = 'index-img';

      const name = document.createElement('p');
      name.className = 'character-name';
      name.innerHTML = element.name;

      card.appendChild(img);
      card.appendChild(name);
      heroGrid.appendChild(card);
    });
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

fetchSuperHero();

const avengersHeroes = [
  'Iron Man',
  'Captain America',
  'Thor',
  'Black Widow',
  'Black Panther',
  'Hawkeye',
  'Hulk',
  'Nick Fury',
  'Thanos',
  'Wasp',
];

//Avengers filter

async function fetchAvengers() {
  try {
    for (const heroName of avengersHeroes) {
      const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${heroName}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      jsonData.data.results.forEach((element) => {
        const card = document.createElement('div');
        card.className = 'hero-card';

        const img = document.createElement('img');
        img.src = `${element.thumbnail.path}.${element.thumbnail.extension}`;
        img.alt = element.name;
        img.className = 'index-img';

        const name = document.createElement('p');
        name.className = 'character-name';
        name.innerHTML = element.name;

        card.appendChild(img);
        card.appendChild(name);
        heroGrid.appendChild(card);
      });
    }
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

const teamSelect = document.querySelector('#team-select');

teamSelect.addEventListener('change', () => {
  const selectedTeam = teamSelect.value;

  if (selectedTeam === 'Avengers') {
    heroGrid.innerHTML = '';
    fetchAvengers();
  }
});
