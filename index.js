fetch('https://api.spacexdata.com/v5/launches/latest')
    .then((resp) => resp.json())
    .then((data) => console.log(data))

async function fetchSpace() {
    const res = await fetch('https://api.spacexdata.com/v5/launches/latest')
    const data = await res.json()
    renderSpace(data);
}

function renderSpace(space) {
    const main = document.querySelector('main')
    const div =
}

fetchSpace();


// https://www.youtube.com/watch?v=8se1rBs--4A&list=PLNCevxogE3fiLT6bEObGeVfHVLnttptKv&index=16&ab_channel=CodingArtist