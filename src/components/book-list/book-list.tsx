import React, { Dispatch } from 'react';

import { BookType } from '../../types/book';
import BookListItem from '../book-list-item';
import ErrorIndicator from '../error-indicator';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { withBookstoreService } from '../hoc';
import { BookstoreProps } from '../bookstore-service-context';
import { fetchBooks, bookAddedCart } from '../../actions/index';
import { AppAction } from '../../types/action';
import { compose } from '../../utils';

import './book-list.css';

type BookListProps = {
  books: BookType[];
  onAddedToCart: (id: number) => void;
}

const BookList: React.SFC<BookListProps> = ({books, onAddedToCart}) => {
  return (
    <ul className="book-list">
      {
        books.map((book) => {
          return (
            <li key={book.title}>
              <BookListItem 
                book={book} 
                onAddedToCart={() => onAddedToCart(book.id)}/>
            </li>
          )
        })
      }
    </ul>
  );
}

interface BookListContainerProps extends BookstoreProps {}

type BookListState = {}

type Props = BookListContainerProps & LinkStateProps & LinkDispatchProps;

class BookListContainer extends React.Component<Props, BookListState> {

  componentDidMount() {
    this.props.fetchBooks();  
  }

  render() {
    const { books, error, onAddedToCart } = this.props;

    if (error) {
      return <ErrorIndicator />
    }

    return <BookList books={books} onAddedToCart={onAddedToCart}/>
  }
};

interface LinkStateProps {
  books: BookType[];
  error: string;
}

interface LinkDispatchProps {
  fetchBooks: () => void;
  onAddedToCart: (id: number) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps  => {
  return {
    books: state.books,
    error: state.error
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>, ownProps: BookListContainerProps): LinkDispatchProps => {
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedToCart: (id: number) => dispatch(bookAddedCart(id))
  }
}

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);