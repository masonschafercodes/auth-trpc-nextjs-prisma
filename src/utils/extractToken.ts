export function extractToken(JSONDataString: string) {
    const data = JSON.parse(JSONDataString);
    return data.token;
}