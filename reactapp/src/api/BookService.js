import axios from "axios";
// const API_URL = "http://ec2-13-59-7-216.us-east-2.compute.amazonaws.com/api/v1";
axios.defaults.baseURL = "http://localhost:8000/api/v1"

export default class CustomersService {
  constructor() {}

  getBooks() {
    return axios.get("/books/getbooks/");
  }



}
