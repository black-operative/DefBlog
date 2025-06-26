import config from '../conf/config';
import { 
    Client, 
    Databases, 
    Query 
} from 'appwrite';

export class PostService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.APPWRITE_URL)
            .setProject(config.APPWRITE_PROJECT_ID);
        
        this.databases = new Databases(this.client);
    }

    async createPost(
        {
            title,
            slug,
            content,
            featured_image,
            status,
            user_id
        }
    ) {
        try {
            return await this.databases.createDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featured_image,
                    status,
                    user_id
                }
            );
        } catch (error) {
            console.log("Appwrite::PostService::createPost::error : ", error);
        }
    }
    
    async updatePost(
        slug,   // Gonna be used as document id inside collection, make it separate for more attention
        {
            title,
            content,
            featured_image,
            status,
            user_id
        }
    ) {
        try {
            return await this.databases.updateDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featured_image,
                    status,
                    user_id    
                }
            );
        } catch (error) {
            console.log("Appwrite::PostService::updatePost::error : ", error);
        }
    }
    
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite::PostService::deletePost::error : ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                slug
            );
        } catch (error) {
            console.log("Appwrite::PostService::getPost::error : ", error);
            return false;
        }
    }
    
    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                queries
            );
        } catch (error) {
            console.log("Appwrite::PostService::getPosts::error : ", error);
            return false;
        }
    }
};

const postService = new PostService();
export default postService;