import axios from "axios";
// axios.defaults.baseURL = "http://localhost:8000/api/v1";
axios.defaults.baseURL = "http://django-env.zphgcpmf2t.us-west-2.elasticbeanstalk.com/api/v1";

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
    return axios.get(`/teams/${team_id}/`);
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
    return axios.get(`/games/${game_date}`);
  }

  getTeammembers() {
    axios.put('/teammembers/update_git_stats').then()

    return axios.get('/teammembers/')
  }

  getCurrentWeatherByTeamId(team_id) {
    return axios.get(`weather/current_weather/team_id/${team_id}`);
  } 
}
