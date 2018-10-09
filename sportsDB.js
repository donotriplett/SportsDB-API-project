const baseURL = "https://www.thesportsdb.com/api/v1/json/4012942/searchplayers.php";
let url;

const searchTeam = document.querySelector(".searchTeam");
const search = document.querySelector("form");
const list = document.getElementById("results");
const header = document.querySelector("h2");

header.style.display = "none";

search.addEventListener('submit', fetchResults);

function fetchResults(e) {
    e.preventDefault();
    url = `${baseURL}?t=${searchTeam.value.split(" ").join("_")}`;
    console.log(url);

    fetch(url).then(function (result) {
        console.log(result);
        return result.json();
    }).then(function (json) {
        console.log(json);
        displayResults(json);
    });
}

function displayResults(json) {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    let teamPlayers = json.player;

    if (teamPlayers === null) {
        let none = document.createElement("h5");
        header.style.display = "block";
        none.innerText = "No Results!";
        none.className= "noResults";
        list.appendChild(none);
    } else {
        let teamPlayers = json.player.forEach(p => {

            let playerDiv = document.createElement("div");
            let infoHolder = document.createElement("div");
            let players = document.createElement("h5");
            let playerDateBorn = document.createElement("p");
            let playerWeight = document.createElement("p");
            let playerHeight = document.createElement("p");
            let playerPosition = document.createElement("p");

            playerDateBorn.innerText = `Date Born :  ${p.dateBorn}`;
            playerWeight.innerText = `Player Weight :  ${p.strWeight}`;
            playerHeight.innerText = `Player Height :  ${p.strHeight}`;
            playerPosition.innerText = `Player Position :  ${p.strPosition}`;
            players.innerText = `${p.strPlayer}`;

            list.appendChild(playerDiv);
            playerDiv.appendChild(infoHolder);
            infoHolder.appendChild(players);
            infoHolder.appendChild(playerDateBorn);
            infoHolder.appendChild(playerWeight);
            infoHolder.appendChild(playerHeight);
            infoHolder.appendChild(playerPosition);

            playerDiv.className = "playerDiv";
            infoHolder.className = "infoHolder";
            players.className = "players";
            playerDateBorn.className = "info";
            playerWeight.className = "info";
            playerHeight.className = "info";
            playerPosition.className = "info";

            header.style.display = "block";
        });
    }
}





