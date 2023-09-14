import axios, { AxiosResponse } from 'axios';
import Database from './Database';

interface MojangProfile {
    uuid?: string;
    username?: string;
    error?: string;
    ownedCosmetics?: string[];
}

export default class MojangAPI {
    public static async searchByUsername(username: string): Promise<MojangProfile | null> {
        try {
            const response: AxiosResponse<any> = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);
            if (response.status === 200 && response.data && response.data.id && response.data.name) {
                return {
                    uuid: response.data.id,
                    username: response.data.name,
                    ownedCosmetics: await Database.getCosmeticsFromUsername(username),
                };
            } else {
                // Handle the case when the user is not found or the response is not as expected.
                return {"error": 'User not found'};
            }
        } catch (error) {
            // Handle any errors that occur during the request.
            return {"error": 'User not found'};
        }
    }

    public static async searchByUUID(uuid: string): Promise<MojangProfile | null> {
        try {
            const response: AxiosResponse<any> = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);
            if (response.status === 200 && response.data && response.data.id && response.data.name) {
                return {
                    uuid: response.data.id,
                    username: response.data.name,
                    ownedCosmetics: await Database.getOwnedCosmeticsFromUUID(uuid),
                };
            } else {
                // Handle the case when the user with the given UUID is not found or the response is not as expected.
                return {"error": 'User not found'};
            }
        } catch (error) {
            // Handle any errors that occur during the request.
            return {"error": 'User not found'};
        }
    }
}
