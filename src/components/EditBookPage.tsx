import React, {useEffect, useState} from "react";
import {Redirect} from 'react-router-dom';

//Import services and types
import {Author, Book, fetchAuthors, fetchBookById, fetchGenres, Genre} from "../services/fetchData";
import {useParams} from 'react-router-dom';
import {editBook} from "../services/editBook";

//Import styles
import '../css/books-page.css';
import '../css/add-book.css';

const validateBookForm = (book: { year: any; author: any; name: any; genre: any }): boolean => {
    return !(book.name === '' || book.genre === 0 || book.author === 0 || book.year === -1);
}

export const EditBookPage = () => {
    const {bookId} = useParams<{ bookId: string }>();

    //Local data from fetch
    const [genres, setGenres] = useState<Array<Genre>>([]);
    const [authors, setAuthors] = useState<Array<Author>>([]);
    const [book, setBook] = useState<Book>();

    //Values from user inputs
    const [name, setName] = useState<string>("");
    const [releaseYear, setReleaseYear] = useState<number>(0);
    const [genreId, setGenreId] = useState<number>(0);
    const [authorId, setAuthorId] = useState<number>(0);

    const handleBookSubmitEvent = () => {
        if (!validateBookForm({name: name, year: releaseYear, author: authorId, genre: genreId})) {
            alert('Не все поля заполнны или заполнены неверно!');
            return;
        }

        let book = {name: name, author: authors[authorId - 1], genre: genres[genreId - 1], year: releaseYear};

        editBook({
            ...book,
            id: parseInt(bookId)
        }).then(response => {
            if (!response) {
                alert("Ошибка при изменении книги!");
                return;
            }

            //Redirect to books page
            return <Redirect to="/"/>
        });
    };

    useEffect(() => {
        fetchGenres().then(response => {
            if (response === undefined)
                return <Redirect to="/login"/>

            setGenres(response);
        });

        fetchAuthors().then(response => {
            if (response === undefined) {
                return <Redirect to="/login"/>
            }

            setAuthors(response);
        });

        if (bookId !== undefined) {
            fetchBookById(parseInt(bookId)).then(response => {
                if (response === undefined) {
                    return <Redirect to="/login"/>
                }

                setBook(response);

                //Fill in inputs
                setName(response.name);
                setReleaseYear(response.year);
                setGenreId(response.genre.id);
                setAuthorId(response.author.id);
            });
        }
    }, []);

    return (
        <div style={{padding: "0 2em"}}>
            <h1>Редактировать книгу</h1>

            <div className="add-book-form">

                <div className="form-param">
                    <div className="form-param-input">
                        <div className="form-param-input__prefix">
                            Название
                        </div>

                        <div className="form-param-input__input">
                            <input type="text" name="name" defaultValue={book?.name}
                                   onChange={e => setName(e.target.value)}/>
                        </div>
                    </div>
                </div>

                <div className="form-param">
                    <div className="form-param-input">
                        <div className="form-param-input__prefix">
                            Год издания
                        </div>

                        <div className="form-param-input__input">
                            <input type="text" name="year" defaultValue={book?.year}
                                   onChange={e => setReleaseYear(parseInt(e.target.value))}/>
                        </div>
                    </div>
                </div>

                <div className="form-param">
                    <div className="form-param-input">
                        <div className="form-param-input__prefix">
                            Жанр
                        </div>

                        <div className="form-param-input__input">
                            <select name="genres" value={genreId} onChange={e => setGenreId(parseInt(e.target.value))}>
                                <option value="default">Не выбрано</option>
                                {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-param">
                    <div className="form-param-input">
                        <div className="form-param-input__prefix">
                            Автор
                        </div>

                        <div className="form-param-input__input">
                            <select name="genres" value={authorId}
                                    onChange={e => setAuthorId(parseInt(e.target.value))}>
                                <option value="default">Не выбрано</option>
                                {authors.map(author => <option key={author.id}
                                                               value={author.id}>{author.firstName + " " + author.lastName}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <button className="create-book-btn ctrl-btn" onClick={handleBookSubmitEvent}>Редактировать</button>
            </div>
        </div>
    );
};