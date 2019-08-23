import BookstoreService from '../../services/bookstore-service';
import {
  BookstoreProvider,
  BookstoreConsumer
} from './bookstore-service-context';

export interface BookstoreProps {
  bookstoreService: BookstoreService;
}

export {
  BookstoreProvider,
  BookstoreConsumer
};