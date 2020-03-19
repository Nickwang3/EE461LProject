import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api/v1";
// axios.defaults.baseURL = "http://django-env.zphgcpmf2t.us-west-2.elasticbeanstalk.com/api/v1";

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

  getPlayers(page){
    return axios.get('/players/', {
      params: {
        page: page 
      }
    });
  }

  getPlayerById(player_id) {
    return axios.get(`/players/${player_id}/`);
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
}
