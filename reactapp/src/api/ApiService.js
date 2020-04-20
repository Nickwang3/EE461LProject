import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api/v1";
//axios.defaults.baseURL = "http://django-env.zphgcpmf2t.us-west-2.elasticbeanstalk.com/api/v1";

export default class ApiService {
  constructor() {}

  getTeams(page) {
    return axios.get("/teams/", {
      params: {
        page: page 
      }
    });
  }

  getTeamById(team_id) {
    return axios.get(`/teams/team_id/${team_id}`);
  }

  getPlayersBySearch(page, search, search_fields, ordering){
    return axios.get('/players/', {
      params: {
        page: page,
        search: search,
        search_fields: search_fields,
        ordering: ordering, 
      }
    });
  }

  getPlayers(page, ordering) {
    return axios.get('/players/', {
      params: {
        page: page,
        ordering: ordering, 
      }
    });
  }

  getPlayerById(player_id) {
    return axios.get(`/players/${player_id}/`);
  }

  getPlayersByTeamId(team_id) {
    return axios.get(`/players/team_id/${team_id}`);
  }

  getGames() {
    return axios.get("/games/", {
      params: {
        page: 1 //change to page variable later
      }
    })
  }

  getGamesByDate(game_date) {
    return axios.get(`/games/game_date/${game_date}`);
  }

  getTeammembers() {
    axios.put('/teammembers/update_git_stats').then()

    return axios.get('/teammembers/')
  }

  getCurrentWeatherByTeamId(team_id) {
    return axios.get(`weather/current_weather/team_id/${team_id}`);
  } 

  getRecordsByTeamId(team_id) {
    return axios.get(`teamrecords/team_id/${team_id}`);
  }

  getRecordsBySeason(season) {
    return axios.get(`teamrecords/season/${season}`);
  }

  getRecordByTeamIdAndSeason(combo) {
    return axios.get(`teamrecords/team_id_and_season/${combo}`);
  }

  getHitterStatsById(player_id) {
    return axios.get(`hitterstats/player_id/${player_id}`)
  }

  getPitcherStatsById(player_id) {
    return axios.get(`pitcherstats/player_id/${player_id}`)
  }

  getTickets(page, ordering) {
    return axios.get('tickets/', {
      params: {
        page: page,
        ordering: ordering,
      }
    })
  }

  getTicketById(ticket_id) {
    return axios.get(`tickets/${ticket_id}/`);
  }

  getTicketsBySearch(page, search, search_fields, ordering){
    return axios.get('/tickets/', {
      params: {
        page: page,
        search: search,
        search_fields: search_fields,
        ordering: ordering, 
      }
    });
  }

  getWeeklyGamesByDateAndTeam(date, team) {
    return axios.get(`games/weekly/${date}/team_id/${team}`)
  }

  getBoxscoreById(id) {
    return axios.get(`boxscores/boxscore_id/${id}`);
  }

  getGameById(game_id) {
    return axios.get(`games/game_id/${game_id}`)
  }
}
