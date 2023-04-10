import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class RBApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${RBApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // companies routes
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getAllCompanies() {
    let res = await this.request('companies/');
    return res.companies;
  }

  static async getSearchedCompanies(search_text) {
    let res = await this.request('companies', {name: search_text});
    return res.companies;
  }

  // jobs routes
  static async getJobs() {
    let res = await this.request('jobs/');
    return res.jobs;
  }

  static async login({username, password}) {
    let res = await this.request('auth/token', {
      username: username,
      password: password},
      "post");
    this.token = res;
    return res;
  }

  static async register(formData) {
    let res = await this.request('auth/register', formData, 'post');
    this.token = res;
    return res;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUser(profileData, username) {
    let res = await this.request(`users/${username}`,
    profileData,
    'patch'
    );
    return res.user;
  }

}


export default RBApi;