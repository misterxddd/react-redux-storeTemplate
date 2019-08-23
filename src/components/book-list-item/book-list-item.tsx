import React from 'react';
import Img from 'react-image';

import { BookType } from '../../types/book';
import Spinner from '../spinner';

import './book-list-item.css';


type BookItemProps = {
  book: BookType;
  onAddedToCart: any;
}

const BookListItem: React.SFC<BookItemProps> = ({book, onAddedToCart}) => {
  const { title, author, price, image } = book;
  return (
    <div className="book-list-item">
      <div className="book-cover">
        <Img src={image} alt={title+author} loader={<Spinner />} />
      </div>
      <div className="book-details">
        <a href="#" className="book-title">{title}</a>
        <div className="book-author">{author}</div>
        <div className="book-price">${price}</div>
        <button
          onClick={onAddedToCart} 
          className="btn btn-info add-to-cart">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default BookListItem;