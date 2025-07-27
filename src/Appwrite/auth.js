 import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }


  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return this.login({ email, password });
      }
    } catch (error) {
      console.error("❌ createAccount failed:", error);
      throw error;
    }
  }

 async login({ email, password }) {
  try {
    if (!email || !password) throw new Error("Email and password are required");

    console.log("🧠 Logging in with:", email, password);

    return await this.account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
}



  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.warn("Appwrite :: getCurrentUser failed – probably not logged in yet.");
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions(); 
    } catch (error) {
      console.log("Appwrite service :: logout :: Error", error);
    }
  }
}

const authService = new AuthService();
export default authService;

