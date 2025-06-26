import config from "../conf/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.APPWRITE_URL)
            .setProject(config.APPWRITE_PROJECT_ID);

        this.account = new Account(this.client);
    }

    async createAccount({name, email, password}) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (userAccount) {
                // Call Login if account creation successful
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite::AuthService::createAccount::error : ", error);
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
        } catch (error) {
            console.log("Appwrite::AuthService::login::error : ", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get() || null;
        } catch (error) {
            console.log("Appwrite::AuthService::getCurrentUser::error : ", error);
        }   
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite::AuthService::logout::error : ", error);
        }
    }
};

const authService = new AuthService();
export default authService;