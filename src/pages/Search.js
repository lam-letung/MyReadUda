import { Link } from "react-router-dom";
import { useEffect, useState, useContext , useCallback} from "react";
import { search } from "../BooksAPI";
import Book from "../Components/Book";
import { RootContext } from "../Context/RootProvider";

function Search() {
  const [searchText, setSearch] = useState("");
  const { myBooks } = useContext(RootContext);
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("Please input your search!");

  const getAllBook = useCallback( async () => {
    try {
      let books;
      if (searchText.length >0) {
        setMessage("Loading...");
        books = await search(searchText);
      }else{
        setMessage("Please input your search!");
        return
      }
      if (books.length > 0) {
        const updatedBooks = books.map((book) => {
          const matchedBook = myBooks.find((myBook) => myBook.id === book.id);
          if (matchedBook) {
            return { ...book, shelf: matchedBook.shelf };
          }
          return { ...book, shelf: 'none' };
        });
        setBooks(updatedBooks);
        setMessage("");
      } else {
        setBooks([]);
        setMessage("Not found books");
      }
    } catch (error) {
      setMessage("Error when searching for books");
      console.error("Error fetching books:", error);
    }
  }, [searchText]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let searchTimeout;
    
    if (searchTimeout) clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        getAllBook();
      }, 500);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [getAllBook]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={"/"}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={searchText}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {message ? (
            <span>{message}</span>
          ) : (
            books?.map((book, index) => <Book book={book} key={index} />)
          )}
        </ol>
      </div>
    </div>
  );
}

export default Search;
