import {Book} from "./fetchData";

export const editBook = async (book: Book):Promise<boolean> =>{
    const url = 'http://localhost:44300/api/Books/' + book.id;

    //Prepare post body
    const postData:object = {
        ID: book.id,
        Name: book.name,
        Year: book.year,
        GenreId: book.genre.id,
        AuthorId: book.author.id
    };

    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(postData),
        credentials : 'include',
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    if(!response.ok){
        console.error('Ошибка при редактировании книги');
        return false;
    }

    return true;
};