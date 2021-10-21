import React from "react";
import {Book} from "../services/fetchData";

//Import styles
import '../css/books-page.css';

type ComponentProps = {
    book: Book,
    removeBook: (bookId: number | undefined) => void
}

export const BookComponent = (Props: ComponentProps) => {
    return (
        <tr className="book-card">
            <td>{Props.book.id}</td>
            <td>{Props.book.name}</td>
            <td>{Props.book.year}</td>
            <td>{Props.book.genre.name}</td>
            <td>{Props.book.author.firstName + " " + Props.book.author.lastName}</td>
            <td className="book-card-control-buttons">
                <div className="ctrl-btn edit-btn"
                     onClick={e => window.location.href = '/editBook/' + Props.book.id}>Редактировать
                </div>
                <div className="ctrl-btn remove-btn" onClick={() => Props.removeBook(Props.book.id)}>Удалить</div>
            </td>
        </tr>
    );
};