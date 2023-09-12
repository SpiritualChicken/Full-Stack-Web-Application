let input = document.querySelector('#input');
let button = document.querySelector('#search-button');
let displayContainer = document.querySelector('#display-container');
let listContainer = document.querySelector('#search-list');
let heroIndex = document.querySelector('#hero-index');
let heroCard = document.querySelector('.hero-card')


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
    const heroGrid = document.querySelector('#hero-grid'); // Assuming you have a container with the id "hero-grid"

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
/////////////////////////////////////////
function displayHeroDetails(heroId) {
  const url = `https://gateway.marvel.com:443/v1/public/characters/${heroId}?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;
  
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      const hero = jsonData.data.results[0];
      if (hero) {
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container";

        const card = document.createElement("div");
        card.className = "hero-card";

        const img = document.createElement("img");
        img.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
        img.alt = hero.name;
        img.className = "character-image";

        const name = document.createElement("div");
        name.innerHTML = hero.name;
        name.className = "character-name";

        const description = document.createElement("div");
        description.innerHTML = hero.description;
        description.className = "character-description";

        card.append(img, name, description);
        cardContainer.appendChild(card);

        // Clear previous results and display the hero details
        displayContainer.innerHTML = "";
        displayContainer.appendChild(cardContainer);
      }
    })
    .catch((error) => {
      console.error("Error fetching hero details:", error);
    });
}

// Event delegation to handle clicks on hero cards
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("hero-card")) {
    const heroId = event.target.getAttribute("data-hero-id");
    if (heroId) {
      displayHeroDetails(heroId);
    }
  }
});
// https://www.youtube.com/watch?v=8se1rBs--4A&list=PLNCevxogE3fiLT6bEObGeVfHVLnttptKv&index=16&ab_channel=CodingArtist 
// public key: "7086793dcb0eb11d2088ebb2002b331f
// private key: "5fe433ed0d3f5aa5ef255cdda722446877aa2a57"

