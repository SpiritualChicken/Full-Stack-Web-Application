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