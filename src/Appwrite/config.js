import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Create a new post
  async createDocument({ title, slug, content, featuredimage, status, userid }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          slug,
          content,
          featuredimage,
          status,
          userid,
        }
      );
    } catch (error) {
      console.error("❌ createDocument Error:", error);
      throw error;
    }
  }

  // Update post
 async updatePost(slug, { title, content, featuredimage, status, userid }) {
  try {
    return await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug,
      {
        title,
        content,
        featuredimage,
        status,
        userid, 
      }
    );
  } catch (error) {
    console.error("❌ updatePost Error:", error);
    throw error;
  }
}


  // Delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("❌ deletePost Error:", error);
      return false;
    }
  }

  // Get single post by slug
  async getDocument(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("❌ getDocument Error:", error);
      return null;
    }
  }

  
   async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("❌ getPosts Error:", error);
      return { documents: [] };
    }
  }


 
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("❌ uploadFile Error:", error);
      return false;
    }
  }

  // Delete image from bucket
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("❌ deleteFile Error:", error);
      return false;
    }
  }
 
getFilePreview(fileId) {
  try {
   return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  } catch (error) {
    console.error("❌ getFilePreview Error:", error);
    
  }
}

 

}

const service = new Service();
export default service;

