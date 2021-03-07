import axios from "axios";

export default axios.create({
  baseURL: 'https://sacz-dev-connector-backend.herokuapp.com'
})