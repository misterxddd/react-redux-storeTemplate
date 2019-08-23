import React from 'react';
import { BookstoreConsumer } from '../bookstore-service-context';

const withBookstoreService = () => (Wrapped: any) => {
  return (props: any) => {
    return (
      <BookstoreConsumer>
        {
          (bookstoreService) => {
            return (
              <Wrapped {...props} bookstoreService={bookstoreService} />
            )
          }
        }
      </BookstoreConsumer>
    )
  }
} 

export default withBookstoreService;