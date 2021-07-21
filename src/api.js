import axios from "axios";
import jwt from "jsonwebtoken";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    //console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      const res = (await axios({ url, method, data, params, headers }));
      return res.data;
    } catch (err) {
      if(err.response){
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;    
        throw Array.isArray(message) ? message : [message];
      } else throw ["DB CONNECTION ERROR"];
    }
  }

  // Individual API routes

  /** sends an app in for the current user to a job*/
  static async applyToJob(jobId) {
    const user = jwt.decode(JoblyApi.token);
    let res = await this.request(`users/${user.username}/jobs/${jobId}`, {}, 'post');
    return (+res.applied === jobId);
  }

  /** gets data on the current user*/
  static async getUserData() {
    const user = jwt.decode(JoblyApi.token);
    let res = await this.request(`users/${user.username}`);
    return res.user;
  }

  /** verifies whether or not the password is valid for the current user*/
  static async verifyPassword(password) {
    try {
      const username = jwt.decode(JoblyApi.token).username;
      let res = await this.request(`auth/token`, {username, password}, "post");
      if(res.token) return true;
      else return false;
    }
    catch (e) {
      return false;
    }
  }

  /** updates the user, only can include { firstName, lastName, password, email }*/
  static async updateUser(userData) {
      const user = jwt.decode(JoblyApi.token);
      const res = await this.request(`users/${user.username}`, userData, "patch");
      return res.user
  }

  /** register a user { username, password, firstName, lastName, email }*/
  static async register(user) {
    let res = await this.request(`auth/register`, user, "post");
    return res.token;
  }

  /** login a user { username, password }*/
  static async login(user) {
    let res = await this.request(`auth/token`, user, "post");
    return res.token;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies. */
  static async getCompanies(search={}) {
    let res = await this.request("companies/", search);
    return res.companies;
  }

  /** Get all jobs. */
  static async getJobs(search={}) {
    let res = await this.request("jobs/", search);
    return res.jobs;
  }
}

// // for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi