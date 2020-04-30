import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/v1";
// axios.defaults.baseURL = "http://django-env.zphgcpmf2t.us-west-2.elasticbeanstalk.com/api/v1";

export default class ApiService {

  constructor() {
    this.totalRequestCount = 0;
  }

  static instance = null;

  static getInstance() {
    if (this.instance == null) {
      this.instance = new ApiService();
    }
    return this.instance;
  }

  incrementCountAndVerifyRequest() {
    if (this.totalRequestCount >= 10000) {
      return false;
    } else {
      this.totalRequestCount += 1;
      return true;
    }
  };

  getTeams(page) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get("/teams/", {
      params: {
        page: page 
      }
    });
  }

  getTeamsBySearch(page, search, search_fields, ordering){
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get('/teams/', {
      params: {
        page: page,
        search: search,
        search_fields: search_fields,
        ordering: ordering, 
      }
    });
  }

  getTeamById(team_id) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`/teams/team_id/${team_id}`);
  }

  getPlayersBySearch(page, search, search_fields, ordering){
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
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
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get('/players/', {
      params: {
        page: page,
        ordering: ordering, 
      }
    });
  }

  getPlayerById(player_id) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`/players/${player_id}/`);
  }

  getPlayersByTeamId(team_id) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`/players/team_id/${team_id}`);
  }

  getGames() {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get("/games/", {
      params: {
        page: 1 //change to page variable later
      }
    })
  }

  getGamesByDate(game_date) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`/games/game_date/${game_date}`);
  }

  getGamesBySearch(page, search, search_fields, ordering){
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get('/games/', {
      params: {
        page: page,
        search: search,
        search_fields: search_fields,
        ordering: ordering, 
      }
    });
  }

  getTeammembers() {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    axios.put('/teammembers/update_git_stats').then()

    return axios.get('/teammembers/')
  }

  getCurrentWeatherByTeamId(team_id) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`weather/current_weather/team_id/${team_id}`);
  } 

  getRecordsByTeamId(team_id) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`teamrecords/team_id/${team_id}`);
  }

  getRecordsBySeason(season) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`teamrecords/season/${season}`);
  }

  getRecordByTeamIdAndSeason(combo) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`teamrecords/team_id_and_season/${combo}`);
  }

  getHitterStatsById(player_id) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`hitterstats/player_id/${player_id}`)
  }

  getPitcherStatsById(player_id) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`pitcherstats/player_id/${player_id}`)
  }

  getTickets(page, ordering) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get('tickets/', {
      params: {
        page: page,
        ordering: ordering,
      }
    })
  }

  getTicketById(ticket_id) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`tickets/${ticket_id}/`);
  }

  getTicketsBySearch(page, search, search_fields, ordering){
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
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
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`games/weekly/${date}/team_id/${team}`)
  }

  getBoxscoreById(id) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`boxscores/boxscore_id/${id}`);
  }

  getGameById(game_id) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    return axios.get(`games/game_id/${game_id}`)
  }

  postGamePrediction(game_id,team_side,predictions) {
    if (!this.incrementCountAndVerifyRequest()) {
      let customError = new Error("Request limit exceeded...");
      return Promise.reject(customError);
    }
    predictions++;
    if(team_side === 'away')
      axios.post(`games/game_id/${game_id}/prediction/${team_side}`, {
        
        params:{
          game_id: game_id,
          team_side: team_side,
          away_prediction: predictions,


        }
      });
    else
      axios.post(`games/game_id/${game_id}/prediction/${team_side}`, {});
    
  }

  getTeamByName = team_name => axios.get(`/teams/team_name/${team_name}`);

  getGameByTeamsAndDate = (away_team,home_team,date) => axios.get(`/games/away_team/${away_team}/home_team/${home_team}/date/${date}`);
  
}
