import axios from "axios";
// axios.defaults.baseURL = "http://localhost:8000/api/v1";
axios.defaults.baseURL = "http://ec2-13-59-7-216.us-east-2.compute.amazonaws.com/api/v1";

export default class BookService {
  constructor() {}

  getBooks() {
    return axios.get("/books/getbooks/");
  }



}
