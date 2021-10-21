export type Author = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
};

export type Genre = {
    id: number;
    name: string;
};

export type Book = {
    id?: number;
    name: string;
    year: number;
    genre: Genre;
    author: Author;
};

export const fetchAuthors: () => Promise<Array<Author> | undefined> = async () => {
    const url = 'http://localhost:44300/api/Authors';

    const response = await fetch(url, {
        credentials: "include"
    });

    if (!response.ok)
        return undefined;

    return await response.json();
};

export const fetchBooks: () => Promise<Array<Book>> = async () => {
    const url = 'http://localhost:44300/api/Books';

    const response = await fetch(url, {
        credentials: "include"
    });

    if (!response.ok)
        return Array<Book>();

    return await response.json();
};

export const fetchGenres: () => Promise<Array<Genre> | undefined> = async () => {
    const url = 'http://localhost:44300/api/Genres';

    const response = await fetch(url, {
        credentials: "include"
    });

    if (!response.ok)
        return undefined

    return await response.json();
};

export const fetchBookById = async (bookId: number): Promise<Book | undefined> => {
    const url = 'http://localhost:44300/api/Books/' + bookId;

    const response = await fetch(url, {
        credentials: "include"
    });

    if (!response.ok)
        return undefined;

    return await response.json();
};