let input = document.querySelector('#input');
let button = document.querySelector('#search-button');
let displayContainer = document.querySelector('#display-container');
let listContainer = document.querySelector('#search-list');
let heroIndex = document.querySelector('#hero-index');
let heroCard = document.querySelector('.hero-card')
const heroGrid = document.querySelector('#hero-grid'); 


let ts = '1694407684017'
let publicKey = "7086793dcb0eb11d2088ebb2002b331f"
let hashVal = "ccd2f5cca242e00a60e48ca8bd62cc16"

let date = new Date();
console.log(date.getTime());

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

//Auto complete functionality
function displayWords(value) {
    input.value = value;
    removeElements();
  }

  function removeElements() {
    listContainer.innerHTML = "";
  }

  input.addEventListener("keyup", async () => {
    removeElements();
    if (input.value.length < 4) {
      return false;
    }
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((result) => {
      let name = result.name;
      let div = document.createElement("div");
      div.style.cursor = "pointer";
      div.classList.add("autocomplete-items");
      div.setAttribute("onclick", "displayWords('" + name + "')");
      let word = "<b>" + name.substr(0, input.value.length) + "</b>";
      word += name.substr(input.value.length);
      div.innerHTML = `<p class="item">${word}</p>`;
      listContainer.appendChild(div);
    });
  });



// search functionality
button.addEventListener(
    "click",
    (getRsult = async () => {
      if (input.value.trim().length < 1) {
        alert("Input cannot be blank");
      }
      listContainer.innerHTML = "";
      const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      jsonData.data["results"].forEach((element) => {
        listContainer.innerHTML = `<div class="card-container">
          <div class="container-character-image">
          <img src="${
            element.thumbnail["path"] + "." + element.thumbnail["extension"]
          }"/></div>
          <div class="character-name">${element.name}</div>
          <div class="character-description">${element.description}</div>
          </div>`
      })})
  );
  window.onload = () => {
    getRsult();
  };


  // list superhero index
  async function fetchSuperHero() {
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;
    const response = await fetch(url);
    const jsonData = await response.json(); 
    jsonData.data["results"].forEach((element) => {
        const card = document.createElement('div');
        card.className = "hero-card";
        
        const img = document.createElement('img');
        img.src = `${element.thumbnail["path"] + "." + element.thumbnail["extension"]}`;
        img.alt = element.name;
        img.className = "index-img";
        
        const name = document.createElement('p');
        name.innerHTML = element.name;
        name.className = "character-name";

        card.append(img, name);
        heroGrid.append(card);
    });
}

fetchSuperHero();


///Avngers Filter
const avengersHeroes = [
  "Iron Man",
  "Captain America",
  "Thor",
  "Black Widow",
  "Black Panther",
  "Hawkeye",
  "Loki",
  "Nick Fury",
  "Thanos",
  "Wasp"
];

async function fetchAvengers() {
  for (const heroName of avengersHeroes) {
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${heroName}`;

    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      jsonData.data["results"].forEach((element) => {
        const card = document.createElement('div');
        card.className = "hero-card";
        
        const img = document.createElement('img');
        img.src = `${element.thumbnail["path"] + "." + element.thumbnail["extension"]}`;
        img.alt = element.name;
        img.className = "index-img";
        
        const name = document.createElement('p');
        name.innerHTML = element.name;
        name.className = "character-name";

        card.append(img, name);
        heroGrid.append(card);
  
      })
    } catch (error) {
      console.error(`Error fetching data for ${heroName}: ${error}`);
    }
  }
}

const teamSelect = document.querySelector('#team-select')

teamSelect.addEventListener('change', function () {
  const selectedTeam = teamSelect.value;

  if (selectedTeam === 'Avengers') {
  
    heroGrid.innerHTML = '';

    
    fetchAvengers();
  }
});











// public key: "7086793dcb0eb11d2088ebb2002b331f
// private key: "5fe433ed0d3f5aa5ef255cdda722446877aa2a57"

