import QueryString from 'query-string';

import { userConstructor, userDTO } from './userConstructor';
import { PaginationMeta, PaginationMetaConstructor } from './paginationMetaConstructor';

export type UserListQueryParams = {
  page: number;
  limit: number;
  searchText?: string;
};

type ListResponse = {
  userList: userDTO[];
  meta: PaginationMeta;
};

export class GetUserListQuery {
  // query = (id) => `users/${id}`;
  query = ({ page, limit, searchText }: UserListQueryParams) => {
    const queryString = QueryString.stringify(
      {
        page,
        limit,
        searchText,
      },
      { skipNull: true },
    );
    return `users?${queryString}`;
  };
  providesTags = () => [{ type: 'User' }];
  transformResponse = (response) => {
    try {
      const { users, meta: paginationMeta } = response;
      const userList = users.map((user) => new userConstructor(user).getField());
      const meta = new PaginationMetaConstructor(paginationMeta).getField();
      return { userList, meta } as ListResponse;
    } catch (e) {
      console.log(e);
    }
  };
}
