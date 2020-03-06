import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api/v1";
// axios.defaults.baseURL = "http://django-env.zphgcpmf2t.us-west-2.elasticbeanstalk.com/api/v1";

export default class ApiService {
  constructor() {}

  getBooks() {
    return axios.get("/books/");
  }

  getBookByIsbn(isbn) {
    return axios.get(`/books/isbn/${isbn}`);
  }

  getTeams() {
    return axios.get("/teams/");
  }

  getTeamById(id) {
    return axios.get(`/teams/id/${id}`);
  }

  getPlayers(){
    return axios.get('/players/');
  }
}
