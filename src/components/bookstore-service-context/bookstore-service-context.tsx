import React from 'react';
import BookstoreService from '../../services/bookstore-service';

const {
  Provider: BookstoreProvider,
  Consumer: BookstoreConsumer
} = React.createContext(new BookstoreService());

export {
  BookstoreProvider,
  BookstoreConsumer
};