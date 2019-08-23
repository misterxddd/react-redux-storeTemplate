import { BookType } from "../types/book";

class BookstoreService {

  data: BookType[] = [
    { 
      id: 1,
      title: 'LearnJS',
      author: 'James Wun',
      price: 322,
      image: 'https://images-na.ssl-images-amazon.com/images/I/41rSaQpivNL._SY346_.jpg'
    },
    {
      id: 2,
      title: 'Learn C#',
      author: 'Davis Scott',
      price: 228,
      image: 'https://images-na.ssl-images-amazon.com/images/I/514J9NkICFL._SY346_.jpg'
    }
  ];

  getBooks(): Promise<BookType[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.75) {
          reject(new Error('Something goes wrong'));
        } else {
          resolve(this.data);
        }
      }, 700);
    });
  }

}

export default BookstoreService;