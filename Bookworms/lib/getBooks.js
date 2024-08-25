import axios from 'axios';

const fetchBooksFromGoogle = async (query, maxResults = 40) => {
  let books = [];
  let startIndex = 0;
  const maxBooks = 1000; // Set a limit to avoid too many requests

  try {
    while (startIndex < maxBooks) {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: {
          q: query,
          startIndex,
          maxResults,
          key: 'AIzaSyB36sHWI03jIqucx3qqiVvArA_nN7v3_us',
        },
      });

      if (response.data.items) {
        books = [...books, ...response.data.items];
      }

      startIndex += maxResults;

      if (!response.data.items || response.data.items.length < maxResults) {
        break; // Exit if there are no more results
      }
    }

    return books;
  } catch (error) {
    console.error('Error fetching books from Google Books API:', error);
    return [];
  }
};

export default fetchBooksFromGoogle;