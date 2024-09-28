import Book from "./Book";
import {  useContext } from "react";
import { RootContext } from "../Context/RootProvider";

function Shelf() {
  const {myBooks } = useContext(RootContext);
  const shelfList = [
    { type: "currentlyReading", title: "Currently Reading" },
    { type: "wantToRead", title: "Want To Read" },
    { type: "read", title: "Read" },
  ];


  return (
    <>
      {shelfList.map((shelf, index) => (
        <div className="bookshelf" key={index}>
          <h2 className="bookshelf-title">{shelf.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {myBooks.map(
                (book) =>
                  book.shelf === shelf.type && (
                    <Book
                      book={book}
                      key={book.id}
                    />
                  )
              )}
            </ol>
          </div>
        </div>
      ))}
    </>
  );
}

export default Shelf;
