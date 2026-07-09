import { api } from "./axios.ts";
import type { User } from "../types/user.ts";

/**
 * Searches global database users by username or email for organization/project invites.
 * @param query The search term entered by the operator
 */
export const searchUsers = async (query: string): Promise<User[]> => {
    if (!query.trim()) return [];
    
    // Type the response structure to expect an object with a "users" array
    const response = await api.get<{ users: User[] }>(`/user/search`, {
        params: { username: query }
    });
    
    console.log(response.data)
    // Return the nested users array
    return response.data.users;
};