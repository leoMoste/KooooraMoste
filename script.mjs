const token = "50931d6075d044768092e410f5b05f43";
const baseURL = "https://api.football-data.org/v4";

document.getElementById("standings").innerText = "";

const spinner = document.getElementById("spinner");
const sporty_button = document.getElementById("sporty-button");
let tableContent = "";
let content = "";
let LeaguesNameSelceted = "BL1";
sporty_button.addEventListener("click", () => {
  tableContent = "";
  content = "";
  const LeaguesName = document.getElementById("LeaguesName");
  console.log(LeaguesName.value);
  LeaguesNameSelceted = LeaguesName.value;
  console.log(typeof LeaguesNameSelceted);
  if (LeaguesNameSelceted === "PL") {
    document.getElementById("Title_Name").innerHTML = "Premier League";
  } else if (LeaguesNameSelceted === "BL1") {
    document.getElementById("Title_Name").innerHTML = "Bundesliga";
  } else if (LeaguesNameSelceted === "DED") {
    document.getElementById("Title_Name").innerHTML = "Eredivisie";
  } else if (LeaguesNameSelceted === "PD") {
    document.getElementById("Title_Name").innerHTML = "la liga";
  } else if (LeaguesNameSelceted === "SA") {
    document.getElementById("Title_Name").innerHTML = "Serie A";
  }

  fetchStandings(LeaguesNameSelceted);
});

console.log(LeaguesNameSelceted);

const fetchStandings = function (leagueName) {
  const options = {
    method: "GET",
    headers: {
      "X-Auth-Token": `${token}`,
    },
  };

  fetch(
    `https://proxy.cors.sh/https://api.football-data.org/v4/competitions/${leagueName}/standings`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const standingsAll = response;
      console.log(standingsAll);

      const standings = response.standings[0]; // get the first element of the standings array
      console.log(standings);

      //let tableContent = "";

      for (row of standings.table) {
        // iterate over standings.table instead of standings
        tableContent += `  
          <!--TEAM -->  
          <tr>
          <th scope="row">${row.position}</th>
          <td> <img style="width: 30px;" src="${row.team.crest}" alt=""></td>
          <td>${row.team.name}</td>
          <td>${row.playedGames}</td>
          <td>${row.won}</td>
          <td>${row.draw}</td>
          <td>${row.lost}</td>
          <td>${row.goalsFor}</td>
          <td>${row.goalsAgainst}</td>
          <td>${row.points}</td>
        </tr>`;
      }

      content = `      <div class="row" id="standings">
        <table class="table caption-top">
          <caption>
            Season ${standingsAll.filters.season}
          </caption>
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">flag</th>
              <th scope="col">Team</th>
              <th scope="col">MP</th>
              <th scope="col">W</th>
              <th scope="col">D</th>
              <th scope="col">L</th>
              <th scope="col">GF</th>
              <th scope="col">GA</th>
              <th scope="col">Pts</th>
            </tr>
          </thead>
          <tbody>
            ${tableContent}
          </tbody>
        </table>
      </div>`;

      document.getElementById("standings").innerHTML = content;

      // Hide the spinner
      spinner.style.display = "none";
    })
    .catch((err) => {
      console.error(err);
      // Hide the spinner in case of error
      spinner.style.display = "none";
    });
};
