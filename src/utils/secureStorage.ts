import * as SecureStore from 'expo-secure-store';

export const SESSION_KEY = 'SUPABASE_SESSION';

// Save a string value
export async function save(key: string, value: string): Promise<void> {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.error(`Error saving key "${key}"`, error);
    }
}

// Retrieve a string value
export async function getValueFor(key: string): Promise<string | null> {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.error(`Error retrieving key "${key}"`, error);
        return null;
    }
}

// Delete a stored value
export async function deleteKey(key: string): Promise<void> {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error(`Error deleting key "${key}"`, error);
    }
}

// Save session as JSON string
export const saveSession = async (session: object): Promise<void> => {
    try {
        await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
    } catch (error) {
        console.error('Error saving session', error);
    }
};

// Retrieve session object
export const getStoredSession = async (): Promise<any | null> => {
    try {
        const stored = await SecureStore.getItemAsync(SESSION_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Error retrieving session', error);
        return null;
    }
};

// Clear saved session
export const clearSession = async (): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync(SESSION_KEY);
    } catch (error) {
        console.error('Error clearing session', error);
    }
};