import {Book} from "./fetchData";

export const createNewBook = async (book: Book):Promise<boolean> =>{
    const url = 'http://localhost:44300/api/Books';

    //Prepare post body
    const postData:object = {
        Name: book.name,
        Year: book.year,
        GenreId: book.genre.id,
        AuthorId: book.author.id
    };

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(postData),
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    if(!response.ok){
        console.error('Ошибка при добавлении новой книги');
        return false;
    }

    return true;
};