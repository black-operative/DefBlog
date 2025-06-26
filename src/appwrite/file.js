import config from '../conf/config'
import {
    ID,
    Client,
    Storage
} from 'appwrite';

export class FileService {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.APPWRITE_URL)
            .setProject(config.APPWRITE_PROJECT_ID);

        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite::FileService::uploadFile::error : ", error);
            return false;
        }
    }
    
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.APPWRITE_BUCKET_ID,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite::FileService::deleteFile::error : ", error);
            return false;
        }
    }
    
    getFilePreview(fileId) {
        try {
            return this.bucket.getFileView(
                config.APPWRITE_BUCKET_ID,
                fileId
            );
        } catch (error) {
            console.log("Appwrite::FileService::deleteFile::error : ", error);
            return "";
        }
    }
};

const fileService = new FileService();
export default fileService;