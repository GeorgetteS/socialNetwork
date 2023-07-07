import { userConstructor } from './userConstructor';

export class GetUserQuery {
  query = (id) => `users/${id}`;

  transformResponse = (response) => {
    return new userConstructor(response).getField();
  };

  providesTags = () => [{ type: 'User' }];
}
