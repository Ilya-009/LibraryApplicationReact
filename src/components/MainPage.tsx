//React imports
import React, {FC, useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";

//Import services
import {Book, fetchBooks} from "../services/fetchData";
import {removeBook} from "../services/removeBook";

//Import styles
import '../css/books-page.css';

//Import components
import {BookComponent} from "./BookComponent";

export const MainPage: FC = () => {
    const [books, setBooks] = useState<Array<Book>>([]);

    const onBookRemove = (bookId: number | undefined) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
            removeBook(bookId).then(response => {
                if (!response) {
                    alert('Ошибка при удалении книги!');
                    return;
                }

                //Redirect to books page
                return <Redirect to="/"/>
            });
        }
    };

    useEffect(() => {
        fetchBooks().then(response => {
            setBooks(response);
        });
    }, []);

    return (
        <div style={{padding: "0 2em"}}>
            <h1>Books</h1>
            <Link to="/addBook" className="ctrl-btn create-book">Добавить новую книгу</Link>
            <h3>Books list</h3>

            <table className="books-table">
                <tbody>
                <tr>
                    <td className="book-card__id">№</td>
                    <td className="book-card__name">Название книги</td>
                    <td className="book-card__year">Год издания</td>
                    <td className="book-card__genre">Жанр</td>
                    <td className="book-card__author">ФИО автора</td>
                    <td>Управление</td>
                </tr>

                {
                    books.map(book =>
                        <BookComponent key={book.id} book={book} removeBook={() => onBookRemove(book.id)}/>)
                }
                </tbody>
            </table>
        </div>
    );
};