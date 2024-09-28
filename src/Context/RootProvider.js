import { createContext } from "react";
import { useState, useEffect } from "react";
import { getAll, update } from "../BooksAPI";

export const RootContext = createContext(null);

function RootProvider({ children }) {
  const [myBooks, setMyBooks] = useState([]);
  const [dataUpdate, setDataUpdate] = useState(null);
  
  useEffect(() => {
    const getAllMyBooks = async () => {
      try {
        const allMyBooks = await getAll();
        setMyBooks(allMyBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    getAllMyBooks();
  }, []); 

  useEffect(() => {
    if (dataUpdate !== null) {
      const updateShelf = async () => {
        try {
          await update(dataUpdate.book, dataUpdate.shelf);
          
          setMyBooks((prevBooks) => {
            const matchedBook = prevBooks.find(
              (myBook) => myBook.id === dataUpdate.book.id
            );

            if (matchedBook) {
              return prevBooks.map((book) =>
                book.id === dataUpdate.book.id
                  ? { ...book, shelf: dataUpdate.shelf }
                  : book
              );
            } else {
              return [...prevBooks, { ...dataUpdate.book, shelf: dataUpdate.shelf }];
            }
          });
          
          console.log("Book updated successfully:", dataUpdate.book.title);
        } catch (error) {
          console.error("Error updating book shelf:", error);
        }
      };

      updateShelf();
    }
  }, [dataUpdate]); 

  return (
    <RootContext.Provider value={{ myBooks, setDataUpdate }}>
      {children}
    </RootContext.Provider>
  );
}

export default RootProvider;
