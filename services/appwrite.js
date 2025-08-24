import { Client, Databases, ID, Query } from "react-native-appwrite";

const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const collectionId = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;


const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID); // Your project ID
const databases = new Databases(client);

export const updateSearchCount = async (query, movie) => {
    try {

        const result = await databases.listDocuments(
            databaseId,
            collectionId,
            [Query.equal("searchterm", query)]
        );
    
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];
            await databases.updateDocument(
                databaseId,
                collectionId,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1,
                }
            );
        } else {
            await databases.createDocument(
                databaseId,
                collectionId,
                ID.unique(),
                {
                    searchterm: query,
                    movie_id: movie.id,
                    count: 1,
                    title: movie?.title,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                }
            );
        }

    } catch (error) {
        console.log("Error updating search count:", error);
        throw error;
    }
}

export const getTrendingMovies = async () => {
    try {

        const result = await databases.listDocuments(
            databaseId,
            collectionId,
            [Query.limit(5),
            Query.orderDesc("count")
            ]);
            return result.documents;

    } catch (error) {
        console.log("Error updating search count:", error);
    }
} 