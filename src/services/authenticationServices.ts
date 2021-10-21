export type User = {
    email: string,
    password: string
};

export const register = async (user: User): Promise<string | undefined> => {
    const url = 'http://localhost:44300/api/auth/';

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const responseJson: any = await response.json();
        return responseJson.message;
    }

    return undefined;
};

export const login = async (user: User): Promise<string | undefined> => {
    const url = 'http://localhost:44300/api/auth/login';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        const responseJson: any = await response.json();
        return responseJson.message;
    }

    return undefined;
};