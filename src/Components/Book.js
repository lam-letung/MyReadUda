import {useContext , useState} from "react";
import { RootContext } from "../Context/RootProvider";

function Book({ book }) {
  const [shelf, setShelf] = useState(book.shelf)
  const { setDataUpdate} = useContext(RootContext);
  return (
    <li >
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book?.imageLinks?.thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={(e) => {
                setDataUpdate({
                  book: book,
                  shelf: e.target.value,
                });
                setShelf(e.target.value);
              }}
              value={shelf !== undefined ? shelf : 'none' }
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book?.authors?.map((author, index) => {
            let authorOutput;
            index === 0
              ? (authorOutput = author)
              : (authorOutput += ` / ${author}`);
            return authorOutput;
          })}
        </div>
      </div>
    </li>
  );
}

export default Book;
