import { useState, useEffect } from 'react';

export default function TestComponent() {
  const [books, setBooks] = useState(null);

  // + adding the use
  useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      //const response = await fetch("http://localhost/api/joblistings");
      const response = await fetch("http://82.102.1.109/api/joblistings");
      const data = await response.json();

      // store the data into our books variable
      setBooks(data) ;
    }
  }, []); // <- you may need to put the setBooks function in this array

  return (
    <div>
    <h1>Jobs in asd</h1>

    {/* display books from the API */}
    {books && (
      <div className="books">
        {/* loop over the books */}
        {books.map((book, index) => (
          <div key={index}>
            <h2>{book.headline}</h2>
            <p>{book.publication_date}</p>
          </div>
        ))}

      </div>
    )}
  </div>
  )
}